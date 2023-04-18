import { Scene, Vector3, ShadowGenerator, Mesh, PointLight } from '@babylonjs/core';
import { meshNames } from '../consts';

export class Shadows {
  private scene: Scene;
  private shadow1: ShadowGenerator;
  private shadowLight: PointLight;

  public constructor(scene: Scene) {
    this.scene = scene;
    this.shadowLight = new PointLight('point', new Vector3(0, 18, 0), this.scene);
    this.shadowLight.intensity = 0.3;

    this.shadow1 = new ShadowGenerator(1024, this.shadowLight);
    this.shadow1.addShadowCaster(this.scene.getMeshByName(meshNames.machine[0]) as Mesh, true);
    this.shadow1.addShadowCaster(this.scene.getMeshByName(meshNames.tables[0]) as Mesh, true);
    this.shadow1.addShadowCaster(this.scene.getMeshByName(meshNames.tables[1]) as Mesh, true);
    this.shadow1.addShadowCaster(this.scene.getMeshByName(meshNames.plant[0]) as Mesh, true);
    this.shadow1.addShadowCaster(this.scene.getMeshByName(meshNames.pool[0]) as Mesh, true);
    this.shadow1.addShadowCaster(this.scene.getMeshByName(meshNames.bar[0]) as Mesh, true);
    this.shadow1.usePercentageCloserFiltering = true;
  }
}
