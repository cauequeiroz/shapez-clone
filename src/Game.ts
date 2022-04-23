import { Application } from "pixi.js";
import { SwitchButton } from "./Entity/SwitchButton";

export class Game {
  private application: Application;
  private gameIsRunning: boolean = false;

  constructor(application: Application) {
    this.application = application;    

    // Switch Button
    const switchButton = new SwitchButton({
      label: 'Start',
      backgroundColor: 0x1abc9c,
      textColor: 0x2c3e50,
      xPosition: 10,
      yPosition: 10,
      width: 100,
      height: 50,
      stateTwo: {
        label: 'Stop',
        backgroundColor: 0xFF0000,
        textColor: 0xFFFFFF
      },
      initialState: "STATE_TWO"
    });
    switchButton.setClickEvent(this.handleButtonClick, this);
    
    // Add entities
    this.application.stage.addChild(switchButton.getElement());

    // Game Loop
    this.application.ticker.add(this.update, this);
  }

  private update(): void {
    if (!this.gameIsRunning) return;
  }

  public start(): void {
    this.gameIsRunning = true;
  }

  private handleButtonClick() {
    this.gameIsRunning = !this.gameIsRunning;
  }
}