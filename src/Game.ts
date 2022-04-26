import { Application } from "pixi.js";
import { Grid } from "./Entity/Grid";
import { ToolBox } from "./Entity/ToolBox";
import { CoreMechanics } from "./Entity/CoreMechanics";

export class Game {
  private application: Application;
  private gameIsRunning: boolean = false;

  private toolbox: ToolBox;
  private grid: Grid;

  constructor(application: Application) {
    this.application = application;    

    // Tools
    this.toolbox = new ToolBox();
    const toolBoxElement = this.toolbox.getElement();    
    toolBoxElement.y = application.screen.height - toolBoxElement.height;
    
    // Add core mechanics
    const coreMechanics = CoreMechanics.getInstance();
    coreMechanics.addMechanic('toolbox', this.toolbox);

    // Grid
    this.grid = new Grid(9, 10);
    const gridElement = this.grid.getElement()  

    // Add entities
    this.application.stage.addChild(gridElement);
    this.application.stage.addChild(toolBoxElement);

    // Setup keyboard events
    this.setupKeyboardEvents();

    // Game Loop
    this.application.ticker.add(this.update, this);
  }

  private update(): void {
    if (!this.gameIsRunning) return;
  }

  public start(): void {
    this.gameIsRunning = true;
  }

  private setupKeyboardEvents() {
    document.addEventListener("keyup", (event: KeyboardEvent) => {
      if (event.key == 'r') {
        this.toolbox.rotateRight();
        this.grid.updateTile();
      }

      if (event.key == '0') {
        this.toolbox.setActiveTool(0);
        this.grid.updateTile();
      }

      if (event.key == '1') {
        this.toolbox.setActiveTool(1);
        this.grid.updateTile();
      }

      if (event.key == '2') {
        this.toolbox.setActiveTool(2);
        this.grid.updateTile();
      }

      if (event.key == '3') {
        this.toolbox.setActiveTool(3);
        this.grid.updateTile();
      }

      if (event.key == '4') {
        this.toolbox.setActiveTool(4);
        this.grid.updateTile();
      }
    });
  }
}