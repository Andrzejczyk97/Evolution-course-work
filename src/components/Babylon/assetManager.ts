import { AssetsManager, Vector3 } from '@babylonjs/core';
import { ImageLinks, MeshLinks } from '../../utils/consts';
import { CustomLoadingScreen } from './CustomLoadingScreen';
import { SlotMachine } from './SlotMachine';

export function boot(this: SlotMachine): Promise<void> {
  const assetManager = new AssetsManager(this.scene);
  // load SlotMachine model
  const machineLoad = assetManager.addMeshTask('load-machine', '', MeshLinks.machine, '');
  machineLoad.onSuccess = function (task) {
    const root = task.loadedMeshes[0];
    root.name = 'machine_root';
    root.id = 'machine_root';
    // add collisions to SlotMachine
    task.loadedMeshes.forEach((mesh) => {
      if (mesh.name.includes('LineIndicator')) mesh.visibility = 0;
      if (mesh.name === 'MachineBox') mesh.checkCollisions = true;
    });
  };
  // load plants
  const plant01Load = assetManager.addMeshTask('load-plant01', '', MeshLinks.plant, '');
  plant01Load.onSuccess = function (task) {
    const root = task.loadedMeshes[0];
    root.name = 'plant';
    root.scaling = new Vector3(4, 4, 4);
    root.position.set(13, 0, 13);
    root.rotate(new Vector3(0, 1, 0), Math.PI);
    // add collisions
    task.loadedMeshes.forEach((mesh) => mesh.checkCollisions = true);
  };
  // load head - the player object
  assetManager.addMeshTask('load-head', '', MeshLinks.head, '');
  // Load Pool table
  const poolLoad = assetManager.addMeshTask('load-pool', '', MeshLinks.pool, '');
  poolLoad.onSuccess = function (task) {
    const root = task.loadedMeshes[0];
    root.name = 'pool_table';
    root.id = 'pool_table';
    root.scaling = new Vector3(13, 11, 13);
    root.position.set(-10, -0.3, 8);
    // add collisions
    task.loadedMeshes.forEach((mesh) => mesh.checkCollisions = true);
  };
  //  Load darts
  const dartsLoad = assetManager.addMeshTask('load-darts', '', MeshLinks.darts, '');
  dartsLoad.onSuccess = function (task) {
    const root = task.loadedMeshes[0];
    root.name = 'darts_root';
    root.id = 'darts_root';
    root.scaling = new Vector3(0.7, 0.7, 0.7);
    root.rotate(new Vector3(1, 0, 0), 3.05);
    root.rotate(new Vector3(0, 0, 1), Math.PI / 2 * 3);
    root.position.set(20, 6.85, 7);
  };
  //  Load bar
  const barLoad = assetManager.addMeshTask('load-bar', '', MeshLinks.bar, '');
  barLoad.onSuccess = function (task) {
    const root = task.loadedMeshes[0];
    root.name = 'bar_root';
    root.id = 'bar_root';
    root.scaling = new Vector3(1.6, 1.6, -1.3);
    root.position.set(4, -0.75, -8);
    task.loadedMeshes.forEach((mesh) => mesh.checkCollisions = true);
  };
  //  Load tables
  const table1Load = assetManager.addMeshTask('load-table1', '', MeshLinks.table, '');
  table1Load.onSuccess = function (task) {
    const root = task.loadedMeshes[0];
    root.name = 'table1_root';
    root.id = 'table1_root';
    root.scaling = new Vector3(0.3, 0.3, 0.3);
    root.position.set(-16, 0, -10);
    task.loadedMeshes.forEach((mesh) => mesh.checkCollisions = true);
  };
  const table2Load = assetManager.addMeshTask('load-table2', '', MeshLinks.table, '');
  table2Load.onSuccess = function (task) {
    const root = task.loadedMeshes[0];
    root.name = 'table2_root';
    root.id = 'table2_root';
    root.scaling = new Vector3(0.3, 0.3, 0.3);
    root.position.set(14, 0, 0);
    task.loadedMeshes.forEach((mesh) => mesh.checkCollisions = true);
  };
  // load radio
  const radio = assetManager.addMeshTask('load-radio', '', MeshLinks.radio, '');
  radio.onSuccess = function (task) {
    const root = task.loadedMeshes[0];
    root.name = 'radio';
    root.position.set(-4, 3.6, -12);
  };
  // load textures
  assetManager.addTextureTask('load-wall1', ImageLinks.wall1);
  assetManager.addTextureTask('load-wall2', ImageLinks.wall2);
  assetManager.addTextureTask('load-ground', ImageLinks.floor);
  assetManager.addTextureTask('load-ceiling', ImageLinks.ceiling);

  // set the custom loading screen,
  const loadingScreen = new CustomLoadingScreen();
  this.engine.loadingScreen = loadingScreen;
  assetManager.onProgress = (remainingCount, totalCount) => {
    loadingScreen.updateLoadingUI(totalCount - remainingCount, totalCount);
  };
  return assetManager.loadAsync();
}
