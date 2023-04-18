import { Mesh, Scene, Vector3, Animation } from '@babylonjs/core';

export class Lever extends Mesh {
  private scene: Scene;
  private lever1Mesh: Mesh;
  private lever2Mesh: Mesh;
  private animation: Animation;

  public constructor(scene: Scene) {
    super('lever', scene);
    this.scene = scene;
    this.lever1Mesh = this.scene.getMeshByName('SpinHandle_primitive0') as Mesh;
    this.lever2Mesh = this.scene.getMeshByName('SpinHandle_primitive1') as Mesh;
    this.lever1Mesh.setParent(this);
    this.lever2Mesh.setParent(this);

    // Get position of origin of leverMesh relative to parent coordinate system
    const originPosition = this.lever1Mesh.getAbsolutePosition();
    const parentPosition = this.getAbsolutePosition() ?? Vector3.Zero();
    const originRelativeToParent = originPosition.subtract(parentPosition);

    // Set pivot point to position of origin relative to parent coordinate system
    this.setPivotPoint(originRelativeToParent);
    this.translate(new Vector3(0, 0, -1), 1);
    this.animation = new Animation('spinLever', 'rotation.x', 60, Animation.ANIMATIONTYPE_FLOAT);
    const keyFrames = [
      { frame: 0, value: 0 },
      { frame: 30, value: -Math.PI / 2 },
      { frame: 60, value: 0 },
    ];
    this.animation.setKeys(keyFrames);
    this.animations.push(this.animation);
  }

  public spin() {
    this.scene.beginAnimation(this, 0, 60, false);
  }
}
