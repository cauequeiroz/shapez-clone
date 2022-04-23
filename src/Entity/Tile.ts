import { Graphics, DisplayObject } from 'pixi.js';

const TileColors: Record<number, number> = {
  0: 0xecf0f1,
  1: 0xe74c3c
}

export class Tile {
  private value: number;
  private size: number;
  private isHighlighted: boolean = false;
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

  private drawElement(highlighted: boolean = false) {
    this.element.clear();
    this.element.beginFill(TileColors[this.value]);
    this.element.lineStyle(1, 0x34495e);
    this.element.drawRect(0, 0, this.size, this.size);
    this.element.endFill();

    if (highlighted) {
      this.element.lineStyle(10, 0x2c3e50, 0.3);
      this.element.drawRoundedRect(10, 10, this.size - 20, this.size - 20, 5);
    }
  }

  public getElement(): DisplayObject {
    return this.element;
  }

  public toggleValue() {
    this.value = Number(!this.value);
    this.drawElement();
  }

  public highlight() {
    if (this.isHighlighted) return;

    this.isHighlighted = true;
    this.drawElement(true);
  }

  public removeHighlight() {
    this.isHighlighted = false;
    this.drawElement(false);
  }
}