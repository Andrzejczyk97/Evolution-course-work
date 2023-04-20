import {
  FreeCamera, Mesh, Scene, Vector3, Animation,
} from '@babylonjs/core';
import PlayerInput from '../Logic/playerControls';
import { meshNames } from '../../utils/consts';
import { SoundManager } from '../Logic/sounds';
import PlayerTouchInput from '../PixiOverlay/TouchInput';

export class Player extends Mesh {
  private scene: Scene;
  private skin: Mesh;
  public input: PlayerInput | PlayerTouchInput;
  private moveSpeed = 0.2;
  private camera: FreeCamera;
  private animation: Animation;
  private inMove: boolean;
  private sounds: SoundManager;

  public constructor(scene: Scene, sounds: SoundManager) {
    super('player', scene);
    this.scene = scene;
    this.camera = new FreeCamera('cameraFPV', Vector3.Zero(), this.scene);
    this.skin = this.scene.getMeshByName(meshNames.head[0]) as Mesh;
    this.skin.scaling = new Vector3(3, 3, 3);
    this.skin.setParent(this);
    this.skin.position.set(0, 0, 0);
    this.position.set(16, 4.85, -18);
    this.rotation.y = -Math.PI / 6;
    this.input = new PlayerInput(this.scene);
    this.inMove = false;
    this.animation = new Animation('moveAnimation', 'position.y', 60, Animation.ANIMATIONTYPE_FLOAT);
    this.setupAnimation();
    this.setupCamera();
    this.sounds = sounds;
    this.scene.onBeforeRenderObservable.add(this.onFrame);
  }

  public switchVisibility() {
    if (this.skin.visibility) { this.skin.visibility = 0; } else this.skin.visibility = 1;
  }

  private setupAnimation() {
    const keyFrames = [
      { frame: 0, value: this.skin.position.y },
      { frame: 18, value: this.skin.position.y + 0.04 },
      { frame: 36, value: this.skin.position.y },
    ];
    this.animation.setKeys(keyFrames);
    this.scene.animations = [];
    this.skin.animations.push(this.animation);
  }

  private onFrame = () => {
    if (this.skin.visibility) { this.onMove(); }
  };

  private onMove() {
    if (this.input.moveLeft) {
      this.rotation.y -= 0.03 * this.scene.getAnimationRatio();
    } else if (this.input.moveRight) {
      this.rotation.y += 0.03 * this.scene.getAnimationRatio();
    }

    if (this.input.moveForward || this.input.moveBackward) {
      const moveVector = new Vector3(Math.sin(this.rotation.y) * this.moveSpeed, 0, Math.cos(this.rotation.y) * this.moveSpeed);
      if (this.input.moveBackward) {
        moveVector.negateInPlace();
      }
      this.moveWithCollisions(moveVector);
      this.position.y = 4.85;
      if (this.inMove === false) {
        this.scene.beginAnimation(this.skin, 0, 36, true);
        this.inMove = true;
        this.sounds.stepsON();
      }
    } else {
      this.scene.stopAnimation(this.skin);
      this.inMove = false;
      this.sounds.stepsOff();
    }
  }

  private setupCamera() {
    this.camera.parent = this;
    this.camera.position.set(0, 2, -2);
    this.camera.setTarget(new Vector3(0, 1.6, 0));
    this.scene.activeCamera = this.camera;
    this.ellipsoid = new Vector3(1, 15, 1);
  }
}
