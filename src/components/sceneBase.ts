import { HemisphericLight, Engine, Scene, Vector3, ArcRotateCamera, FreeCamera } from "@babylonjs/core";

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
        // const camera = new FreeCamera("baseCamera", new Vector3(5, 0, 4), scene);
        const camera = new ArcRotateCamera("baseCamera", Math.PI/2*3, Math.PI/2, 10, new Vector3(5, 5, 14), scene);
        // camera.wheelDeltaPercentage = 0.01;
        // camera.attachControl(this.canvas, true);
        camera.fov = 1
        camera.speed = 0.2
    }
    protected createLight(scene: Scene) {
        const lights = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
        const lights2 = new HemisphericLight("light", new Vector3(0, -1, 0), scene);
        lights.intensity = 0.5
        // lights2.intensity = 0.4
    }
    protected abstract addContent(): void;
    private onRender = () => {
        this.scene.render();
    }
    private onResize = () =>  {
        this.engine.resize();
    }
}
