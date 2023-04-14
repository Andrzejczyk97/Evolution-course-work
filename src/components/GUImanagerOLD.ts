import './gui.css'
import { Scene, Vector3} from "@babylonjs/core";
import { Player } from "./player";
import { Machine } from "./machine";
import { GameState } from './gameState';
import { ReelManager } from './reelsManager';
import { soundManager } from './sounds';

export class GUImanager {
    private player: Player;
    public state: GameState;
    private machine: Machine;
    public reels: ReelManager;
    public guiVisible: Boolean;
    private button: HTMLButtonElement;
    private sidebar: HTMLDivElement;
    private scene: Scene;
    private sounds: soundManager;
    public constructor(scene: Scene, player: Player, state: GameState, machine: Machine, reels: ReelManager, sounds: soundManager) {
        this.player = player;
        this.scene = scene;
        this.state = state;
        this.machine = machine;
        this.reels = reels;
        this.guiVisible = false;
        this.setUpGui();
        scene.onBeforeRenderObservable.add(this.onFrame);
        this.button = document.getElementById("slotsFocus") as HTMLButtonElement;
        this.sidebar = document.getElementById("leftSidebar") as HTMLDivElement;
        this.sounds = sounds;
    }
    private setUpGui() {
        const slotsFocus = document.createElement("button") ;
        slotsFocus.setAttribute("id", "slotsFocus");
        slotsFocus.textContent = "PLAY SLOTS";
        document.body.appendChild(slotsFocus);
        slotsFocus.addEventListener("click", () => {
            this.toggleGameFocus();
            this.sounds.click(); 
        })
        
        
        const leftSidebar = document.createElement("div");
        leftSidebar.setAttribute("id", "leftSidebar");
        leftSidebar.setAttribute("class", "leftSidebar");
        document.body.appendChild(leftSidebar);
        leftSidebar.style.zIndex = "5"

        const balanceTitle = document.createElement("div");
        balanceTitle.setAttribute("class", "sidebarTitle");
        balanceTitle.textContent = "Balance:"
        leftSidebar.appendChild(balanceTitle)
        
        const balanceContainer = document.createElement("div");
        balanceContainer.setAttribute("class", "balanceContainer")
        leftSidebar.appendChild(balanceContainer)
        
        const currentBalance = document.createElement("div");
        currentBalance.setAttribute("class", "currentValue")
        currentBalance.setAttribute("id", "balanceCurrentValue")
        balanceContainer.appendChild(currentBalance)
        currentBalance.textContent = this.state.balance.toString();


        const paylineTitle = document.createElement("div");
        paylineTitle.setAttribute("class", "sidebarTitle");
        paylineTitle.textContent = "Paylines:"
        leftSidebar.appendChild(paylineTitle)
        
        const paylineContainer = document.createElement("div");
        paylineContainer.setAttribute("class", "paylineContainer")
        leftSidebar.appendChild(paylineContainer)
        
        const lessPaylines = document.createElement("button");
        lessPaylines.setAttribute("class", "sidebarButton")
        paylineContainer.appendChild(lessPaylines)
        lessPaylines.textContent = "-"
        lessPaylines.addEventListener("click", () => { this.state.paylinesMinus() })
        
        const currentPaylines = document.createElement("div");
        currentPaylines.setAttribute("class", "currentValue")
        currentPaylines.setAttribute("id", "paylinesCurrentValue")
        paylineContainer.appendChild(currentPaylines)
        currentPaylines.textContent = this.state.paylines.toString();

        const morePaylines = document.createElement("button");
        morePaylines.setAttribute("class", "sidebarButton")
        paylineContainer.appendChild(morePaylines)
        morePaylines.textContent = "+"
        morePaylines.addEventListener("click", () => { this.state.paylinesPlus() })

        const betTitle = document.createElement("div");
        betTitle.setAttribute("class", "sidebarTitle");
        betTitle.textContent = "Current bet:"
        leftSidebar.appendChild(betTitle)

        const betContainer = document.createElement("div");
        betContainer.setAttribute("class", "betContainer")
        leftSidebar.appendChild(betContainer)

        const lessBets = document.createElement("button");
        lessBets.setAttribute("class", "sidebarButton")
        betContainer.appendChild(lessBets)
        lessBets.textContent = "-"
        lessBets.addEventListener("click", () => { this.state.betMinus() })
        
        const currentBets = document.createElement("div");
        currentBets.setAttribute("class", "currentValue")
        currentBets.setAttribute("id", "betsCurrentValue")
        betContainer.appendChild(currentBets)
        currentBets.textContent = this.state.betStake.toString();

        const moreBets = document.createElement("button");
        moreBets.setAttribute("class", "sidebarButton")
        betContainer.appendChild(moreBets)
        moreBets.textContent = "+"
        moreBets.addEventListener("click", () => { this.state.betPlus() })

        const spin = document.createElement("div")
        spin.setAttribute("id", "spinButton");
        leftSidebar.appendChild(spin);
        spin.textContent = "SPIN"
        spin.addEventListener("click", () => { this.reels.spin() })

    }
    private onFrame = () => {
        this.guiVisibility();
        this.updateGUIvalues()

        if(this.guiVisible) {
            this.button.style.zIndex = "5";
        }
        else this.button.style.zIndex = "-5";
    }
    private guiVisibility() {
        if(this.guiVisible) {
            if(!this.playerCloseToMachine()) this.guiVisible = false;
        } else if(this.playerCloseToMachine()) this.guiVisible = true;
    }
    private updateGUIvalues() {
        const paylines = document.getElementById("paylinesCurrentValue") as HTMLDivElement;
        const bet = document.getElementById("betsCurrentValue") as HTMLDivElement;
        const balance = document.getElementById("balanceCurrentValue") as HTMLDivElement;
        paylines.textContent = this.state.paylines.toString();
        bet.textContent = this.state.betStake.toString();
        balance.textContent = this.state.balance.toString();
    }
    private toggleGameFocus() {
        this.sidebar.style.visibility = this.sidebar.style.visibility == "visible" ? "hidden" : "visible"
        this.button.textContent = this.button.textContent === "PLAY SLOTS" ? "x" : "PLAY SLOTS"
        this.player.hide();
        this.scene.setActiveCameraByName(this.scene.activeCamera?.name === "baseCamera" ? "cameraFPV" : "baseCamera")

    }
    private playerCloseToMachine() {
        if( Vector3.Distance(this.machine.getAbsolutePosition(), this.player.getAbsolutePosition()) < 7 ) {
            return true
        } 
        else return false
    }

    
}