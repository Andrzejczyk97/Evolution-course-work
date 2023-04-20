import { Scene, CreateGround, CreatePlane, StandardMaterial, Texture } from '@babylonjs/core';
import { ImageLinks } from './consts';

export default function setEnviroment(scene: Scene, x: number, y: number, z: number) {
  const ground = CreateGround('ground', { width: 40, height: 40 }, scene);
  // set up ground
  const groundMaterial = new StandardMaterial('groundMaterial', scene);
  const groundTexture = scene.getTextureByName(ImageLinks.floor) as Texture;
  groundTexture.uScale = 3;
  groundTexture.vScale = 3;
  groundMaterial.diffuseTexture = groundTexture;
  ground.material = groundMaterial;
  ground.receiveShadows = true;
  // build walls
  const wall1 = CreatePlane('wall1', { width: x, height: y }, scene);
  wall1.position.z += x / 2;
  wall1.position.y += y / 2;
  const wall1Material = new StandardMaterial('wall1Material', scene);
  const wall1Texture = scene.getTextureByName(ImageLinks.wall1) as Texture;
  wall1Texture.uScale = 4;
  wall1Texture.vScale = 2;
  wall1Material.diffuseTexture = wall1Texture;
  wall1.material = wall1Material;
  wall1.receiveShadows = true;

  const wall2 = CreatePlane('wall2', { width: z, height: y }, scene);
  wall2.position.x += z / 2;
  wall2.position.y += y / 2;
  wall2.rotation.y = Math.PI / 2;
  const wall2Material = new StandardMaterial('wall2Material', scene);
  const wall2Texture = scene.getTextureByName(ImageLinks.wall2) as Texture;
  wall2Texture.uScale = 2;
  wall2Texture.vScale = 1;
  wall2Material.diffuseTexture = wall2Texture;
  wall2.material = wall2Material;
  wall2.receiveShadows = true;

  const wall3 = CreatePlane('wall3', { width: x, height: y }, scene);
  wall3.position.z -= x / 2;
  wall3.position.y += y / 2;

  wall3.rotation.y = Math.PI;
  wall3.material = wall1Material;
  wall3.receiveShadows = true;

  const wall4 = CreatePlane('wall4', { width: z, height: y }, scene);
  wall4.position.x -= z / 2;
  wall4.position.y += y / 2;
  wall4.rotation.y = -Math.PI / 2;
  wall4.material = wall2Material;
  wall4.receiveShadows = true;

  const ceiling = CreatePlane('ceiling', { width: x, height: z }, scene);
  ceiling.rotation.x = -Math.PI / 2;
  ceiling.position.y = y;
  const ceilingMaterial = new StandardMaterial('ceiling', scene);
  const ceilingTexture = scene.getTextureByName(ImageLinks.ceiling) as Texture;
  ceilingTexture.uScale = 6;
  ceilingTexture.vScale = 6;
  ceilingMaterial.diffuseTexture = ceilingTexture;
  ceiling.material = ceilingMaterial;
  // add wall colisions
  wall1.checkCollisions = true;
  wall2.checkCollisions = true;
  wall3.checkCollisions = true;
  wall4.checkCollisions = true;
}
