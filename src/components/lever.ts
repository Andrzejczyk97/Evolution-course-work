import { FreeCamera, Mesh, Scene, Vector3, AnimationRange, Skeleton, AnimationPropertiesOverride, Animation } from "@babylonjs/core";

export class Lever extends Mesh {
    private lever1Mesh: Mesh;
    private lever2Mesh: Mesh;
    public constructor(scene: Scene, meshName1: string, meshName2: string) {
        super("reel", scene);
        this.lever1Mesh = scene.getMeshByName(meshName1) as Mesh;
        this.lever2Mesh = scene.getMeshByName(meshName2) as Mesh;
        this.lever1Mesh.setParent(this);
        this.lever2Mesh.setParent(this);

        // Get position of origin of leverMesh relative to parent coordinate system
        const originPosition = this.lever1Mesh.getAbsolutePosition();
        const parentPosition = this.getAbsolutePosition() ?? Vector3.Zero();
        const originRelativeToParent = originPosition.subtract(parentPosition);

        // Set pivot point to position of origin relative to parent coordinate system
        this.setPivotPoint(originRelativeToParent);
        this.translate(new Vector3(0, 0, -1),1);
    }
    public spin() {
        const animation = new Animation("spinLever", "rotation.x", 60, Animation.ANIMATIONTYPE_FLOAT)
        const keyFrames = [
            {frame: 0, value: 0},
            {frame: 30, value: -Math.PI / 2},
            {frame: 60, value: 0},
        ]
        animation.setKeys(keyFrames);
        this.getScene().animations = [];
        this.animations.push(animation);
        this.getScene().beginAnimation(this,0,60,false)
        
    }
}