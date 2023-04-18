import { Mesh, Scene, Vector3 } from '@babylonjs/core';
import { Lever } from './Lever';
import { Reel } from './Reel';

export class Machine extends Mesh {
  private reelMesh: Mesh;
  public lever: Lever;
  public reels: Reel[] = [];

  public constructor(scene: Scene, meshName: string) {
    super('machine', scene);
    this.reelMesh = scene.getMeshByName(meshName) as Mesh;
    this.reelMesh.setParent(this);
    this.rotate(new Vector3(0, 1, 0), Math.PI);
    this.position.z += 15.5;
    this.position.x += 4.5;
    this.position.y += 4.85;

    this.lever = new Lever(scene);
    this.reels.push(new Reel(scene, 'Reel1'));
    this.reels.push(new Reel(scene, 'Reel2'));
    this.reels.push(new Reel(scene, 'Reel3'));
  }
}
