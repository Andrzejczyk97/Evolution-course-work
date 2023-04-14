import "@babylonjs/loaders/glTF"
import "@babylonjs/loaders/"
import { sceneBase } from './sceneBase'
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
import { boot } from "./assetManager";

export class SlotMachine extends sceneBase {
  protected addContent(): void {
    boot.call(this)
    .then(() => {           
      setEnviroment(this.scene, 40, 12, 40);
      new Shadows(this.scene);
      const sounds = new soundManager(this.scene);
      const machine = new Machine(this.scene, "machine_root");  
      const lever = new Lever(this.scene)   
      const player = new Player(this.scene, "head", sounds)
      const gameState = new GameState(sounds);
      
      const reelsManager = new ReelManager(this.scene, lever, gameState, sounds);
      new GUImanager(player, gameState, machine, reelsManager)
      new LinesIndicator(this.scene, gameState)
      new InteractionManager(this.scene, reelsManager, sounds)
    })
  }
}

