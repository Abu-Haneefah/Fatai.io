import * as THREE from "three";

/**
 * A small low-poly boy built from basic shapes only (no models, no textures).
 *
 * The group faces +z by default (rotate it with `group.rotation.y`).
 * API: setPushing(true | false) and update(delta).
 */

const SKIN = 0xf1c27d;
const TROUSERS = 0x1f2937;

// Pose constants
const ARM_PUSH = -Math.PI / 3; // stretched forward, 30 degrees below horizontal
const LEAN_PUSH = 0.26; // lean forward ~15 degrees (toward +z)
const BASE_HIP = 0.9; // hip height

const makeBox = (
  w: number,
  h: number,
  d: number,
  color: number
): THREE.Mesh => {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(w, h, d),
    new THREE.MeshStandardMaterial({ color, roughness: 0.75 })
  );
  mesh.castShadow = true;
  return mesh;
};

const makeSphere = (r: number, color: number): THREE.Mesh => {
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(r, 20, 16),
    new THREE.MeshStandardMaterial({ color, roughness: 0.6 })
  );
  mesh.castShadow = true;
  return mesh;
};

export interface Boy {
  group: THREE.Group;
  setPushing: (pushing: boolean) => void;
  /** Advance the animation. `cadence` controls how fast the legs swing. */
  update: (delta: number, cadence?: number) => void;
}

export function createBoy(shirtColor: number = 0x3b82f6): Boy {
  const group = new THREE.Group();

  // Torso pivot at the hips (the whole body leans from here)
  const torso = new THREE.Group();
  torso.position.y = BASE_HIP;
  group.add(torso);

  const body = makeBox(0.5, 0.66, 0.3, shirtColor);
  body.position.y = 0.33;
  torso.add(body);

  const head = makeSphere(0.21, SKIN);
  head.position.y = 0.66 + 0.24;
  torso.add(head);

  // Arms pivot at the shoulders
  const makeArm = (side: 1 | -1): THREE.Group => {
    const pivot = new THREE.Group();
    pivot.position.set(side * 0.32, 0.58, 0);
    const arm = makeBox(0.13, 0.5, 0.13, SKIN);
    arm.position.y = -0.25; // hangs down from the pivot
    pivot.add(arm);
    torso.add(pivot);
    return pivot;
  };
  const armL = makeArm(-1);
  const armR = makeArm(1);

  // Legs pivot at the hips (attached to the group so leaning does not move them)
  const makeLeg = (side: 1 | -1): THREE.Group => {
    const pivot = new THREE.Group();
    pivot.position.set(side * 0.14, BASE_HIP, 0);
    const leg = makeBox(0.17, 0.9, 0.17, TROUSERS);
    leg.position.y = -0.45;
    pivot.add(leg);
    group.add(pivot);
    return pivot;
  };
  const legL = makeLeg(-1);
  const legR = makeLeg(1);

  let pushing = false;
  let phase = 0;

  const setPushing = (value: boolean): void => {
    pushing = value;
    if (!value) {
      // Return to a relaxed standing pose
      armL.rotation.x = 0;
      armR.rotation.x = 0;
      torso.rotation.x = 0;
      torso.position.y = BASE_HIP;
      legL.rotation.x = 0;
      legR.rotation.x = 0;
      phase = 0;
    }
  };

  const update = (delta: number, cadence = 7): void => {
    if (!pushing) return;

    phase += delta * cadence;

    // Push pose: lean forward, both arms stretched out ahead
    torso.rotation.x = LEAN_PUSH;
    armL.rotation.x = ARM_PUSH;
    armR.rotation.x = ARM_PUSH;

    // Walking: legs swing in opposite directions + a slight body bob
    const swing = Math.sin(phase) * 0.55;
    legL.rotation.x = swing;
    legR.rotation.x = -swing;
    torso.position.y = BASE_HIP + Math.abs(Math.sin(phase)) * 0.05;
  };

  return { group, setPushing, update };
}
