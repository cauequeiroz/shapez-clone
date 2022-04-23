import { Graphics, DisplayObject } from 'pixi.js';

const TileColors: Record<number, number> = {
  0: 0x333333,
  1: 0xe74c3c,
  2: 0xfd79a8,
  3: 0xfdcb6e,
  4: 0xecf0f1
}

export class Tile {
  private value: number;
  private size: number;
  private isHighlighted: boolean = false;
  private highlightValue!: number;
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
      this.element.lineStyle(10, TileColors[this.highlightValue], 1);
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

  public setValue(value: number) {
    this.value = value;
    this.drawElement();
  }

  public highlight(value: number) {
    if (this.isHighlighted) return;

    this.isHighlighted = true;
    this.highlightValue = value;
    this.drawElement(true);
  }

  public removeHighlight() {
    this.isHighlighted = false;
    this.drawElement(false);
  }
}