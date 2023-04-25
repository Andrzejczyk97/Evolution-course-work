import { Scene, Matrix } from '@babylonjs/core';
import { meshNames } from '../../utils/consts';
import { ReelManager } from './ReelsManager';
import { SoundManager } from './Sounds';

interface InteractionManagerProps {
  reelsManager: ReelManager,
  scene: Scene,
  sounds: SoundManager
}

export class InteractionManager {
  private readonly scene: Scene;
  private readonly reelsManager: ReelManager;
  private readonly sounds: SoundManager;

  public constructor({ scene, reelsManager, sounds }: InteractionManagerProps) {
    this.scene = scene;
    this.reelsManager = reelsManager;
    this.sounds = sounds;
    this.handleClicks();
  }

  private handleClicks = () => {
    this.scene.onPointerDown = () => {
      const ray = this.scene.createPickingRay(this.scene.pointerX, this.scene.pointerY, Matrix.Identity(), this.scene.activeCamera, false);
      const hit = this.scene.pickWithRay(ray);
      if (hit) {
        if (hit.pickedMesh) {
          this.interact(hit.pickedMesh.name);
        }
      }
    };
  };

  private interact = (meshHit: string) => {
    if (meshNames.spinHandle.includes(meshHit)) {
      this.reelsManager.spin();
    }
    if (meshNames.radio.includes(meshHit)) {
      this.sounds.background();
    }
  };
}
