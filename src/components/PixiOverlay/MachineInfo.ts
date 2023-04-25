import { Ticker } from 'pixi.js';
import { Values } from './Values';
import { SpinButton } from './Spin';
import { GuiValueType } from '../../utils/consts';
import { GameState } from '../Logic/GameState';
import { SoundManager } from '../Logic/Sounds';
import { GUIManager } from './GUIManager';

export default class MachineInfo {
    private state: GameState;
    private sounds: SoundManager;
    public bet: Values;
    public paylines: Values;
    private balance: Values;
    public spinButton: SpinButton;
    private parent: GUIManager;

    public constructor( state: GameState, parent: GUIManager, sounds: SoundManager) {
    this.state = state;
    this.sounds = sounds;
    this.parent = parent;
    this.bet = new Values({ state: this.state, type: GuiValueType.Bet, sounds: this.sounds });
    this.paylines = new Values({ state: this.state, type: GuiValueType.Paylines, sounds: this.sounds });
    this.balance = new Values({ state: this.state, type: GuiValueType.Balance });
    this.spinButton = new SpinButton(this.state);

    this.balance.position.set(10, 10);
    this.bet.position.set(10, 160);
    this.paylines.position.set(10, 310);
    this.spinButton.position.set(10, 460);

    this.spinButton.interactive = true;
    this.spinButton.on('pointerdown', () => {
      this.parent.reels.spin();
    });

    const ticker = new Ticker();
    ticker.add(() => {
      this.checkForWin();
      this.updateValues();
      this.spinButton.checkButton();
      this.bet.checkButtons();
      this.paylines.checkButtons();
    });
    ticker.start();

    this.parent.machineGui.addChild(this.bet, this.paylines, this.balance, this.spinButton);
    this.parent.machineGui.position.set(10, 10);
    this.parent.machineGui.alpha = 0;
  }
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
      this.parent.animateWin();
    }
  }
}
