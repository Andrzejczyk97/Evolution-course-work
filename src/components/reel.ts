import { Mesh, Scene, Vector3, Animation } from "@babylonjs/core";
import { Matrix2D } from "@babylonjs/gui";

export class Reel extends Mesh {
    private reelMesh: Mesh;
    public currentIcon: number;
    public constructor(scene: Scene, meshName: string) {
        super("reel", scene);
        this.reelMesh = scene.getMeshByName(meshName) as Mesh;
        this.reelMesh.setParent(this);
        this.currentIcon = 0;

        // Get position of origin of reelMesh relative to parent coordinate system
        const originPosition = this.reelMesh.getAbsolutePosition();
        const parentPosition = this.getAbsolutePosition() ?? Vector3.Zero();
        const originRelativeToParent = originPosition.subtract(parentPosition);

        // Set pivot point to position of origin relative to parent coordinate system
        this.setPivotPoint(originRelativeToParent);

    }
   
    
    public spin(amount?: number) {
        if(!amount) amount = 16 + Math.floor( Math.random() * 16);
        const animation = new Animation("spinReel", "rotation.x", 60, Animation.ANIMATIONTYPE_FLOAT)
        const duration = 140 + Math.random()*60;
        const keyFrames = [
            {frame: 0, value: this.rotation.x},
            {frame: duration, value: this.rotation.x - Math.PI / 8 * amount}
        ]
        animation.setKeys(keyFrames);
        this.getScene().animations = [];
        this.animations.push(animation);
        this.getScene().beginAnimation(this,0,duration,false)
        
        this.currentIcon = this.currentIcon + amount;
        if(this.currentIcon > 16) this.currentIcon = this.currentIcon % 16;
        console.log(`${this.reelMesh.name} turned by ${amount} to ${this.currentIcon}` );

    }
}