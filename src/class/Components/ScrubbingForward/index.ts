import { scrubbingForwardIcon } from '../../../icons';
import { EEVentName, ETypeScrubbing, IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';

interface IConstructorProps extends IConstructorBaseProps {}
class ScrubbingForward extends BaseComponent {
  private counter = 0;
  private timerId: number | null | undefined;
  private timerIdScrubbing: number | null | undefined;
  private ripple: ScrubbingRippleRight | undefined;
  private icon: ScrubbingIcon | undefined;
  private text: ScrubbingText | undefined;
  constructor(props: IConstructorProps) {
    const { classes, apiPlayer, ids } = props;
    super(props);
    this.ripple = new ScrubbingRippleRight({
      id: ids.smScrubbingForwardRippleRight,
      classes,
      apiPlayer,
      ids,
    });
    this.icon = new ScrubbingIcon({
      id: ids.smScrubbingForwardIcon,
      classes,
      apiPlayer,
      ids,
    });
    this.text = new ScrubbingText({
      id: ids.smScrubbingForwardText,
      classes,
      apiPlayer,
      ids,
    });
  }

  render() {
    const { classes, ids } = this;
    if (this.containerElement) {
      this.containerElement.innerHTML = `<div class="${classes.scrubbingContainer}">
      <div class="${classes.scrubbingRippleRight}" id="${ids.smScrubbingForwardRippleRight}"></div>
      <div class="${classes.scrubbingIcon}" id="${ids.smScrubbingForwardIcon}"></div>
      <div class="${classes.scrubbingText}" id="${ids.smScrubbingForwardText}"></div>
      </div>`;
    }
  }
  registerListener() {
    if (!this.containerElement) return;
    this.containerElement.ontouchend = (event) => this.handleContainerClick(event);
  }

  unregisterListener() {
    if (!this.containerElement) return;
    this.containerElement.ontouchend = () => {};
  }

  handleContainerClick(event: TouchEvent) {
    const { apiPlayer } = this;
    event.preventDefault();
    event.stopPropagation();
    const currentTime = apiPlayer.getCurrentTime();
    const durationTime = apiPlayer.getDuration();
    if (event) {
      this.counter++;
      if (this.counter >= 2) {
        this.show();
      }
      if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }
      this.timerId = self.setTimeout(() => {
        if (this.counter - 1 !== 0) {
          const timeStep = currentTime + (this.counter - 1) * 10;
          console.log('setCurrentTime', currentTime, durationTime, timeStep);
          this.counter = 0;
          this.apiPlayer.eventemitter.trigger(EEVentName.SCRUBBING, { counter: this.counter });
          this.hidden();
          apiPlayer.setCurrentTime(timeStep < durationTime ? timeStep : durationTime);
          this.apiPlayer.eventemitter.trigger(EEVentName.SEEKING, {
            seeking: false,
          });
        }
      }, 300);
      if (this.timerIdScrubbing) clearTimeout(this.timerIdScrubbing);
      this.timerIdScrubbing = self.setTimeout(() => {
        this.counter = 0;
      }, 500);
      this.apiPlayer.eventemitter.trigger(EEVentName.SCRUBBING, { counter: this.counter });
      if (this.counter - 1 !== 0) {
        const timeStep = currentTime + (this.counter - 1) * 10;
        console.log('EEVentName.SCRUBBING', currentTime, durationTime, timeStep);
        this.apiPlayer.eventemitter.trigger(EEVentName.SEEKING, {
          seeking: true,
          time: timeStep < durationTime ? timeStep : durationTime,
          type: ETypeScrubbing.FORWARD,
        });
      }
    }
  }
  show() {
    if (this.ripple) {
      this.ripple.show();
    }
    if (this.text) {
      this.text.update(`${String((this.counter - 1) * 10)} s`);
    }
    if (this.icon) {
      this.icon.show();
    }
  }
  hidden() {
    if (this.ripple) {
      this.ripple.hidden();
    }
    if (this.text) {
      this.text.update('');
    }
    if (this.icon) {
      this.icon.hidden();
    }
  }
}

class ScrubbingRippleRight extends BaseComponent {
  constructor(props: IConstructorProps) {
    super(props);
  }
  render(): void {}
  show() {
    if (this.containerElement) {
      this.containerElement.classList.add(this.classes.scrubbingRippleRightEnable);
    }
  }
  hidden() {
    if (this.containerElement) {
      this.containerElement.classList.remove(this.classes.scrubbingRippleRightEnable);
    }
  }
}
class ScrubbingIcon extends BaseComponent {
  constructor(props: IConstructorProps) {
    super(props);
  }
  render(): void {
    if (this.containerElement) {
      this.containerElement.innerHTML = scrubbingForwardIcon;
    }
  }
  show() {
    console.log(this.containerElement);
    if (this.containerElement) {
      this.containerElement.classList.add(this.classes.scrubbingIconEnable);
    }
  }
  hidden() {
    if (this.containerElement) {
      this.containerElement.classList.remove(this.classes.scrubbingIconEnable);
    }
  }
}
class ScrubbingText extends BaseComponent {
  constructor(props: IConstructorProps) {
    super(props);
  }
  render(): void {}
  update(value: string) {
    if (this.containerElement) {
      this.containerElement.innerHTML = value;
    }
  }
}
export default ScrubbingForward;
