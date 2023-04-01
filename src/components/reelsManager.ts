import { Mesh, Scene, Vector3, Animation, Matrix } from "@babylonjs/core";
import { Reel } from "./reel";
import { Matrix2D } from "@babylonjs/gui";
import { Lever } from "./lever";


export class ReelManager {
    private reels: Reel[] = []
    private lever: Lever;
    private scene: Scene;
    public constructor(scene: Scene, reel1: Reel, reel2: Reel, reel3: Reel, lever: Lever) {
        this.reels.push(reel1);
        this.reels.push(reel2);
        this.reels.push(reel3);
        this.lever = lever;
        this.scene = scene;
        this.handleLeverClicks();
    }
   
    private handleLeverClicks = () => {
        this.scene.onPointerDown = () => {
            const ray = this.scene.createPickingRay(this.scene.pointerX, this.scene.pointerY, Matrix.Identity(), this.scene.getCameraByName("camera"), false);	
            const hit = this.scene.pickWithRay(ray);
            if(hit)
            if (hit.pickedMesh && (hit.pickedMesh.name == "SpinHandle_primitive0" || hit.pickedMesh.name == "SpinHandle_primitive1")){
              this.spin()
            }
          }  
    }
    
    public spin(amount?: number) {
        this.reels.forEach(reel => reel.spin(amount !== undefined ? amount : undefined))
        this.lever.spin();
    }
}