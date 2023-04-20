import { Graphics, Sprite, Text, Container, Texture } from 'pixi.js';
import { ImageLinks, GuiValueType, ValuesLimits } from '../../utils/consts';
import { GameState } from '../Logic/GameState';
import { SoundManager } from '../Logic/sounds';

interface ValuesProps {
  sounds?: SoundManager,
  state: GameState,
  type: GuiValueType
}

export class Values extends Container {
  private state: GameState;
  private sounds: SoundManager | undefined;
  private readonly title = new Text('', {
    fontFamily: 'Arial',
    fontSize: 34,
    fill: 0xfafffa,
    align: 'center',
  });
  public value = new Text('', {
    fontFamily: 'Arial',
    fontSize: 34,
    fill: 0xfafffa,
    align: 'center',
  });
  private minus: Sprite;
  private plus: Sprite;
  private readonly activePlus = Texture.from(ImageLinks.plus);
  private readonly inactivePlus = Texture.from(ImageLinks.plusInactive);
  private readonly activeMinus = Texture.from(ImageLinks.minus);
  private readonly inactiveMinus = Texture.from(ImageLinks.minusInactive);
  private readonly background = new Graphics();
  private readonly type: GuiValueType;

  public constructor({ state, type, sounds }: ValuesProps) {
    super();

    this.type = type;
    this.state = state;
    this.sounds = sounds;

    this.background.beginFill(0x3e494b, 0.8);
    this.background.lineStyle(4, 0x0, 0.3);
    this.background.drawRoundedRect(0, 0, 260, 140, 30);
    this.background.endFill();
    this.addChild(this.background);

    this.title.position.set(30, 15);
    this.value.anchor.set(0.5);
    this.value.position.set(130, 95);

    this.plus = Sprite.from(this.activePlus);
    this.plus.scale.set(0.10);
    this.plus.anchor.set(0.5);
    this.plus.position.set(200, 95);
    this.minus = Sprite.from(this.activeMinus);
    this.minus.scale.set(0.10);
    this.minus.anchor.set(0.5);
    this.minus.position.set(60, 95);
    this.plus.interactive = true;
    this.minus.interactive = true;
    this.addChild(this.value);
    this.addChild(this.title);
    switch (type) {
      case GuiValueType.Balance:
        this.title.text = 'Balance: ';
        this.value.text = state.balance.toString();
        break;

      case GuiValueType.Bet:
        this.title.text = 'Current bet: ';
        this.value.text = state.betStake.toString();
        this.plus.on('pointerdown', () => {
          this.changeValueWithSound(state.betPlus);
        });
        this.minus.on('pointerdown', () => {
          this.changeValueWithSound(state.betMinus);
        });
        this.addChild(this.plus);
        this.addChild(this.minus);
        break;

      case GuiValueType.Paylines:
        this.title.text = 'Paylines: ';
        this.value.text = state.paylines.toString();
        this.plus.on('pointerdown', () => {
          this.changeValueWithSound(state.paylinesPlus);
        });
        this.minus.on('pointerdown', () => {
          this.changeValueWithSound(state.paylinesMinus);
        });
        this.addChild(this.plus);
        this.addChild(this.minus);
        break;
    }
  }

  public checkButtons() {
    if (this.state.spinning) {
      this.plus.texture = this.inactivePlus;
      this.minus.texture = this.inactiveMinus;
    } else {
      this.plus.texture = this.activePlus;
      this.minus.texture = this.activeMinus;
      if (this.type === GuiValueType.Bet) {
        if (this.value.text === ValuesLimits.BetMax) this.plus.texture = this.inactivePlus;
        else this.plus.texture = this.activePlus;
        if (this.value.text === ValuesLimits.BetMin) this.minus.texture = this.inactiveMinus;
        else this.minus.texture = this.activeMinus;
      }
      if (this.type === GuiValueType.Paylines) {
        if (this.value.text === ValuesLimits.PaylinesMax) this.plus.texture = this.inactivePlus;
        else this.plus.texture = this.activePlus;
        if (this.value.text === ValuesLimits.PaylinesMin) this.minus.texture = this.inactiveMinus;
        else this.minus.texture = this.activeMinus;
      }
    }
  }

  private changeValueWithSound(fn: () => boolean) {
    if (this.sounds) {
      if (fn()) this.sounds.click();
      else this.sounds.error();
    }
  }
}
