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
  private rotationAngle: number;
  private isHighlighted: boolean = false;
  private highlightValue!: number;
  private element!: Container;

  constructor(value: number, size: number) {
    this.coreMechanics = CoreMechanics.getInstance();
    this.value = value;
    this.size = size;
    this.rotationAngle = 0;

    this.createElement();
  }

  private createElement() {
    this.element = new Container();
    this.drawBaseLayer();    
  }

  private drawBaseLayer() {
    if (this.element.children[0]) {
      this.element.children[0].destroy();
    }

    const spriteContainer = new Container();

    const sprite = Sprite.from(TileTextures[this.value]);
    sprite.width = this.size;
    sprite.height = this.size;
    sprite.x = this.size / 2;
    sprite.y = this.size / 2;
    sprite.anchor.set(0.5);
    sprite.angle = this.rotationAngle;

    const spriteBorder = new Graphics();
    spriteBorder.lineStyle(1, 0x636e72, 0.2);
    spriteBorder.drawRect(0, 0, this.size, this.size);

    spriteContainer.addChild(sprite);
    spriteContainer.addChild(spriteBorder);

    this.element.addChild(spriteContainer);
  }

  private drawHighlightLayer() {
    if (this.element.children[0]) {
      this.element.children[0].destroy();
    }
    
    const highlightContainer = new Container();
    
    // TODO: Refactor this part to remove Grid control of Tile content
    // Tile must be able to access toolbox to get what it needs.
    const highlightValue = this.coreMechanics.mechanics.toolbox.getActiveTool().getType();

    const sprite = Sprite.from(TileTextures[highlightValue]);
    sprite.width = this.size;
    sprite.height = this.size;
    sprite.x = this.size / 2;
    sprite.y = this.size / 2;
    sprite.anchor.set(0.5);
    sprite.angle = this.coreMechanics.mechanics.toolbox.getRotateAngle();

    const highlightedBorder = new Graphics();
    highlightedBorder.lineStyle(4, 0xFFFFFF, 0.2);
    highlightedBorder.drawRect(0, 0, this.size - 4, this.size - 4);
    highlightedBorder.x = 2;
    highlightedBorder.y = 2;

    highlightContainer.addChild(sprite);
    highlightContainer.addChild(highlightedBorder);

    this.element.addChild(highlightContainer);
  }

  public getElement(): DisplayObject {
    return this.element;
  }

  public update() {
    if (this.isHighlighted) {
      this.drawHighlightLayer();
    }
  }

  public setValue() {
    const rotationAngle = this.coreMechanics.mechanics.toolbox.getRotateAngle();
    const value = this.coreMechanics.mechanics.toolbox.getActiveTool().getType();

    if (this.value == value && this.rotationAngle == rotationAngle) return;

    this.value = value;
    this.rotationAngle = rotationAngle;
    this.drawBaseLayer();
  }

  // TODO: Refactor this part to remove Grid control of Tile content
  // Tile must be able to access toolbox to get this value.
  public highlight(value: number) {
    if (this.isHighlighted) return;

    this.isHighlighted = true;
    this.highlightValue = value;
    this.drawHighlightLayer();
  }

  public removeHighlight() {
    this.isHighlighted = false;
    this.drawBaseLayer();
  }
}