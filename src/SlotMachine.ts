import {AssetsManager, Mesh, Vector3} from '@babylonjs/core';
import "@babylonjs/loaders/glTF"
import "@babylonjs/loaders/"
import { sceneBase } from './components/sceneBase'
import { Reel } from './components/reel';
import { Machine } from './components/machine';
import { Lever } from './components/lever';
import { ActionManager } from '@babylonjs/core/Actions/actionManager';
import { ReelManager } from './components/reelsManager';
import setEnviroment from './utils/setEnviroment';
import { Player } from './components/player';
// import setEnvi
export class SlotMachine extends sceneBase {
  protected addContent(): void {
    this.boot()
    .then(() => {
                
      setEnviroment(this.scene, 40, 15, 40);
      const machineRoot = new Machine(this.scene, "__root__");
          
      const plant = this.scene.getMeshByName("Planta2.002")?.parent as Mesh;
      const plantChild = plant.getChildMeshes()[0];
      plantChild.checkCollisions = true;
      plant.position.set( 13,-4.85,13)
      plant.rotate( new Vector3(0,1,0), Math.PI)
      plant.scaling = new Vector3(4,4,4)
                
      const player = new Player(this.scene, "head")
                
      const reel1 = new Reel(this.scene,"Reel1");
      const reel2 = new Reel(this.scene,"Reel2");
      const reel3 = new Reel(this.scene,"Reel3");
      const lever = new Lever(this.scene, "SpinHandle_primitive0", "SpinHandle_primitive1")
                
      const manager = new ReelManager(this.scene, reel1, reel2, reel3, lever);
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
    assetManager.addMeshTask(
        "load-plant01", 
        "", 
        "./models/monstera.glb", 
        ""
    );
    assetManager.addMeshTask(
        "load-head", 
        "", 
        "./models/head.glb", 
        ""
    );
    assetManager.addTextureTask("load-ground","./marbleFloor.avif")
    assetManager.addTextureTask("load-wall1","./wall1.jpg")
    assetManager.addTextureTask("load-wall2","./wall2.jpg")
    return assetManager.loadAsync();
}
}

