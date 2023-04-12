import { Scene, Matrix } from "@babylonjs/core";
import { Reel } from "./reel";
import { Lever } from "./lever";
import { GameState, historyElement } from "./gameState";
import { soundManager } from "./sounds";

export class ReelManager {
    private reels: Reel[] = []
    private lever: Lever;
    private scene: Scene;
    private visibleIcons: number[][] = [];
    private currentLines: number[][] = [];
    private state: GameState;
    private sounds: soundManager;
    public constructor(scene: Scene, lever: Lever, state: GameState, sounds: soundManager) {
        this.state = state;
        this.reels.push(new Reel(scene, "Reel1"));
        this.reels.push(new Reel(scene, "Reel2"));
        this.reels.push(new Reel(scene, "Reel3"));
        this.lever = lever;
        this.scene = scene;
        this.sounds = sounds;
    }
    public spin(amount?: number) {
        if (!this.state.spinning && this.state.balance >= this.state.paylines * this.state.betStake) {
            this.state.spinning = true;
            this.sounds.spin();
            this.state.balance -= this.state.paylines*this.state.betStake;
            let duration = 0;
            this.reels.forEach(reel => {
                const reelDuration = reel.spin(amount !== undefined ? amount : undefined);
                duration = Math.max(duration, reelDuration);
            });
            this.lever.spin();
            this.onAfterSpin(duration);
        } else this.sounds.error();
    }
    private onAfterSpin(duration: number) {
        setTimeout(() => {
            this.getVisibleIcons();
            this.getLines();
            this.checkLines(this.currentLines);
            this.state.spinning = false;
        }, duration / 60 * 1000)
    }
    private getLines() {
        this.currentLines = [];
        this.currentLines.push(
            [this.visibleIcons[0][1], this.visibleIcons[1][1], this.visibleIcons[2][1]],
            [this.visibleIcons[0][0], this.visibleIcons[1][1], this.visibleIcons[2][2]],
            [this.visibleIcons[0][2], this.visibleIcons[1][1], this.visibleIcons[2][0]],
            [this.visibleIcons[0][0], this.visibleIcons[1][2], this.visibleIcons[2][0]],
            [this.visibleIcons[0][2], this.visibleIcons[1][0], this.visibleIcons[2][2]]

        )
    }
    private getVisibleIcons() {
        this.visibleIcons = []
        this.reels.forEach( reel => {
            const upper = reel.currentIcon+1
            const middle = reel.currentIcon
            const lower = reel.currentIcon-1
            if (upper < 16 && lower >=0) this.visibleIcons.push([upper,middle,lower])
            else if (upper < 16) this.visibleIcons.push([upper,middle,15])
            else this.visibleIcons.push([0,middle,lower])
        })
    }
    private checkLines(lines: number[][]) {
        const result: historyElement = { winningLines: [], winnings: []}
        lines.slice(0,this.state.paylines).forEach( (line, index) => {
            if (line[0] === line[1] && line[0] === line[2]) {
                result.winningLines.push(index);
                result.winnings.push(this.state.betStake * 25)
                this.state.balance += this.state.betStake * 25;
                this.sounds.bigWin();
            } else if (line[0] === line[1] || line[1] === line[2]) {
                result.winningLines.push(index);
                result.winnings.push(this.state.betStake * 5)
                this.state.balance += this.state.betStake * 5;
                this.sounds.win();

            } 
        });
        if(result.winningLines.length) {
            this.state.historyAdd(result);
            console.log(result)
        }
    }
}