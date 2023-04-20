import { ValuesLimits } from '../../utils/consts';

export interface historyElement {
  winningLines: number[],
  winnings: number[]
}
export class GameState {
  public balance = 1000;
  public betStake = 10;
  public paylines = 1;
  public history: historyElement[] = [];
  public spinning = false;
  public stateChangeFailed = false;
  
  public historyAdd(result: historyElement):void {
    this.history.push(result);
  }

  // below functions return Boolean value when they succeed. That gives the easy way to trigger proper sound on click.
  public betPlus = ():boolean => {
    if (this.betStake < +ValuesLimits.BetMax && this.spinning !== true) {
      this.betStake += 5;
      return true;
    } return false;
  };

  public betMinus = ():boolean => {
    if (this.betStake > +ValuesLimits.BetMin && this.spinning !== true) {
      this.betStake -= 5;
      return true;
    } return false;
  };

  public paylinesPlus = ():boolean => {
    if (this.paylines < +ValuesLimits.PaylinesMax && this.spinning !== true) {
      this.paylines += 1;
      return true;
    } return false;
  };

  public paylinesMinus = ():boolean => {
    if (this.paylines > +ValuesLimits.PaylinesMin && this.spinning !== true) {
      this.paylines -= 1;
      return true;
    } return false;
  };
}
