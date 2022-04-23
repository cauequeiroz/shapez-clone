import { Application } from "pixi.js";
import { SwitchButton } from "./UI/SwitchButton";
import { Grid } from "./Entity/Grid";
import { ToolBox } from "./Entity/ToolBox";
import { CoreMechanics } from "./Entity/CoreMechanics";

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
    
    

    // Tools
    const toolBox = new ToolBox();
    const toolBoxElement = toolBox.getElement();
    
    toolBoxElement.y = application.screen.height - toolBoxElement.height;
    
    // Grid
    const grid = new Grid(9, 10).getElement();
  
    // Add core mechanics
    const coreMechanics = CoreMechanics.getInstance();
    coreMechanics.addMechanic('toolbox', toolBox);

    // Add entities
    this.application.stage.addChild(grid);
    this.application.stage.addChild(switchButton.getElement());
    this.application.stage.addChild(toolBoxElement);

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