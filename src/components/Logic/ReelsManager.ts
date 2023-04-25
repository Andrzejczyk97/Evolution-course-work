import { Machine } from '../Babylon/Machine';
import { GameState, historyElement } from './GameState';
import { SoundManager } from './Sounds';

export class ReelManager {
  private readonly machine: Machine;
  private visibleIcons: number[][] = [];
  private currentLines: number[][] = [];
  private state: GameState;
  private readonly sounds: SoundManager;

  public constructor(machine: Machine, state: GameState, sounds: SoundManager) {
    this.state = state;
    this.machine = machine;
    this.sounds = sounds;
  }

  public spin(amount?: number) {
    // each reel spins for different amount of time. the duration is the moment that last reel stops.
    if (!this.state.spinning && this.state.balance >= this.state.paylines * this.state.betStake) {
      this.state.spinning = true;
      this.sounds.spin();
      this.state.balance -= this.state.paylines * this.state.betStake;
      let duration = 0;
      this.machine.reels.forEach((reel) => {
        const reelDuration = reel.spin(amount !== undefined ? amount : undefined);
        duration = Math.max(duration, reelDuration);
      });
      this.machine.lever.spin();
      this.onAfterSpin(duration);
    } else this.sounds.error();
  }

  private onAfterSpin(duration: number) {
    setTimeout(() => {
      this.getVisibleIcons();
      this.getLines();
      this.checkLines(this.currentLines);
      this.state.spinning = false;
    }, duration / 60 * 1000);
  }

  private getLines() {
    // creates an 2d array. every element is an array of icons from a specific payline.
    this.currentLines = [];
    this.currentLines.push(
      [this.visibleIcons[0][1], this.visibleIcons[1][1], this.visibleIcons[2][1]],
      [this.visibleIcons[0][0], this.visibleIcons[1][1], this.visibleIcons[2][2]],
      [this.visibleIcons[0][2], this.visibleIcons[1][1], this.visibleIcons[2][0]],
      [this.visibleIcons[0][0], this.visibleIcons[1][2], this.visibleIcons[2][0]],
      [this.visibleIcons[0][2], this.visibleIcons[1][0], this.visibleIcons[2][2]],
    );
  }

  private getVisibleIcons() {
    // for each reel create an array of icon indexes. the result is 2d array of numbers.
    this.visibleIcons = [];
    this.machine.reels.forEach((reel) => {
      const upper = reel.currentIcon + 1;
      const middle = reel.currentIcon;
      const lower = reel.currentIcon - 1;
      if (upper < 16 && lower >= 0) this.visibleIcons.push([upper, middle, lower]);
      else if (upper < 16) this.visibleIcons.push([upper, middle, 15]);
      else this.visibleIcons.push([0, middle, lower]);
    });
  }

  private checkLines(lines: number[][]) {
    // checks for two or three consecutive icons on any of active paylines
    const result: historyElement = { winningLines: [], winnings: [] };
    lines.slice(0, this.state.paylines).forEach((line, index) => {
      if (line[0] === line[1] && line[0] === line[2]) {
        result.winningLines.push(index);
        result.winnings.push(this.state.betStake * 25);
        this.state.balance += this.state.betStake * 25;
        this.sounds.bigWin();
      } else if (line[0] === line[1] || line[1] === line[2]) {
        result.winningLines.push(index);
        result.winnings.push(this.state.betStake * 5);
        this.state.balance += this.state.betStake * 5;
        this.sounds.win();
      }
    });
    if (result.winningLines.length) {
      this.state.historyAdd(result);
      console.log(result);
    }
  }
}
