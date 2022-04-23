import { Button, ButtonSettings } from "./Button";

enum states {
  STATE_ONE,
  STATE_TWO
};

type SwitchButtonSettings = ButtonSettings & {
  stateTwo: {
    label: string;
    backgroundColor?: number;
    textColor?: number;
  };
  initialState?: 'STATE_ONE' | 'STATE_TWO';
}

type state = {
  label: string;
  backgroundColor: number;
  textColor: number;
}

export class SwitchButton extends Button {
  private stateOne: state;
  private stateTwo: state;
  private currentState: states;

  constructor(settings: SwitchButtonSettings) {
    super(settings);

    const { stateTwo } = settings;

    this.stateOne = {
      label: this.label,
      backgroundColor: this.backgroundColor,
      textColor: this.textColor
    }
    this.stateTwo = {
      label: stateTwo.label,
      backgroundColor: stateTwo.backgroundColor || this.backgroundColor,
      textColor: stateTwo.textColor || this.textColor
    };
    
    // TODO: allow user to init with diffent state
    this.currentState = states.STATE_ONE;
  }

  public override setClickEvent(func: any, context: any) {
    this.element.interactive = true;
    this.element.on('click', () => this.handleClick(func, context), this);
  }

  private handleClick(func: any, context: any) {
    if (this.currentState == states.STATE_ONE) {
      this.currentState = states.STATE_TWO;
      this.changeButtonText(this.stateTwo.label);
      this.changeBackgroundColor(this.stateTwo.backgroundColor);
    } else {
      this.currentState = states.STATE_ONE;
      this.changeButtonText(this.stateOne.label);
      this.changeBackgroundColor(this.stateOne.backgroundColor);
    }

    func.apply(context);
  }

  private changeButtonText(text: string) {
    this.labelElement.text = text;
  }

  private changeBackgroundColor(color: number) {
    this.backgroundColor = color;
    this.drawBackground();
  }
}