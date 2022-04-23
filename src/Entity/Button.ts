import { Container, DisplayObject, Graphics, Text, TextStyle } from "pixi.js";

export type ButtonSettings = {
  label: string;
  xPosition: number;
  yPosition: number;
  backgroundColor?: number;
  textColor?: number;
  width?: number;
  height?: number;  
}

export class Button {
  protected label: string;
  protected backgroundColor: number;
  protected textColor: number;

  protected xPosition: number;
  protected yPosition: number;
  protected width: number;
  protected height: number;
  protected element!: Container;
  protected labelElement!: Text;
  protected backgroundElement!: Graphics;

  constructor({
    label,
    backgroundColor = 0x2980b9,
    textColor = 0x333333,
    xPosition,
    yPosition,
    width = 100,
    height = 50,
  }: ButtonSettings) {

    this.label = label;
    this.backgroundColor = backgroundColor;
    this.textColor = textColor;
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.width = width;
    this.height = height;
    this.createElement();   
  }

  public setClickEvent(func: any, context: any) {
    this.element.interactive = true;
    this.element.on("click", func, context);
  }

  public getElement(): DisplayObject {
    return this.element;
  }

  private createElement() {
    const button = new Container();

    this.backgroundElement = new Graphics();
    this.drawBackground();

    const textStyle = new TextStyle({
      fontFamily: "Courier New",
      fontSize: 20,
      fill: this.textColor
    });
    const text = new Text(this.label, textStyle);
    text.anchor.set(0.5);
    text.x = this.backgroundElement.width / 2;
    text.y = this.backgroundElement.height / 2;
    
    button.x = this.xPosition;    
    button.y = this.yPosition;
    
    button.addChild(this.backgroundElement);
    button.addChild(text);

    this.element = button;
    this.labelElement = text;
  }

  protected drawBackground() {
    this.backgroundElement.clear();
    this.backgroundElement.beginFill(this.backgroundColor);
    this.backgroundElement.drawRect(0, 0, this.width, this.height);
    this.backgroundElement.endFill();
  } 
}