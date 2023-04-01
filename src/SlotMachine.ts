import {AssetsManager, ExecuteCodeAction, Matrix, Mesh} from '@babylonjs/core';
import "@babylonjs/loaders/glTF"
import "@babylonjs/loaders/"
import { sceneBase } from './components/sceneBase'
import { Reel } from './components/reel';
import { Root } from './components/root';
import { Lever } from './components/lever';
import { ActionManager } from '@babylonjs/core/Actions/actionManager';
import { ReelManager } from './components/reelsManager';

export class SlotMachine extends sceneBase {
  protected addContent(): void {
    this.boot()
            .then(() => {
                const root = new Root(this.scene, "__root__");
                const reel1 = new Reel(this.scene,"Reel1");
                const reel2 = new Reel(this.scene,"Reel2");
                const reel3 = new Reel(this.scene,"Reel3");
                const lever = new Lever(this.scene, "SpinHandle_primitive0", "SpinHandle_primitive1")
                const manager = new ReelManager(this.scene, reel1, reel2, reel3, lever);

                // INITIAL ROTATION
                manager.spin(9)

            })
  }
  private boot(): Promise<void> {
    const assetManager = new AssetsManager(this.scene);
    assetManager.addMeshTask(
        "load-machine", 
        "", 
        "./models/untitled.glb", 
        ""
    );
    // TODO: ADD SKYBOX
    return assetManager.loadAsync();
}
}

