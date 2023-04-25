import { Mesh, Scene, Sound } from '@babylonjs/core';
import { SoundsLinks, meshNames } from '../../utils/consts';

export class SoundManager {
  private readonly scene: Scene;
  private readonly bgSound: Sound;
  private readonly cashSound: Sound;
  private readonly spinSound: Sound;
  private readonly bigWinSound: Sound;
  private readonly clickSound: Sound;
  private readonly errorSound: Sound;
  private readonly stepsSound: Sound;

  public constructor(scene: Scene) {
    this.scene = scene;
    // create sounds
    this.bgSound = new Sound('background', SoundsLinks.background, this.scene, undefined, { volume: 0.15, spatialSound: true });
    this.cashSound = new Sound('cash', SoundsLinks.cash, this.scene, undefined, { spatialSound: true });
    this.spinSound = new Sound('spin', SoundsLinks.spin, this.scene, undefined, { spatialSound: true });
    this.bigWinSound = new Sound('bigWin', SoundsLinks.bigWin, this.scene, undefined, { spatialSound: true });
    this.stepsSound = new Sound('steps', SoundsLinks.steps, this.scene, undefined, { volume: 0.20, spatialSound: true, loop: true });
    this.clickSound = new Sound('click', SoundsLinks.click, this.scene, undefined);
    this.errorSound = new Sound('error', SoundsLinks.error, this.scene, undefined);
    // attach spatial sounds to meshes.
    this.stepsSound.attachToMesh(this.scene.getMeshByName(meshNames.head[0]) as Mesh);
    this.bgSound.attachToMesh(this.scene.getMeshByName(meshNames.radio[0]) as Mesh);
    this.cashSound.attachToMesh(this.scene.getMeshByName(meshNames.machine[0]) as Mesh);
    this.spinSound.attachToMesh(this.scene.getMeshByName(meshNames.machine[0]) as Mesh);
    this.bigWinSound.attachToMesh(this.scene.getMeshByName(meshNames.machine[0]) as Mesh);
  }

  public background() {
    // this.scene.audioEnabled is added to every sound that could be the first sound played in the scene. (to play audio it is required to set it by user action)
    this.scene.audioEnabled = true;
    if (this.bgSound.isPlaying) this.bgSound.stop();
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
