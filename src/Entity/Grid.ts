import { Container, DisplayObject, InteractionEvent } from 'pixi.js';
import { Tile } from './Tile';

export class Grid {
  static tileSize = 80;

  private verticalSize: number;
  private horizontalSize: number;

  private container!: Container;
  private tiles: Tile[][];

  constructor(verticalSize: number, horizontalSize: number) {
    this.verticalSize = verticalSize;
    this.horizontalSize = horizontalSize;
    this.tiles = this.createTiles();
    console.log(this.tiles)

    this.createElement();
    this.container.interactive = true;
    this.container.on('pointerdown', (event: InteractionEvent) => {
      const coord = event.data.getLocalPosition(this.container);
      
      const posY = Math.ceil((coord.y / Grid.tileSize) - 1);
      const posX = Math.ceil((coord.x / Grid.tileSize) - 1);

      this.tiles[posY][posX].toggleValue();
    }, this);
  }

  private createTiles() {
    const tiles = [];

    for (let y = 0; y < this.verticalSize; y++) {
      const line = [];
      for (let x = 0; x < this.horizontalSize; x++ ) {
        line.push(new Tile(Math.random() <= .5 ? 1 : 0, Grid.tileSize));
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

  public getElement(): DisplayObject {
    return this.container;
  }
}