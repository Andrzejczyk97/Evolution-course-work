// export {}
import { Mesh, Scene, Vector3} from "@babylonjs/core";

export class Machine extends Mesh {
    private reelMesh: Mesh;

    public constructor(scene: Scene, meshName: string) {
        super("machine", scene);
        this.reelMesh = scene.getMeshByName(meshName) as Mesh;
        this.reelMesh.setParent(this);
        this.rotate(new Vector3(0, 1, 0), Math.PI)
        this.position.z += 15.5;
        this.position.x += 4.5;
        this.position.y += 4.85;
    }
  
}