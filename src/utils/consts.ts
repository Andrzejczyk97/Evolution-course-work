export enum GuiValueType {
  Balance = 'balance',
  Bet = 'bet',
  Paylines = 'paylines',
}
export enum SoundsLinks {
  background = './sounds/background.mp3',
  bigWin = './sounds/bigwin.wav',
  cash = './sounds/coins.wav',
  click = './sounds/click.wav',
  error = './sounds/error.wav',
  spin = './sounds/spin.wav',
  steps = './sounds/steps.mp3',
}
export enum ImageLinks {
  ceiling = './images/ceiling.jpg',
  floor = './images/marbleFloor.png',
  greenSpin = './images/greenSpin.png',
  minus = './images/minus.png',
  minusInactive = './images/minusInactive.png',
  plus = './images/plus.png',
  plusInactive = './images/plusInactive.png',
  redSpin = './images/redSpin.png',
  wall1 = './images/wall1.jpg',
  wall2 = './images/wall2.jpg',
  arrowUp = './images/arrowUp.png',
  arrowDown = './images/arrowDown.png',
  arrowLeft = './images/arrowLeft.png',
  arrowRight = './images/arrowRight.png',
  cameraButton = './images/cameraButton.png',
  win = './images/win.png'
}
export enum ValuesLimits {
  BetMax = '50',
  BetMin = '5',
  PaylinesMax = '5',
  PaylinesMin = '1',
}
export const meshNames = {
  reelsIndicators: ['LineIndicator_1', 'LineIndicator_2', 'LineIndicator_3', 'LineIndicator_4', 'LineIndicator_5'],
  spinHandle: ['SpinHandle_primitive0', 'SpinHandle_primitive1'],
  radio: ['Radio_primitive0', 'Radio_primitive1', 'Radio_primitive2'],
  machine: ['MachineBox'],
  head: ['head'],
  tables: ['table1_root', 'table2_root'],
  plant: ['plant'],
  pool: ['pool_table'],
  bar: ['bar_root'],
};

export enum MeshLinks {
  bar = './models/bar.glb',
  darts = './models/darts.glb',
  head = './models/head.glb',
  machine = './models/untitled.glb',
  plant = './models/monstera.glb',
  pool = './models/poolTable.glb',
  radio = './models/Radio.glb',
  table = './models/tablewithchairs.glb',
}
