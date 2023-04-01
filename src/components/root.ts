import { Mesh, Scene} from "@babylonjs/core";



export class Root extends Mesh {
    private reelMesh: Mesh;

    public constructor(scene: Scene, meshName: string) {
        super("root", scene);
        this.reelMesh = scene.getMeshByName(meshName) as Mesh;
        this.reelMesh.setParent(this);
        this.rotateY();
    }
   
    private rotateY = () => {
        this.rotation.y = Math.PI;
    }

  
}