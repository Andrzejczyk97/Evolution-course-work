export interface historyElement {
    winningLines: number[], 
    winnings: number[]
}
export class GameState {
    public balance: number = 1000;
    public betStake: number = 10;
    public paylines: number = 1;
    public history: historyElement[] = []

    public historyAdd(result: historyElement) {
        this.history.push(result);
    }
    public betPlus() {
        if(this.betStake < 50) this.betStake += 5;
    }
    public betMinus() {
        if (this.betStake > 5) this.betStake -= 5;
    }
    public paylinesPlus() {
        if (this.paylines < 5) this.paylines += 1;
    }
    public paylinesMinus() {
        if (this.paylines > 1) this.paylines -= 1;
    }
}