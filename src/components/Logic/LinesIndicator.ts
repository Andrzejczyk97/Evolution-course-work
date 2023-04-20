import { Scene, Mesh, Animation } from '@babylonjs/core';
import { meshNames } from '../../utils/consts';
import { GameState, historyElement } from './GameState';

interface LinesIndicatorProps {
  scene: Scene,
  state: GameState
}

export class LinesIndicator {
  private readonly scene: Scene;
  private state: GameState;
  private lineIndicators: Mesh[] = [];
  private paylinesNumber: number;
  private history: historyElement[];

  public constructor({ scene, state }: LinesIndicatorProps) {
    this.scene = scene;
    this.state = state;
    this.history = [...this.state.history];
    this.paylinesNumber = this.state.paylines;
    this.lineIndicators.push(
      this.scene.getMeshByName(meshNames.reelsIndicators[0]) as Mesh,
      this.scene.getMeshByName(meshNames.reelsIndicators[1]) as Mesh,
      this.scene.getMeshByName(meshNames.reelsIndicators[2]) as Mesh,
      this.scene.getMeshByName(meshNames.reelsIndicators[3]) as Mesh,
      this.scene.getMeshByName(meshNames.reelsIndicators[4]) as Mesh,
    );
    scene.onBeforeRenderObservable.add(this.onFrame);
    const animation = new Animation('anim1', 'visibility', 60, Animation.ANIMATIONTYPE_FLOAT);
    const keyframes = [];
    keyframes.push(
      { frame: 0, value: 0 },
      { frame: 30, value: 1 },
      { frame: 60, value: 0 },
    );
    animation.setKeys(keyframes);
    this.lineIndicators.forEach((line) => line.animations.push(animation));
  }

  private onFrame = () => {
    if (this.paylinesNumber !== this.state.paylines) {
      this.showPaylines(this.state.paylines);
      this.paylinesNumber = this.state.paylines;
    }
    if (this.history.length !== this.state.history.length) {
      const last = this.state.history[this.state.history.length - 1];
      last.winningLines.forEach((line) => this.showWinningLine(line));
      this.history = [...this.state.history];
    }
  };

  private showPaylines(n: number) {
    this.scene.stopAllAnimations();
    this.lineIndicators.forEach((line) => line.visibility = 0);
    this.lineIndicators.slice(0, n).forEach((line) => {
      this.scene.beginAnimation(line, 0, 60, false, 0.5);
    });
  }

  private showWinningLine(n: number) {
    this.scene.beginAnimation(this.lineIndicators[n], 0, 60, false, 1);
  }
}
