export enum TOOL_TYPE {
  BELT_1WAY = 1,
  BELT_2WAY = 2,
  BELT_3WAY = 3,
  BELT_4WAY = 4,
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