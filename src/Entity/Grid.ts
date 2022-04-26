import { Container, DisplayObject, InteractionEvent, Point } from 'pixi.js';
import { CoreMechanics } from './CoreMechanics';
import { Tile } from './Tile';

export class Grid {
  private coreMechanics: CoreMechanics;
  static tileSize = 80;

  private verticalSize: number;
  private horizontalSize: number;

  private container!: Container;
  private tiles: Tile[][];
  private activeTile!: Tile;

  constructor(verticalSize: number, horizontalSize: number) {
    this.coreMechanics = CoreMechanics.getInstance();
    this.verticalSize = verticalSize;
    this.horizontalSize = horizontalSize;
    this.tiles = this.createTiles();

    this.createElement();
    this.setupEventListeners();
  }

  private createTiles() {
    const tiles = [];

    for (let y = 0; y < this.verticalSize; y++) {
      const line = [];
      for (let x = 0; x < this.horizontalSize; x++ ) {
        line.push(new Tile(0, Grid.tileSize));
      }
      tiles.push(line);
    }

    return tiles;
  }

  private createElement() {
    this.container = new Container();

    this.tiles.forEach((tileLine, y) => {
      tileLine.forEach((tile, x) => {
        const tileItem = tile.getElement();
        tileItem.x = x * Grid.tileSize;
        tileItem.y = y * Grid.tileSize;
  
        this.container.addChild(tileItem);
      });
    });
  }

  private getActiveTool(): number {
    return this.coreMechanics.mechanics.toolbox?.getActiveTool().getType();
  }

  private setupEventListeners() {
    this.container.interactive = true;

    this.container.on('click', (event: InteractionEvent) => {
      const coord = event.data.getLocalPosition(this.container);
      const tile = this.getTileByCoords(coord);

      tile.setValue();
    }, this);

    
    this.container.on('mousemove', (event: InteractionEvent) => {
      const activeTool = this.getActiveTool();
      const coord = event.data.getLocalPosition(this.container);
      const tile = this.getTileByCoords(coord);
      
      if (!tile) return;

      if (!this.activeTile) {
        this.activeTile = tile;
        tile.highlight(activeTool);
        return;
      }

      if (tile !== this.activeTile) {
        this.activeTile.removeHighlight();
        this.activeTile = tile;
        tile.highlight(activeTool);
      } 
    }, this);
  }

  private getTileByCoords(coord: Point): Tile {
    const posY = Math.ceil((coord.y / Grid.tileSize) - 1);
    const posX = Math.ceil((coord.x / Grid.tileSize) - 1);

    return this.tiles[posY] && this.tiles[posY][posX];
  }

  public getElement(): DisplayObject {
    return this.container;
  }

  public updateTile() {
    this.activeTile.update();
  }
}