import { KeyboardEventTypes, Scene } from '@babylonjs/core';

export default class PlayerInput {
  public moveForward = false;
  public moveBackward = false;
  public moveLeft = false;
  public moveRight = false;
  private cameraSwitchSubscribers: (() => void)[] = [];
  private isCameraSwitchPressed = false;

  public constructor(scene: Scene) {
    this.registerKeyboardEvents(scene);
  }

  public onCameraSwitch(callback: () => void) {
    this.cameraSwitchSubscribers.push(callback);
  }

  private registerKeyboardEvents(scene: Scene) {
    scene.onKeyboardObservable.add((info) => {
      switch (info.event.code) {
        case 'KeyW':
          this.moveForward = info.type === KeyboardEventTypes.KEYDOWN;
          break;
        case 'KeyS':
          this.moveBackward = info.type === KeyboardEventTypes.KEYDOWN;
          break;
        case 'KeyA':
          this.moveLeft = info.type === KeyboardEventTypes.KEYDOWN;
          break;
        case 'KeyD':
          this.moveRight = info.type === KeyboardEventTypes.KEYDOWN;
          break;
        case 'KeyC':
          if (!this.isCameraSwitchPressed && info.type === KeyboardEventTypes.KEYDOWN) {
            this.isCameraSwitchPressed = true;
          }

          if (this.isCameraSwitchPressed && info.type === KeyboardEventTypes.KEYUP) {
            this.isCameraSwitchPressed = false;
            this.cameraSwitchSubscribers.forEach((cb) => cb());
          }
          break;
        default:
          break;
      }
    });
  }
}
