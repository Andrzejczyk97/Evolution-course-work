import { soundManager } from "./sounds";

export interface historyElement {
    winningLines: number[], 
    winnings: number[]
}
export class GameState {
    public sounds: soundManager;
    public constructor(sounds: soundManager) {
        this.sounds = sounds;
    }
    public balance: number = 1000;
    public betStake: number = 10;
    public paylines: number = 1;
    public history: historyElement[] = []
    public spinning: Boolean = false;
    public historyAdd(result: historyElement) {
        this.history.push(result);
    }
    public betPlus() {
        if(this.betStake < 50 && this.spinning !==true) {
            this.betStake += 5;
            this.sounds.click();
        } else this.sounds.error();
    }
    public betMinus() {
        if (this.betStake > 5 && this.spinning !==true) {
            this.betStake -= 5;
            this.sounds.click();
        } else this.sounds.error();
    }
    public paylinesPlus() {
        if (this.paylines < 5 && this.spinning !==true) {
            this.paylines += 1;
            this.sounds.click();
        } else this.sounds.error();
    }
    public paylinesMinus() {
        if (this.paylines > 1 && this.spinning !==true) {
            this.paylines -= 1;
            this.sounds.click();
        } else this.sounds.error();
    }
}