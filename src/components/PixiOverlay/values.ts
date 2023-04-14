import { GameState } from "../gameState";
import { Graphics, Sprite, Text, Container, Texture } from "pixi.js"
export class Values extends Container{
    private state: GameState;
    private title: Text;
    public value: Text;
    private minus: Sprite;
    private plus: Sprite;
    private activePlus: Texture;
    private inactivePlus: Texture;
    private activeMinus: Texture;
    private inactiveMinus: Texture;
    private background: Graphics;
    private type: "balance" | "paylines" | "bet";
    public constructor(state: GameState, type: "balance" | "paylines" | "bet") {
        super()
        this.type = type; 
        this.state = state;
        this.activePlus = Texture.from("./plus.png")
        this.activeMinus = Texture.from("./minus.png")
        this.inactivePlus = Texture.from("./plusInactive.png")
        this.inactiveMinus = Texture.from("./minusInactive.png")

        this.background = new Graphics;
        this.background.beginFill(0x3e494b,0.8);
        this.background.lineStyle(4, 0x0, .3);
        this.background.drawRoundedRect(0,0,260,140,30);
        this.background.endFill()
        this.addChild(this.background)

        this.title = new Text("", {
            fontFamily: 'Arial',
            fontSize: 34,
            fill: 0xfafffa,
            align: 'center',
        })
        this.title.position.set(30,15)

        this.value = new Text("", {
            fontFamily: 'Arial',
            fontSize: 34,
            fill: 0xfafffa,
            align: 'center',
        })
        this.value.anchor.set(0.5)
        this.value.position.set(130,95)

        this.plus = Sprite.from(this.activePlus)
        this.plus.scale.set(0.10)
        this.plus.anchor.set(0.5)
        this.plus.position.set(200,95)
        this.minus = Sprite.from(this.activeMinus)
        this.minus.scale.set(0.10)
        this.minus.anchor.set(0.5)
        this.minus.position.set(60,95)
        this.plus.interactive = true;
        this.minus.interactive = true;
        this.addChild(this.value)
        this.addChild(this.title)
        switch(type) {
            case "balance" :
            this.title.text = "Balance: ";
            this.value.text = state.balance.toString();
            break;
            case "bet" :
            this.title.text = "Current bet: ";
            this.value.text = state.betStake.toString();
            this.plus.on("click", () => {
                state.betPlus()
            })
            this.minus.on("click", () => {
                state.betMinus()
            })
            this.addChild(this.plus)
            this.addChild(this.minus)
            break;
            case "paylines" :
            this.title.text = "Paylines: "; 
            this.value.text = state.paylines.toString();
            this.plus.on("click", () => {
                state.paylinesPlus();
            })
            this.minus.on("click", () => {
                state.paylinesMinus();
            })
            this.addChild(this.plus)
            this.addChild(this.minus)
            break;
        }
    }
    public checkButtons() {
        if (this.state.spinning) {
            console.log("spinnie")
            this.plus.texture = this.inactivePlus;
            this.minus.texture = this.inactiveMinus;
        } else {
            this.plus.texture = this.activePlus;
            this.minus.texture = this.activeMinus;
            if (this.type === "bet") {
                if(this.value.text === "50") this.plus.texture = this.inactivePlus;
                else this.plus.texture = this.activePlus;
                if(this.value.text === "5") this.minus.texture = this.inactiveMinus;
                else this.minus.texture = this.activeMinus;
            }
            if (this.type === "paylines") {
                if(this.value.text === "5") this.plus.texture = this.inactivePlus;
                else this.plus.texture = this.activePlus;
                if(this.value.text === "1") this.minus.texture = this.inactiveMinus;
                else this.minus.texture = this.activeMinus;
            }
        }
    }

}