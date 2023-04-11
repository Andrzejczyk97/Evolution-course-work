import { Scene, Vector3, ShadowGenerator, Mesh, PointLight } from "@babylonjs/core"

export class Shadows {
    private scene: Scene;
    private shadow1: ShadowGenerator;
    private shadowLight: PointLight;
    public constructor(scene: Scene) {
        this.scene = scene;
        this.shadowLight = new PointLight("point", new Vector3(0,18,0), this.scene);
        this.shadowLight.intensity = 0.3;

        this.shadow1 = new ShadowGenerator(1024, this.shadowLight);
        this.shadow1.addShadowCaster(this.scene.getMeshByName("MachineBox") as Mesh, true);
        this.shadow1.addShadowCaster(this.scene.getMeshByName("MachineBox") as Mesh, true);
        this.shadow1.addShadowCaster(this.scene.getMeshByName("table2_root") as Mesh, true);
        this.shadow1.addShadowCaster(this.scene.getMeshByName("plant") as Mesh, true);
        this.shadow1.addShadowCaster(this.scene.getMeshByName("table1_root") as Mesh, true);
        this.shadow1.addShadowCaster(this.scene.getMeshByName("pool_table") as Mesh, true);
        this.shadow1.addShadowCaster(this.scene.getMeshByName("bar_root") as Mesh, true);
        this.shadow1.usePercentageCloserFiltering = true;
    }

}