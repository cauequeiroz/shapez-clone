import { Container, Graphics, Text, TextStyle } from 'pixi.js';
import { Tool, TOOL_TYPE } from './Tool';
import { Button } from '../UI/Button';
import { settings } from '../constants';

export class ToolBox {
  private tools: Tool[];
  private activeTool!: Tool;
  private activeToolText!: Text;
  private element!: Container;

  constructor() {
    this.tools = [
      new Tool(TOOL_TYPE.BELT_1WAY),
      new Tool(TOOL_TYPE.BELT_2WAY),
      new Tool(TOOL_TYPE.BELT_3WAY),
      new Tool(TOOL_TYPE.BELT_4WAY)
    ];
    this.activeTool = this.tools[0];
    this.createElement();
  }

  private handleClickTool(tool: Tool) {
    this.activeTool = tool;
    this.activeToolText.text = String(tool.getType());
  }

  private createElement() {
    const container = new Container();

    const background = new Graphics();
    background.beginFill(0x000000);
    background.drawRect(0, 0, settings.width, 80);
    background.endFill();
    
    container.addChild(background);

    const textStyle = new TextStyle({
      fontFamily: "Courier New",
      fontSize: 20,
      fill: 0xFFFFFF
    });
    const activeToolText = new Text(String(this.activeTool.getType()), textStyle);
    this.activeToolText = activeToolText;
    container.addChild(activeToolText);

    this.tools.forEach((tool, index) => {
      const button = new Button({
        label: String(tool.getType()),
        yPosition: 15,
        xPosition: (index * 115) + 15,
      });

      button.setClickEvent(() => this.handleClickTool(tool), this);
      container.addChild(button.getElement());
    });

    this.element = container;
  }

  public getElement(): Container {
    return this.element;
  }

  public getActiveTool(): Tool {
    return this.activeTool;
  }
}