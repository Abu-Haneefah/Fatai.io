import * as THREE from "three";

export type LabelRefs = Record<string, HTMLDivElement | null>;

const tmp = new THREE.Vector3();

/**
 * Projects 3D anchor points onto absolutely-positioned HTML label divs.
 * Call once per frame from the scene's animation loop.
 * (All numbers and formulas are HTML overlays, never 3D text meshes.)
 */
export function projectLabels(
  refs: LabelRefs,
  anchors: Record<string, THREE.Vector3>,
  camera: THREE.Camera,
  width: number,
  height: number
): void {
  for (const key of Object.keys(anchors)) {
    const el = refs[key];
    if (!el) continue;
    tmp.copy(anchors[key]).project(camera);
    const behind = tmp.z > 1;
    el.style.opacity = behind ? "0" : "1";
    if (behind) continue;
    el.style.left = `${((tmp.x + 1) / 2) * width}px`;
    el.style.top = `${((1 - tmp.y) / 2) * height}px`;
  }
}
