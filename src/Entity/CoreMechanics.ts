import { ToolBox } from '../Entity/ToolBox';

type Mechanics = {
  toolbox: ToolBox
}

export class CoreMechanics {
  private static instance: CoreMechanics;

  public mechanics!: Mechanics;

  public static getInstance(): CoreMechanics {
    if (!CoreMechanics.instance) {
        CoreMechanics.instance = new CoreMechanics();
    }

    return CoreMechanics.instance;
  }

  public addMechanic(mechanicName: string, mechanic: any) {
    this.mechanics = {
      ...this.mechanics,
      [mechanicName]: mechanic
    };
  }
}