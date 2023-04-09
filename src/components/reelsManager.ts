import { Scene, Matrix, Mesh } from "@babylonjs/core";
import { Reel } from "./reel";
import { Lever } from "./lever";
import { GameState, historyElement } from "./gameState";


export class ReelManager {
    private reels: Reel[] = []
    private lever: Lever;
    private scene: Scene;
    private visibleIcons: number[][] = [];
    private currentLines: number[][] = [];
    private state: GameState;
    private enabled: Boolean;
    private lineIndicators: Mesh[] = [];
    public constructor(scene: Scene, reel1: Reel, reel2: Reel, reel3: Reel, lever: Lever, state: GameState) {
        this.state = state;
        this.reels.push(reel1);
        this.reels.push(reel2);
        this.reels.push(reel3);
        this.lever = lever;
        this.scene = scene;
        this.handleLeverClicks();
        this.enabled = true;
    }
   
    private handleLeverClicks = () => {
        this.scene.onPointerDown = () => {
            const ray = this.scene.createPickingRay(this.scene.pointerX, this.scene.pointerY, Matrix.Identity(), this.scene.activeCamera, false);	
            const hit = this.scene.pickWithRay(ray);
            if(hit)
            console.log(hit.pickedMesh?.name)
            if(hit)
            if (hit.pickedMesh && (hit.pickedMesh.name == "SpinHandle_primitive0" || hit.pickedMesh.name == "SpinHandle_primitive1")){
              this.spin()
            }
        }  
    }
    
    public spin(amount?: number) {
        if (this.enabled) {
            this.enabled = false;
            this.state.balance -= this.state.paylines*this.state.betStake;
            let duration = 0;
            this.reels.forEach(reel => {
                const reelDuration = reel.spin(amount !== undefined ? amount : undefined);
                duration = Math.max(duration, reelDuration);
            });
            this.lever.spin();
            this.onAfterSpin(duration);
        }
    }
    private onAfterSpin(duration: number) {
        setTimeout(() => {
            this.getVisibleIcons();
            this.getLines();
            this.checkLines(this.currentLines);
            this.enabled = true;
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
            } else if (line[0] === line[1] || line[1] === line[2]) {
                result.winningLines.push(index);
                result.winnings.push(this.state.betStake * 5)
                this.state.balance += this.state.betStake * 5;
            } 
        });
        if(result.winningLines.length) {
            this.state.historyAdd(result);
        }
    }
}