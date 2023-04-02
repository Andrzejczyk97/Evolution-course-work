import { Scene, Matrix } from "@babylonjs/core";
import { Reel } from "./reel";
import { Lever } from "./lever";


export class ReelManager {
    private reels: Reel[] = []
    private lever: Lever;
    private scene: Scene;
    private visibleIcons: number[][] = [];
    private currentLines: number[][] = [];
    private selectedLines: number = 3;
    public constructor(scene: Scene, reel1: Reel, reel2: Reel, reel3: Reel, lever: Lever) {
        this.reels.push(reel1);
        this.reels.push(reel2);
        this.reels.push(reel3);
        this.lever = lever;
        this.scene = scene;
        this.handleLeverClicks();
    }
   
    private handleLeverClicks = () => {
        this.scene.onPointerDown = () => {
            const ray = this.scene.createPickingRay(this.scene.pointerX, this.scene.pointerY, Matrix.Identity(), this.scene.getCameraByName("cameraFPV"), false);	
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
        this.reels.forEach(reel => reel.spin(amount !== undefined ? amount : undefined))
        this.lever.spin();
        this.onAfterSpin();
    }
    private onAfterSpin() {
        this.getVisibleIcons();
        this.getLines();
        this.checkLines(this.currentLines);
    }
    private getLines() {
        this.currentLines = [];
        this.currentLines.push(
            [this.visibleIcons[0][1], this.visibleIcons[1][1], this.visibleIcons[2][1]],
            [this.visibleIcons[0][0], this.visibleIcons[1][1], this.visibleIcons[2][2]],
            [this.visibleIcons[0][2], this.visibleIcons[1][1], this.visibleIcons[2][0]]

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
    private checkForWin() {
        let currentCount = 1;
        let maxCount = 1;
        let currentIcon = this.reels[0].currentIcon;
        
        for (let i = 1; i < this.reels.length; i++) {
          if (this.reels[i].currentIcon === currentIcon) {
            currentCount++;
            if (currentCount > maxCount) {
              maxCount = currentCount;
            }
          } else {
            currentIcon = this.reels[i].currentIcon;
            currentCount = 1;
          }
        }
        
        console.log(maxCount)
      }
    private checkLines(lines: number[][]) {
        lines.slice(0,this.selectedLines).forEach( (line, index) => {
            if (line[0] === line[1] && line[0] === line[2]) {
                console.log("Big win on line: " + index)
            } else if (line[0] === line[1] || line[1] === line[2]) {
                console.log("Little win on line: " + index)
            } 
        })
        

    }
}