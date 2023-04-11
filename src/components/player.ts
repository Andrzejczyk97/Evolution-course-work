import { FreeCamera, Mesh, Scene, Vector3, Animation, VirtualJoystick} from "@babylonjs/core";
import { PlayerInput } from "../utils/playerControls";

export class Player extends Mesh {
    private skin: Mesh;
    private input: PlayerInput;
    private moveSpeed = 0.2;
    private camera: FreeCamera;
    private animation: Animation;
    private inMove: boolean;
    public balance: number;
    public bet: number;
    private joystick: VirtualJoystick | undefined;
    

    public constructor(scene: Scene, skinName: string) {
        super("player", scene);
        this.camera = new FreeCamera("cameraFPV", Vector3.Zero(), scene);
        this.skin = scene.getMeshByName(skinName) as Mesh;
        this.skin.scaling = new Vector3(3,3,3)
        this.skin.setParent(this);
        this.skin.position.set(0, 0, 0);
        this.position.set(16,4.85,-18)
        this.rotation.y = -Math.PI/6;
        this.input = new PlayerInput(scene);
        this.inMove = false;
        this.animation=new Animation("moveAnimation", "position.y", 60, Animation.ANIMATIONTYPE_FLOAT)
        this.setupAnimation();
        this.setupCamera();
        this.balance = 1000;
        this.bet = 10;
        scene.onBeforeRenderObservable.add(this.onFrame);
        if ('maxTouchPoints' in navigator && navigator.maxTouchPoints === 0) {
            // Device has a physical keyboard
            console.log("Device has a physical keyboard.");
          } else {
            this.joystick = new VirtualJoystick(true);
          }
    }
    public hide() {
        if(this.skin.visibility)
            this.skin.visibility = 0;
        else this.skin.visibility = 1;
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
    private onFrame = () => {
        if(this.skin.visibility)
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
            this.position.y=4.85;
            if(this.inMove === false) {
                this.getScene().beginAnimation(this.skin,0,36,true)
                this.inMove = true;
            }
            
        } else {
            this.getScene().stopAnimation(this.skin);
            this.inMove = false;
        }
        if(this.joystick)
        if(this.joystick.pressed){
            this.rotation.y += this.joystick.deltaPosition.x * 0.03;
            console.log(this.joystick.deltaPosition.x)
            const moveVector = new Vector3(Math.sin(this.rotation.y) * this.moveSpeed * this.joystick.deltaPosition.y, 0, Math.cos(this.rotation.y) * this.moveSpeed * this.joystick.deltaPosition.y);
            this.moveWithCollisions(moveVector)
        }
       
    }

    private setupCamera() {
        this.camera.parent = this;
        this.camera.position.set(0, 2, -2);
        this.camera.setTarget(new Vector3(0,1.6, 0));
        this.camera.getScene().activeCamera = this.camera;
        this.ellipsoid = new Vector3(1,15,1)
    }
}