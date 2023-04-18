import { Scene, Vector3 } from '@babylonjs/core';
import { Application, Ticker, Sprite } from 'pixi.js';
import { Machine } from '../Babylon/Machine';
import { Player } from '../Babylon/Player';
import { GuiValueType } from '../consts';
import { GameState } from '../Logic/GameState';
import { ReelManager } from '../Logic/ReelsManager';
import { SoundManager } from '../Logic/sounds';
import { SpinButton } from './Spin';
import { Values } from './Values';

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
  private bet: Values;
  private paylines: Values;
  private balance: Values;
  private spinButton: SpinButton;
  private appContainer: HTMLDivElement;
  private app: Application<HTMLCanvasElement>;
  private winIndicator = Sprite.from('./images/win.png');

  public constructor({ babylonScene, player, state, sounds, machine, reels, }: GUIManagerProps) {
    this.babylonScene = babylonScene;
    this.player = player;
    this.state = state;
    this.sounds = sounds;
    this.machine = machine;
    this.reels = reels;

    this.bet = new Values({ state: this.state, type: GuiValueType.Bet, sounds: this.sounds });
    this.paylines = new Values({ state: this.state, type: GuiValueType.Paylines, sounds: this.sounds });
    this.balance = new Values({ state: this.state, type: GuiValueType.Balance });
    this.spinButton = new SpinButton(this.state);

    this.appContainer = document.getElementById('overlayContainer') as HTMLDivElement;
    this.app = new Application<HTMLCanvasElement>({ resizeTo: window, backgroundAlpha: 0 });
    this.appContainer.appendChild(this.app.view);
    this.setUpGui();
    // function below prevents focus from staying on the overlay(player couldn't walk)
    this.focusBackOnBabylon();

    this.player.input.onCameraSwitch(this.cameraSwitch);
  }

  private focusBackOnBabylon() {
    const pixiCanvas = this.app.view;
    const babylonCanvas = document.getElementById('canvas') as HTMLCanvasElement;
    babylonCanvas.focus();
    pixiCanvas.addEventListener('click', () => {
      babylonCanvas.focus();
    });
  }

  private setUpGui() {
    this.balance.position.set(10, 10);
    this.bet.position.set(10, 160);
    this.paylines.position.set(10, 310);
    this.spinButton.position.set(10, 460);
    this.winIndicator.anchor.set(0.5);
    this.winIndicator.position.set(this.app.screen.width / 2, 200);
    this.winIndicator.alpha = 0;
    this.app.stage.addChild(this.balance);
    this.app.stage.addChild(this.bet);
    this.app.stage.addChild(this.paylines);
    this.app.stage.addChild(this.spinButton);
    this.app.stage.addChild(this.winIndicator);

    this.spinButton.interactive = true;
    this.spinButton.on('click', () => {
      this.reels.spin();
    });
    const ticker = new Ticker();
    ticker.add(() => {
      this.checkForWin();
      this.updateValues();
      this.spinButton.checkButton();
      this.bet.checkButtons();
      this.paylines.checkButtons();
      this.manageGuiVisibility();
    });
    ticker.start();
  }

  private cameraSwitch = () => {
    this.player.switchVisibility();
    this.babylonScene.setActiveCameraByName(this.babylonScene.activeCamera?.name === 'baseCamera' ? 'cameraFPV' : 'baseCamera');
  };

  private updateValues() {
    if (this.balance.value.text !== this.state.balance.toString()) {
      this.balance.value.text = this.state.balance.toString();
    }
    if (this.bet.value.text !== this.state.betStake.toString()) {
      this.bet.value.text = this.state.betStake.toString();
    }
    if (this.paylines.value.text !== this.state.paylines.toString()) {
      this.paylines.value.text = this.state.paylines.toString();
    }
  }

  private checkForWin() {
    if (+this.balance.value.text < this.state.balance) {
      this.animateWin();
    }
  }

  private animateWin() {
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
    this.appContainer.style.visibility = 'visible';
  }

  private hideGUI() {
    this.appContainer.style.visibility = 'hidden';
  }
}
