import { Container, Sprite } from 'pixi.js';
import { ImageLinks } from '../../utils/consts';

export default class PlayerTouchInput {
  public moveForward = false;
  public moveBackward = false;
  public moveLeft = false;
  public moveRight = false;
  private cameraSwitchSubscribers: (() => void)[] = [];
  private isCameraSwitchPressed = false;

  public constructor(container: Container) {
    // creates touch navigating and sets listeners
    const arrowUp = Sprite.from(ImageLinks.arrowUp);
    arrowUp.width = arrowUp.height = 80;
    arrowUp.anchor.set(0.5);
    arrowUp.position.set(280, 40);
    arrowUp.interactive = true;
    arrowUp.on('pointerdown', () => { this.moveForward = true; });
    arrowUp.on('pointerup', () => { this.moveForward = false; });

    const arrowDown = Sprite.from(ImageLinks.arrowDown);
    arrowDown.width = arrowDown.height = 80;
    arrowDown.anchor.set(0.5);
    arrowDown.position.set(280, 120);
    arrowDown.interactive = true;
    arrowDown.on('pointerdown', () => { this.moveBackward = true; });
    arrowDown.on('pointerup', () => { this.moveBackward = false; });

    const arrowLeft = Sprite.from(ImageLinks.arrowLeft);
    arrowLeft.width = arrowLeft.height = 80;
    arrowLeft.anchor.set(0.5);
    arrowLeft.position.set(200, 120);
    arrowLeft.interactive = true;
    arrowLeft.on('pointerdown', () => { this.moveLeft = true; });
    arrowLeft.on('pointerup', () => { this.moveLeft = false; });

    const arrowRight = Sprite.from(ImageLinks.arrowRight);
    arrowRight.width = arrowRight.height = 80;
    arrowRight.anchor.set(0.5);
    arrowRight.position.set(360, 120);
    arrowRight.interactive = true;
    arrowRight.on('pointerdown', () => { this.moveRight = true; });
    arrowRight.on('pointerup', () => { this.moveRight = false; });

    const cameraButton = Sprite.from(ImageLinks.cameraButton);
    cameraButton.width = cameraButton.height = 80;
    cameraButton.anchor.set(0.5);
    cameraButton.position.set(40, 120);
    cameraButton.interactive = true;
    cameraButton.on('pointerdown', () => { this.isCameraSwitchPressed = true; });
    cameraButton.on('pointerup', () => {
      if (this.isCameraSwitchPressed) {
        this.isCameraSwitchPressed = false;
        this.cameraSwitchSubscribers.forEach((cb) => cb());
      }
    });

    container.addChild(arrowUp, arrowDown, arrowLeft, arrowRight, cameraButton);
    container.width = 400;
    container.height = 160;
    container.pivot.set(container.width, container.height);
  }

  public onCameraSwitch(callback: () => void) {
    this.cameraSwitchSubscribers.push(callback);
  }
}
