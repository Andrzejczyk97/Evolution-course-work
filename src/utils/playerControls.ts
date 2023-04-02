import { KeyboardEventTypes, Scene } from "@babylonjs/core";

export class PlayerInput {
    public moveForward: boolean = false;
    public moveBackward: boolean = false;
    public moveLeft: boolean = false;
    public moveRight: boolean = false;
    public stop: boolean = true;
    public constructor(scene: Scene) {
        this.registerKeyboardEvents(scene);
    }

    private registerKeyboardEvents(scene: Scene) {
        scene.onKeyboardObservable.add((info) => {
            switch(info.event.code) {
                case "KeyW":
                  this.moveForward = info.type === KeyboardEventTypes.KEYDOWN;
                  this.stop = info.type === KeyboardEventTypes.KEYUP;
                  break;
                case "KeyS":
                    this.moveBackward = info.type === KeyboardEventTypes.KEYDOWN;
                    this.stop = info.type === KeyboardEventTypes.KEYUP;
                  break;
                case "KeyA":
                    this.moveLeft = info.type === KeyboardEventTypes.KEYDOWN;
                  break;
                case "KeyD":
                    this.moveRight = info.type === KeyboardEventTypes.KEYDOWN;
                  break;
            }
          });
    }
}