import { Mesh, Scene, Vector3} from "@babylonjs/core";

export class Machine extends Mesh {
    private reelMesh: Mesh;

    public constructor(scene: Scene, meshName: string) {
        super("root", scene);
        this.reelMesh = scene.getMeshByName(meshName) as Mesh;
        this.reelMesh.setParent(this);
        this.reelMesh.rotate(new Vector3(0, 1, 0), Math.PI)
        this.reelMesh.position.z += 7.5;
        
        const box = scene.getMeshByName("MachineBox") as Mesh;
        box.checkCollisions = true;

        this.position.z+=8;
    }
  
}