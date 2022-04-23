import { CoreMechanics } from '../Entity/CoreMechanics';
import { DisplayObject, Texture, Container, Sprite, Graphics } from 'pixi.js';

const TileTextures: Record<number, Texture> = {
  0: Texture.from("shapez_empty.png"),
  1: Texture.from("shapez_1.png"),
  2: Texture.from("shapez_0.png"),
  3: Texture.from("shapez_3.png"),
  4: Texture.from("shapez_5.png")
}

export class Tile {
  private coreMechanics: CoreMechanics;

  private value: number;
  private size: number;
  private isHighlighted: boolean = false;
  private highlightValue!: number;
  private element!: Container;

  constructor(value: number, size: number) {
    this.coreMechanics = CoreMechanics.getInstance();
    this.value = value;
    this.size = size;

    this.createElement();
  }

  private createElement() {
    this.element = new Container();
    this.drawElement();    
  }

  private drawElement(highlighted: boolean = false) {
    if (this.element.children[0]) {
      this.element.children[0].destroy();
    }

    const spriteContainer = new Container();

    const sprite = Sprite.from(TileTextures[this.value]);
    sprite.width = this.size;
    sprite.height = this.size;

    const spriteBorder = new Graphics();
    spriteBorder.lineStyle(1, 0x636e72, 0.2);
    spriteBorder.drawRect(0, 0, this.size, this.size);

    spriteContainer.addChild(sprite);
    spriteContainer.addChild(spriteBorder);
    
    if (highlighted) {
      sprite.texture = TileTextures[this.highlightValue];
      
      const highlightedBorder = new Graphics();
      highlightedBorder.lineStyle(4, 0xFFFFFF, 0.2);
      highlightedBorder.drawRect(0, 0, this.size - 4, this.size - 4);
      highlightedBorder.x = 2;
      highlightedBorder.y = 2;

      const rotateAngle = this.coreMechanics.mechanics.toolbox.getRotateAngle();
      sprite.x = this.size / 2;
      sprite.y = this.size / 2;
      sprite.anchor.set(0.5);
      sprite.angle = rotateAngle;

      spriteContainer.addChild(highlightedBorder);
    }
    
    this.element.addChild(spriteContainer);
  }

  public getElement(): DisplayObject {
    return this.element;
  }

  public toggleValue() {
    this.value = Number(!this.value);
    this.drawElement();
  }

  public setValue(value: number) {
    if (this.value == value) return;
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