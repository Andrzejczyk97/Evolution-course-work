import { Scene, Matrix } from "@babylonjs/core"
import { ReelManager } from "./reelsManager";
import { soundManager } from "./sounds";

export class InteractionManager {
    private scene: Scene;
    private reelsManager: ReelManager;
    private sounds: soundManager;
    public constructor(scene: Scene, reelsManager: ReelManager, sounds: soundManager) {
        this.scene = scene;
        this.reelsManager = reelsManager;
        this.sounds = sounds;
        this.handleClick();
        
    }
    private handleClick = () => {
        this.scene.onPointerDown = () => {
            const ray = this.scene.createPickingRay(this.scene.pointerX, this.scene.pointerY, Matrix.Identity(), this.scene.activeCamera, false);	
            const hit = this.scene.pickWithRay(ray);
            if(hit)
            {
                console.log(hit.pickedMesh?.name)
                if (hit.pickedMesh) {
                this.interact(hit.pickedMesh.name);
                };
            };
        };
    };
    private interact = (meshName: String) => {
        if(meshName === "SpinHandle_primitive0" || meshName === "SpinHandle_primitive1") {
            this.reelsManager.spin()
        }
        if(meshName === "Radio_primitive0" || meshName === "Radio_primitive1" || meshName === "Radio_primitive2") {
            this.sounds.background();
        }
    }
}