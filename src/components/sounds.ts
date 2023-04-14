import { Mesh, Scene, Sound } from "@babylonjs/core"
export class soundManager {
    private scene: Scene;
    private bgSound: Sound;
    private cashSound: Sound;
    private spinSound: Sound;
    private bigWinSound: Sound;
    private clickSound: Sound;
    private errorSound: Sound;
    private stepsSound: Sound;
    public constructor(scene: Scene) {
        this.scene = scene;
        this.bgSound = new Sound("background", "./sounds/background.mp3", this.scene, undefined, { volume: 0.15, spatialSound: true,})
        this.cashSound = new Sound("cash", "./sounds/coins.wav", this.scene, undefined, { spatialSound: true,})
        this.spinSound = new Sound("spin", "./sounds/spin.wav", this.scene, undefined, { spatialSound: true,})
        this.bigWinSound = new Sound("bigWin", "./sounds/bigwin.wav", this.scene, undefined, { spatialSound: true,})
        this.stepsSound = new Sound("steps", "./sounds/steps.mp3", this.scene, undefined, { volume: 0.20, spatialSound: true, loop: true})
        this.clickSound = new Sound("click", "./sounds/click.wav", this.scene, undefined)
        this.errorSound = new Sound("error", "./sounds/error.wav", this.scene, undefined)

        this.stepsSound.attachToMesh(this.scene.getMeshByName("head") as Mesh)
        this.bgSound.attachToMesh(this.scene.getMeshByName("radio") as Mesh)
        this.cashSound.attachToMesh(this.scene.getMeshByName("MachineBox") as Mesh)
        this.spinSound.attachToMesh(this.scene.getMeshByName("MachineBox") as Mesh)
        this.bigWinSound.attachToMesh(this.scene.getMeshByName("MachineBox") as Mesh)

    }
    public background() {
        this.scene.audioEnabled = true;
        if(this.bgSound.isPlaying) this.bgSound.stop();
        else this.bgSound.play();
    }
    public spin() {
        this.scene.audioEnabled = true;
        this.spinSound.play();
    }
    public win() {
        this.cashSound.play();
    }
    public bigWin() {
        this.bigWinSound.play();
    }
    public click() {
        this.scene.audioEnabled = true;
        this.clickSound.play();
    }
    public error() {
        this.errorSound.play();
    }
    public stepsON() {
        this.scene.audioEnabled = true;
        this.stepsSound.play();
    }
    public stepsOff() {
        this.stepsSound.stop();
    }

}