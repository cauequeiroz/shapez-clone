import { Application } from "pixi.js";
import { SwitchButton } from "./UI/SwitchButton";
import { Grid } from "./Entity/Grid";

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
      xPosition: 15,
      yPosition: 15,
      width: 100,
      height: 50,
      stateTwo: {
        label: 'Stop',
        backgroundColor: 0xe74c3c,
        textColor: 0xFFFFFF
      },
      initialState: "STATE_TWO"
    });
    switchButton.setClickEvent(this.handleButtonClick, this);

    // Grid
    const grid = new Grid(9, 10).getElement();
    grid.y = 80;
    
    // Add entities
    this.application.stage.addChild(grid);
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