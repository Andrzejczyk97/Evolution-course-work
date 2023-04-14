import { Text, Application, Ticker } from "pixi.js";

export class Balance {
    private parent: Application;
    private balance: number;
    private balanceText: Text;

    public constructor(parent: Application, balance: number) {
        this.parent = parent;
        this.balance = balance;

        const title = new Text('Balance:', {
            fontFamily: 'Arial',
            fontSize: 34,
            fill: 0xfafffa,
            align: 'center',
        })
        title.position.set(30,30);
        this.parent.stage.addChild(title);
        
        this.balanceText = new Text(`${this.balance}`, {
            fontFamily: 'Arial',
            fontSize: 34,
            fill: 0xfafffa,
            align: 'center',
        })
        this.balanceText.position.set(30,60);
        this.parent.stage.addChild(this.balanceText);

        const ticker = new Ticker();
        ticker.add(() => {
            if (this.balanceText.text !== `${this.balance}`) {
                this.balanceText.text = `${this.balance}`;
            }
        });
        ticker.start();
    }

    public setBalance(balance: number) {
        this.balance = balance;
    }
}
