import '@babylonjs/loaders/glTF';
import '@babylonjs/loaders/';
import setEnviroment from '../../utils/setEnviroment';
import { GameState } from '../Logic/GameState';
import { InteractionManager } from '../Logic/InteractionManager';
import { LinesIndicator } from '../Logic/LinesIndicator';
import { ReelManager } from '../Logic/ReelsManager';
import { SoundManager } from '../Logic/sounds';
import { GUIManager } from '../PixiOverlay/GUIManager';
import { boot } from './assetManager';
import { Machine } from './Machine';
import { Player } from './Player';
import { SceneBase } from './SceneBase';
import { Shadows } from './Shadows';

export class SlotMachine extends SceneBase {
  protected addContent(): void {
    boot.call(this)
      .then(() => {
        window.scrollTo(0, 1);
        setEnviroment(this.scene, 40, 12, 40);
        new Shadows(this.scene);
        const sounds = new SoundManager(this.scene);
        const gameState = new GameState();
        const machine = new Machine(this.scene, 'machine_root');
        const player = new Player(this.scene, sounds);

        const reelsManager = new ReelManager(machine, gameState, sounds);
        new GUIManager({
          babylonScene: this.scene, player, state: gameState, sounds, machine, reels: reelsManager,
        });
        new LinesIndicator({ scene: this.scene, state: gameState });
        new InteractionManager({ scene: this.scene, reelsManager, sounds });
      });
  }
}
