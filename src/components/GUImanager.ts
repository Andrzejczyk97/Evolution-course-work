import { Vector3} from "@babylonjs/core";
import { Player } from "./player";
import { Machine } from "./machine";
import { GameState } from './gameState';
import { ReelManager } from './reelsManager';
import { Application, Ticker} from "pixi.js"
import { Values } from './PixiOverlay/values';
import { SpinButton } from './PixiOverlay/Spin';

export class GUImanager {
    private player: Player;
    public state: GameState;
    private machine: Machine;
    public reels: ReelManager;
    private bet: Values;
    private paylines: Values;
    private balance: Values;
    private spinButton: SpinButton;
    private appContainer: HTMLDivElement;
    private app: Application<HTMLCanvasElement>;

    public constructor(player: Player, state: GameState, machine: Machine, reels: ReelManager) {
        this.player = player;
        this.state = state;
        this.machine = machine;
        this.reels = reels;

        this.bet = new Values(this.state, "bet");
        this.paylines = new Values(this.state, "paylines");
        this.balance = new Values(this.state, "balance");
        this.spinButton = new SpinButton(this.state);
        
        this.appContainer = document.getElementById("overlayContainer") as HTMLDivElement;
        this.app = new Application<HTMLCanvasElement>({resizeTo: window, backgroundAlpha: 0});
        this.appContainer.appendChild(this.app.view);
        this.setUpGui();
        // code below prevents focus from staying on the overlay(player couldn't walk)
        const pixiCanvas = this.app.view;
        const babylonCanvas = document.getElementById("canvas") as HTMLCanvasElement;
        pixiCanvas.addEventListener("click", () => {
            babylonCanvas.focus();
        })
    }
    private setUpGui() {
        this.balance.position.set(10,10);
        this.bet.position.set(10,160)
        this.paylines.position.set(10,310)
        this.spinButton.position.set(10,460)
        this.app.stage.addChild(this.balance)
        this.app.stage.addChild(this.bet)
        this.app.stage.addChild(this.paylines)
        this.app.stage.addChild(this.spinButton)

        this.spinButton.interactive = true;
        this.spinButton.on("click", () => {
            this.reels.spin()
        })
        const ticker = new Ticker();
        ticker.add(() => {
            this.updateValues();
            this.spinButton.checkButton();
            this.bet.checkButtons();
            this.paylines.checkButtons();
            this.manageGuiVisibility();
        });
        ticker.start();
    }
    private updateValues() {
        if (this.balance.value.text !== this.state.balance.toString()) {
            this.balance.value.text = this.state.balance.toString();
        }
        if (this.bet.value.text !== this.state.betStake.toString()) {
            this.bet.value.text = this.state.betStake.toString();
        }
        if (this.paylines.value.text !== this.state.paylines.toString()) {
            this.paylines.value.text = this.state.paylines.toString();
        }
    }
    private manageGuiVisibility() {
        if( Vector3.Distance(this.machine.getAbsolutePosition(), this.player.getAbsolutePosition()) < 8) {
            this.showGUI();
        } 
        else {
            if( Vector3.Distance(this.machine.getAbsolutePosition(), this.player.getAbsolutePosition())>8)
            this.hideGUI();
        }
    }
    private showGUI() {
        this.appContainer.style.zIndex = "3"
    }
    private hideGUI() {
        this.appContainer.style.zIndex = "-3"
    }
}