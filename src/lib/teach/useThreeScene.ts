import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export interface ThreeSceneSetupOptions {
  enableControls?: boolean;
  cameraPosition?: [number, number, number];
  cameraTarget?: [number, number, number];
  enableShadows?: boolean;
  alpha?: boolean;
}

export function useThreeScene(options: ThreeSceneSetupOptions = {}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Keep the latest options in a ref so the setup effect can safely run once
  // ([]) without tripping react-hooks/exhaustive-deps on inline object props.
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    try {
      const opts = optionsRef.current;

      // 1. Scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // 2. Camera
      const width = container.clientWidth || 600;
      const height = container.clientHeight || 400;
      const camera = new THREE.PerspectiveCamera(
        45,
        width / height,
        0.1,
        1000
      );
      const camPos = opts.cameraPosition || [0, 4, 10];
      camera.position.set(...camPos);
      cameraRef.current = camera;

      // 3. Renderer
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: opts.alpha ?? true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      if (opts.enableShadows ?? true) {
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      }
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // 4. Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
      scene.add(ambientLight);

      const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
      dirLight.position.set(8, 14, 8);
      dirLight.castShadow = opts.enableShadows ?? true;
      dirLight.shadow.mapSize.width = 1024;
      dirLight.shadow.mapSize.height = 1024;
      dirLight.shadow.camera.near = 0.5;
      dirLight.shadow.camera.far = 50;
      dirLight.shadow.camera.left = -10;
      dirLight.shadow.camera.right = 10;
      dirLight.shadow.camera.top = 10;
      dirLight.shadow.camera.bottom = -10;
      scene.add(dirLight);

      // Subtle fill light
      const fillLight = new THREE.DirectionalLight(0x60a5fa, 0.4);
      fillLight.position.set(-6, 4, -6);
      scene.add(fillLight);

      // 5. Controls
      if (opts.enableControls ?? true) {
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.maxDistance = 25;
        controls.minDistance = 2;
        controls.maxPolarAngle = Math.PI / 2 + 0.05; // don't go below ground
        if (opts.cameraTarget) {
          controls.target.set(...opts.cameraTarget);
        } else {
          controls.target.set(0, 1, 0);
        }
        controls.update();
        controlsRef.current = controls;
      }

      // 6. Resize Observer
      const resizeObserver = new ResizeObserver((entries) => {
        if (!entries.length) return;
        const entry = entries[0];
        const newWidth = entry.contentRect.width;
        const newHeight = entry.contentRect.height;
        if (newWidth > 0 && newHeight > 0 && cameraRef.current && rendererRef.current) {
          cameraRef.current.aspect = newWidth / newHeight;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(newWidth, newHeight);
        }
      });
      resizeObserver.observe(container);

      // 7. Visibility Observer to pause rendering when offscreen
      const intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          isVisibleRef.current = entry.isIntersecting;
        },
        { threshold: 0.1 }
      );
      intersectionObserver.observe(container);

      setIsReady(true);

      // Cleanup
      return () => {
        // The animation loop id is intentionally read from the ref here so the
        // latest scheduled frame (possibly written by the consumer after this
        // effect ran) is the one cancelled.
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const pendingFrame = animFrameIdRef.current;
        if (pendingFrame) {
          cancelAnimationFrame(pendingFrame);
        }
        resizeObserver.disconnect();
        intersectionObserver.disconnect();

        if (controlsRef.current) {
          controlsRef.current.dispose();
        }

        // Clean meshes & materials
        scene.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            obj.geometry?.dispose();
            if (Array.isArray(obj.material)) {
              obj.material.forEach((mat) => mat.dispose());
            } else if (obj.material) {
              obj.material.dispose();
            }
          }
        });

        if (renderer.domElement.parentElement) {
          renderer.domElement.parentElement.removeChild(renderer.domElement);
        }
        renderer.dispose();
      };
    } catch (err) {
      console.error("Three.js initialization failed:", err);
      setHasError(true);
    }
  }, []);

  return {
    containerRef,
    rendererRef,
    sceneRef,
    cameraRef,
    controlsRef,
    animFrameIdRef,
    isVisibleRef,
    isReady,
    hasError,
  };
}
