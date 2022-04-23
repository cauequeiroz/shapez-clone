export enum TOOL_TYPE {
  BELT_1WAY = 0,
  BELT_2WAY = 1,
  BELT_3WAY = 2,
  BELT_4WAY = 3
}

export class Tool {
  private type: TOOL_TYPE;

  constructor(type: TOOL_TYPE) {
    this.type = type;
  }

  public getType() {
    return this.type;
  }
}