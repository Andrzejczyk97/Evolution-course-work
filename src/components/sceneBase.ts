import { HemisphericLight, Engine, Scene, Vector3, ArcRotateCamera } from "@babylonjs/core";

export abstract class sceneBase {
    protected readonly engine: Engine;
    protected readonly canvas: HTMLCanvasElement;
    protected readonly scene: Scene;
    
    public constructor() {
        this.canvas = this.createCanvas();
        this.engine = this.createEngine(this.canvas);
        this.scene = this.createScene(this.engine);
        this.createCamera(this.scene);
        this.createLight(this.scene);
        this.addContent();
        window.addEventListener("resize", this.onResize);
        this.engine.runRenderLoop(this.onRender);
    }
    public start(): void {
        this.onResize();
    }
    public remove(): void {
        this.dispose();
    }
    private dispose = () => {
        this.canvas.remove()
    }
    protected createCanvas(): HTMLCanvasElement {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        return canvas;
    }
    protected createEngine(canvas: HTMLCanvasElement): Engine {
        return new Engine(canvas, true, {}, true);
    }
    protected createScene(engine: Engine): Scene {
        return new Scene(engine, {});
    }
    protected createCamera(scene: Scene) {
        const camera = new ArcRotateCamera("camera", -Math.PI  * 0.5, Math.PI * 0.5, 48, Vector3.Zero(), scene);
        camera.wheelDeltaPercentage = 0.01;
        camera.attachControl(this.canvas, true);
        camera.fov = 0.3
    }
    protected createLight(scene: Scene) {
        const lights = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    }
    protected abstract addContent(): void;
    private onRender = () => {
        this.scene.render();
    }
    private onResize = () =>  {
        this.engine.resize();
    }
}
