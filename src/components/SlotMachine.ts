import {AssetsManager, Vector3, Sound, Mesh} from '@babylonjs/core';
import "@babylonjs/loaders/glTF"
import "@babylonjs/loaders/"
import { sceneBase } from './sceneBase'
import { Reel } from './reel';
import { Machine } from './machine';
import { Lever } from './lever';
import { ReelManager } from './reelsManager';
import setEnviroment from '../utils/setEnviroment';
import { Player } from './player'
import { GUImanager } from './GUImanager';
import { GameState} from './gameState';
import { LinesIndicator } from './LinesIndicator';
import { Shadows } from './shadows';
import { InteractionManager } from './interactionManager';
import { soundManager } from './sounds';

export class SlotMachine extends sceneBase {
  protected addContent(): void {
    this.boot()
    .then(() => {           
      setEnviroment(this.scene, 40, 12, 40);
      const shadows = new Shadows(this.scene)
      const sounds = new soundManager(this.scene);
      const lever = new Lever(this.scene)   
      const machine = new Machine(this.scene, "machine_root");  
      const player = new Player(this.scene, "head", sounds)
      
      const gameState = new GameState(sounds);
      
      const reelsManager = new ReelManager(this.scene, lever, gameState, sounds);
      const gui = new GUImanager(this.scene, player, gameState, machine, reelsManager, sounds)
      const lines = new LinesIndicator(this.scene, gameState)
      const interactions = new InteractionManager(this.scene, gameState, reelsManager, sounds)
    })
  }
  private boot(): Promise<void> {
    const assetManager = new AssetsManager(this.scene);
    // load SlotMachine model
    const machineLoad = assetManager.addMeshTask( "load-machine", "", "./models/", "untitled.glb");
    machineLoad.onSuccess = function (task) { 
      const root = task.loadedMeshes[0];
      root.name = "machine_root";
      root.id = "machine_root";
      // add collisions to SlotMachine
      task.loadedMeshes.forEach( mesh => {
        if(mesh.name.includes("LineIndicator")) mesh.visibility=0;
        if(mesh.name === "MachineBox") mesh.checkCollisions = true;
      })
    }
    // load plants
    const plant01Load = assetManager.addMeshTask("load-plant01", "", "./models/", "monstera.glb",);
    plant01Load.onSuccess = function (task) {
      const root = task.loadedMeshes[0];
      root.name = "plant"
      root.scaling = new Vector3(4,4,4)
      root.position.set( 13,0,13)
      root.rotate( new Vector3(0,1,0), Math.PI)
      // add collisions
      task.loadedMeshes.forEach( mesh => mesh.checkCollisions = true )
    }
    // load head - the player object
    assetManager.addMeshTask("load-head", "", "./models/", "head.glb");
    // Load Pool table
    const poolLoad = assetManager.addMeshTask("load-pool", "", "./models/", "poolTable.glb");
    poolLoad.onSuccess = function (task) { 
      const root = task.loadedMeshes[0];
      root.name = "pool_table";
      root.id = "pool_table";
      root.scaling = new Vector3(13,11,13);
      root.position.set(-10,-.3,8);
      // add collisions
      task.loadedMeshes.forEach( mesh => mesh.checkCollisions = true )
    }
    //  Load darts
    const dartsLoad = assetManager.addMeshTask("load-pool", "", "./models/", "darts.glb");
    dartsLoad.onSuccess = function (task) { 
      const root = task.loadedMeshes[0];
      root.name = "darts_root";
      root.id = "darts_root";
      root.scaling = new Vector3(.7,.7,.7);
      root.rotate( new Vector3(1,0,0), 3.05)
      root.rotate( new Vector3(0,0,1), Math.PI/2*3)
      root.position.set(20,6.85,7)
    }
    //  Load darts
    const barLoad = assetManager.addMeshTask("load-bar", "", "./models/", "bar.glb");
    barLoad.onSuccess = function (task) { 
      const root = task.loadedMeshes[0];
      root.name = "bar_root";
      root.id = "bar_root";
      root.scaling = new Vector3(1.6,1.6,-1.3);
      root.position.set(4,-0.75,-8)
      task.loadedMeshes.forEach( mesh => mesh.checkCollisions = true )
    }
    const table1Load = assetManager.addMeshTask("load-table1", "", "./models/", "tablewithchairs.glb");
    table1Load.onSuccess = function (task) { 
      const root = task.loadedMeshes[0];
      root.name = "table1_root";
      root.id = "table1_root";
      root.scaling = new Vector3(0.3,0.3,0.3);
      root.position.set(-16,0,-10)
      task.loadedMeshes.forEach( mesh => mesh.checkCollisions = true )
    }
    const table2Load = assetManager.addMeshTask("load-table2", "", "./models/", "tablewithchairs.glb");
    table2Load.onSuccess = function (task) { 
      const root = task.loadedMeshes[0];
      root.name = "table2_root";
      root.id = "table2_root";
      root.scaling = new Vector3(0.3,0.3,0.3);
      root.position.set(14,0,0)
      task.loadedMeshes.forEach( mesh => mesh.checkCollisions = true )
    }
    const radio = assetManager.addMeshTask("load-radio", "", "./models/", "radio.glb");
    radio.onSuccess = function (task) {
      const root = task.loadedMeshes[0];
      root.name = "radio"
      root.position.set(-4,3.6,-12)
      // music.attachToMesh(root)
    }
    // load textures
    assetManager.addTextureTask("load-ground","./marbleFloor.avif")
    assetManager.addTextureTask("load-wall1","./wall1.jpg")
    assetManager.addTextureTask("load-wall2","./wall2.jpg")
    assetManager.addTextureTask("load-ceiling","./ceiling.jpg")
    return assetManager.loadAsync();
}
}

