import { FreeCamera, Mesh, Scene, Vector3, Animation} from "@babylonjs/core";
import { PlayerInput } from "../utils/playerControls";

enum PlayerAnimation {
    Idle = "YBot_Idle",
    Walk = "YBot_Walk",
    Run = "YBot_Run",
}

export class Player extends Mesh {
    private skin: Mesh;
    private input: PlayerInput;
    private moveSpeed = 0.15;
    private camera: FreeCamera;
    private animation: Animation;
    private inMove: boolean;
    

    public constructor(scene: Scene, skinName: string) {
        super("player", scene);
        this.camera = new FreeCamera("cameraFPV", Vector3.Zero(), scene);
        this.skin = scene.getMeshByName(skinName) as Mesh;
        this.skin.scaling = new Vector3(3,3,3)
        this.skin.setParent(this);
        this.skin.position.set(0, 0, 0);
        this.position.set(0,0,-4)
        this.input = new PlayerInput(scene);
        this.inMove = false;
        this.animation=new Animation("moveAnimation", "position.y", 60, Animation.ANIMATIONTYPE_FLOAT)
        this.setupAnimation();
        this.setupCamera();
        scene.onBeforeRenderObservable.add(this.onFrame);
    }

    private setupAnimation() {
        const keyFrames = [
            {frame: 0, value: this.skin.position.y},
            {frame: 18, value: this.skin.position.y+ 0.04},
            {frame: 36, value: this.skin.position.y}
        ]
        this.animation.setKeys(keyFrames);
        this.getScene().animations = [];
        this.skin.animations.push(this.animation);
    }
    private standStill() {
        const keyFrames = [
            {frame: 0, value: this.skin.position.y},
            {frame: 30, value: 0},
        ]
        this.animation.setKeys(keyFrames);
        this.getScene().animations = [];
        this.skin.animations.push(this.animation);
        this.getScene().beginAnimation(this.skin,40,100,false)
    }

    private onFrame = () => {
        this.onMove();
    }

    private onMove() { 
        if (this.input.moveLeft) {
            this.rotation.y -= 0.03 * this.getScene().getAnimationRatio();
        } else if (this.input.moveRight) {
            this.rotation.y += 0.03 * this.getScene().getAnimationRatio();
        }    

        if (this.input.moveForward || this.input.moveBackward) {
            const moveVector = new Vector3(Math.sin(this.rotation.y) * this.moveSpeed, 0, Math.cos(this.rotation.y) * this.moveSpeed);
            if (this.input.moveBackward) {
                moveVector.negateInPlace();
            } 
            this.moveWithCollisions(moveVector);
            this.position.y=0;
            if(this.inMove === false) {
                this.getScene().beginAnimation(this.skin,0,36,true)
                this.inMove = true;
            }
            
        } else {
            this.getScene().stopAnimation(this.skin);
            // this.standStill();
            this.inMove = false;
        }
    }
    
    private setupCamera() {
        this.camera.parent = this;
        this.camera.position.set(0, 2, -2);
        this.camera.setTarget(new Vector3(0,1.6, 0));
        this.camera.getScene().activeCamera = this.camera;
    }
}