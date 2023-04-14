import { Graphics, Sprite, Texture, Container} from "pixi.js"
import { GameState } from "../gameState";

export class SpinButton extends Container{
    private background: Graphics;
    private button: Sprite;
    private redSpinButton: Texture;
    private greenSpinButton: Texture;
    private state: GameState;
    public constructor(state: GameState) {
        super()
        this.state = state;
        this.background = new Graphics;
        this.background.beginFill(0x3e494b,0.8);
        this.background.lineStyle(4, 0x0, .3);
        this.background.drawRoundedRect(0,0,260,140,30);
        this.background.endFill()
        this.addChild(this.background)
        
        this.redSpinButton = Texture.from("./redSpin.png")
        this.greenSpinButton = Texture.from("./greenSpin.png")
        this.button = Sprite.from(this.greenSpinButton)
        this.button.scale.set(0.5)
        this.button.anchor.set(0.5)
        this.button.position.set(130,70)
        this.addChild(this.button)
    }
    public checkButton() {
        if(this.state.spinning) this.button.texture = this.redSpinButton;
        else this.button.texture = this.greenSpinButton;
    }
}