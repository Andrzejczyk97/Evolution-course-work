import { ILoadingScreen } from '@babylonjs/core';

export class CustomLoadingScreen implements ILoadingScreen {
  private loadingDiv: HTMLDivElement;
  private loadingText: HTMLParagraphElement;
  private loadingBarContainer: HTMLDivElement;
  private loadingBar: HTMLDivElement;
  private controlsText: HTMLParagraphElement;
  private controlsText2: HTMLParagraphElement;
  public loadingUIBackgroundColor: string;
  public loadingUIText: string;

  constructor() {
    // Create the loading screen DOM elements
    this.loadingUIBackgroundColor = '#000333';
    this.loadingUIText = 'Loading...';
    this.loadingDiv = document.createElement('div');
    this.loadingDiv.style.position = 'absolute';
    this.loadingDiv.style.top = '0';
    this.loadingDiv.style.bottom = '0';
    this.loadingDiv.style.left = '0';
    this.loadingDiv.style.right = '0';
    this.loadingDiv.style.backgroundColor = this.loadingUIBackgroundColor;
    this.loadingDiv.style.display = 'flex';
    this.loadingDiv.style.flexDirection = 'column';
    this.loadingDiv.style.justifyContent = 'center';
    this.loadingDiv.style.alignItems = 'center';
    this.loadingDiv.style.fontFamily = 'Arial';

    this.loadingText = document.createElement('p');
    this.loadingText.innerText = this.loadingUIText;
    this.loadingText.style.color = '#fff';
    this.loadingText.style.fontSize = '36px';
    this.loadingText.style.marginBottom = '20px';
    this.loadingDiv.appendChild(this.loadingText);

    this.loadingBarContainer = document.createElement('div');
    this.loadingBarContainer.style.width = '50%';
    this.loadingBarContainer.style.height = '30px';
    this.loadingBarContainer.style.border = '1px solid #fff';
    this.loadingBarContainer.style.borderRadius = '10px';
    this.loadingDiv.appendChild(this.loadingBarContainer);

    this.loadingBar = document.createElement('div');
    this.loadingBar.style.width = '0';
    this.loadingBar.style.height = '100%';
    this.loadingBar.style.backgroundColor = '#fff';
    this.loadingBar.style.borderRadius = '5px';
    this.loadingBarContainer.appendChild(this.loadingBar);

    this.controlsText = document.createElement('p');
    this.controlsText.innerText = '"W", "S", "A", "D" to move.';
    this.controlsText.style.color = '#fff';
    this.controlsText.style.fontSize = '36px';
    this.controlsText.style.marginTop = '40px';
    this.loadingDiv.appendChild(this.controlsText);

    this.controlsText2 = document.createElement('p');
    this.controlsText2.innerText = '"C" to switch camera mode.';
    this.controlsText2.style.color = '#fff';
    this.controlsText2.style.fontSize = '36px';
    this.controlsText2.style.marginTop = '20px';
    this.loadingDiv.appendChild(this.controlsText2);
  }

  public displayLoadingUI(): void {
    // Add the loading screen to the DOM
    document.body.appendChild(this.loadingDiv);
  }

  public hideLoadingUI(): void {
    // Remove the loading screen from the DOM
    document.body.removeChild(this.loadingDiv);
  }

  public updateLoadingUI(loaded: number, total: number): void {
    // Update the loading bar percentage
    const percent = (loaded / total) * 100;
    this.loadingBar.style.width = `${percent}%`;
  }
}
