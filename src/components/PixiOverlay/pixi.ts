import { Application, Sprite, Text, Ticker} from "pixi.js";
import { GUImanager } from "../GUImanagerOLD";

export class PixiOverlay {
    private guiman: GUImanager;
    public constructor(guiman: GUImanager) {
        this.guiman = guiman;
        const appContainer = document.getElementById("overlayContainer") as HTMLDivElement;
        const app = new Application<HTMLCanvasElement>({
            resizeTo: window,
            antialias: true,
            resolution: 1,
            backgroundAlpha: 0,
        });
        appContainer.appendChild(app.view);
        // new Sidebar(app, this.guiman)

        const spin = Sprite.from("./greenSpin.png");
        spin.position.set(100,300);
        spin.scale.set(0.5)
        spin.interactive = true;
        spin.on("click", ()=>{
            this.guiman.reels.spin();
        })
        app.stage.addChild(spin)

        const title = new Text('Balance:', {
            fontFamily: 'Arial',
            fontSize: 34,
            fill: 0xfafffa,
            align: 'center',
        })
        title.position.set(30,30);
        app.stage.addChild(title);
        
        const balanceText = new Text(`${this.guiman.state.balance}`, {
            fontFamily: 'Arial',
            fontSize: 34,
            fill: 0xfafffa,
            align: 'center',
        })
        balanceText.position.set(30,60);
        app.stage.addChild(balanceText);

        const ticker = new Ticker();
        ticker.add(() => {
            if (balanceText.text !== `${this.guiman.state.balance}`) {
                balanceText.text = `${this.guiman.state.balance}`;
            }
        });
        ticker.start();
        
    }
}