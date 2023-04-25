import { Scene, Vector3 } from '@babylonjs/core';
import { Application, Ticker, Sprite, Container } from 'pixi.js';

import { Machine } from '../Babylon/Machine';
import { Player } from '../Babylon/Player';
import { ImageLinks } from '../../utils/consts';
import { GameState } from '../Logic/GameState';
import { ReelManager } from '../Logic/ReelsManager';
import { SoundManager } from '../Logic/Sounds';
import PlayerTouchInput from './TouchInput';
import MachineInfo from './MachineInfo';

interface GUIManagerProps {
  babylonScene: Scene,
  machine: Machine,
  player: Player,
  reels: ReelManager,
  sounds: SoundManager,
  state: GameState
}

export class GUIManager {
  private babylonScene: Scene;
  private player: Player;
  public state: GameState;
  private sounds: SoundManager;
  private machine: Machine;
  public reels: ReelManager;
  public machineGui = new Container();
  private controlsGui = new Container();
  private appContainer!: HTMLDivElement;
  private app!: Application<HTMLCanvasElement>;
  public winIndicator = Sprite.from(ImageLinks.win);

  public constructor({ babylonScene, player, state, sounds, machine, reels, }: GUIManagerProps) {
    this.babylonScene = babylonScene;
    this.player = player;
    this.state = state;
    this.sounds = sounds;
    this.machine = machine;
    this.reels = reels;

    this.createApp();
    this.setElements();
    this.resizeGui();
    this.passClicksToBabylon();
    this.player.input.onCameraSwitch(this.cameraSwitch);

    window.addEventListener('resize', () => {
      this.resizeGui();
    })
    
    const ticker = new Ticker();
    ticker.add(() => {
      this.manageGuiVisibility();
    });
    ticker.start();
  }
  private createApp() {
    this.appContainer = document.getElementById('overlayContainer') as HTMLDivElement;
    this.app = new Application<HTMLCanvasElement>({ resizeTo: window, backgroundAlpha: 0 });
    this.appContainer.appendChild(this.app.view);
  }
  private setElements() {
    this.winIndicator.anchor.set(0.5);
    this.winIndicator.alpha = 0;
    new MachineInfo(this.state, this, this.sounds); //this creates the machineGui.
    this.checkForTouchScreen(); //this creates controlsGui if needed.
    this.app.stage.addChild(this.machineGui, this.controlsGui, this.winIndicator);
  }
  private resizeGui() {
      const height = window.innerHeight;
      const scale = height/620;
      const width = window.innerWidth/scale;
      this.app.stage.scale.set(height/620);
      this.controlsGui.position.set(width, 610);
      this.winIndicator.position.set(width/2, 200);
  }

  private checkForTouchScreen() {
    if ('ontouchstart' in window) {
      this.player.input = new PlayerTouchInput(this.controlsGui);
    }
  }
 
  private passClicksToBabylon() {
    // this function passess clicks to the babylon canvas and sets focus on it, so the player could walk and interact.
    const pixiCanvas = this.app.view;
    const babylonCanvas = document.getElementById('canvas') as HTMLCanvasElement;
    babylonCanvas.focus();
    
    pixiCanvas.addEventListener('pointerdown', (event) => {
      babylonCanvas.focus();
      const pointerEvent = new PointerEvent("pointerdown", {
        clientX: event.clientX,
        clientY: event.clientY,
      })
      babylonCanvas.dispatchEvent(pointerEvent)
    });
  }

  private cameraSwitch = () => {
    this.player.switchVisibility();
    this.babylonScene.setActiveCameraByName(this.babylonScene.activeCamera?.name === 'baseCamera' ? 'cameraFPV' : 'baseCamera');
  };

  public animateWin() {
    const winTicker = new Ticker();
    let startTime = 0;
    const duration = 1000; // duration of the animation in milliseconds
    const frequency = 2; // frequency in showups/duration

    winTicker.add(() => {
      if (startTime === 0) {
        startTime = winTicker.lastTime; // initialize the start time on the first frame
      }
      const elapsed = winTicker.lastTime - startTime; // calculate the elapsed time
      const progress = Math.sin(elapsed * Math.PI * frequency / duration) ** 2; // calculate the oscillating progress between 0 and 1 twice in one second
      this.winIndicator.alpha = progress; // set the alpha value based on the progress
      if (elapsed >= duration) {
        this.winIndicator.alpha = 0; // hide the winIndicator at the end of the animation
        winTicker.stop(); // stop the ticker once the animation is complete
      }
    });

    winTicker.start(); // start the ticker when the animation is triggered
  }

  private manageGuiVisibility() {
    if (this.babylonScene.activeCamera?.name === 'baseCamera') {
      this.showGUI();
      return;
    }
    if (Vector3.Distance(this.machine.getAbsolutePosition(), this.player.getAbsolutePosition()) < 8) {
      this.showGUI();
    } else if (Vector3.Distance(this.machine.getAbsolutePosition(), this.player.getAbsolutePosition()) > 8) { this.hideGUI(); }
  }

  private showGUI() {
    this.machineGui.alpha = 1;
    this.machineGui.interactiveChildren = true;

  }

  private hideGUI() {
    this.machineGui.alpha = 0;
    this.machineGui.interactiveChildren = false;
  }
}
