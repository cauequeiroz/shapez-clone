import { Graphics, DisplayObject } from 'pixi.js';

const TileColors: Record<number, number> = {
  0: 0xFFFFFF,
  1: 0xFF0000
}

export class Tile {
  private value: number;
  private size: number;

  private element!: Graphics;

  constructor(value: number, size: number) {
    this.value = value;
    this.size = size;

    this.createElement();
  }

  private createElement() {
    this.element = new Graphics();
    this.drawElement();    
  }

  private drawElement() {
    this.element.clear();
    this.element.beginFill(TileColors[this.value]);
    this.element.lineStyle(2, 0x000000);
    this.element.drawRect(0, 0, this.size, this.size);
    this.element.endFill();
  }

  public getElement(): DisplayObject {
    return this.element;
  }

  public toggleValue() {
    this.value = Number(!this.value);
    this.drawElement();
  }
}