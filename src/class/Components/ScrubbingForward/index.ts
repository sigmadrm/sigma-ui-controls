import { scrubbingForwardIcon } from '../../../icons';
import { EEVentName, ETypeScrubbing, IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';

interface IConstructorProps extends IConstructorBaseProps {}
class ScrubbingForward extends BaseComponent {
  private counter = 0;
  private timerId: number | null | undefined;
  private timerIdScrubbing: number | null | undefined;
  private icon: Element | undefined;
  private text: Element | undefined;
  private ripple: Element | undefined;
  constructor(props: IConstructorProps) {
    super(props);
  }

  render() {
    const { classes } = this;
    if (this.containerElement) {
      this.containerElement.innerHTML = `<div class="${classes.scrubbingContainer}">
      <div class="${classes.scrubbingRippleRight}"></div>
      <div class="${classes.scrubbingIcon}">${scrubbingForwardIcon}</div>
      <div class="${classes.scrubbingText}"></div>
      </div>`;
    }
    this.icon = this.containerElement?.getElementsByClassName(classes.scrubbingIcon)[0];
    this.ripple = this.containerElement?.getElementsByClassName(classes.scrubbingRippleRight)[0];
    this.text = this.containerElement?.getElementsByClassName(classes.scrubbingText)[0];
  }
  registerListener() {
    if (!this.containerElement) return;
    this.containerElement.onclick = (event) => this.handleContainerClick(event);
  }

  unregisterListener() {
    if (!this.containerElement) return;
    this.containerElement.onclick = () => {};
  }

  handleContainerClick(event: MouseEvent | TouchEvent) {
    const { apiPlayer } = this;
    event.preventDefault();
    event.stopPropagation();
    const evt = event as PointerEvent;
    if (evt) {
      if (evt.pointerType === 'touch') {
        this.counter++;
        if (this.counter >= 2) {
          this.show();
        }
        if (this.timerId) clearTimeout(this.timerId);
        this.timerId = null;
        this.timerId = self.setTimeout(() => {
          if (this.counter - 1 !== 0) {
            const timeStep = apiPlayer.getCurrentTime() + (this.counter - 1) * 10;
            this.counter = 0;
            this.apiPlayer.eventemitter.trigger(EEVentName.SCRUBBING, { counter: this.counter });
            this.hidden();
            if (timeStep <= apiPlayer.getDuration()) {
              apiPlayer.setCurrentTime(timeStep);
            } else {
              apiPlayer.setCurrentTime(apiPlayer.getDuration());
            }
          }
        }, 300);
        if (this.timerIdScrubbing) clearTimeout(this.timerIdScrubbing);
        this.timerIdScrubbing = self.setTimeout(() => {
          this.counter = 0;
        }, 500);
        this.apiPlayer.eventemitter.trigger(EEVentName.SCRUBBING, { counter: this.counter });
        if (this.counter - 1 !== 0) {
          this.apiPlayer.eventemitter.trigger(EEVentName.SEEKING, {
            seeking: true,
            time: apiPlayer.getCurrentTime() + (this.counter - 1) * 10,
            type: ETypeScrubbing.FORWARD,
          });
        }
      }
    }
  }
  show() {
    if (this.ripple) {
      this.ripple.classList.add(this.classes.scrubbingRippleRightEnable);
    }
    if (this.text) {
      this.text.innerHTML = `${String((this.counter - 1) * 10)} s`;
    }
    if (this.icon) {
      this.icon.classList.add(this.classes.scrubbingIconEnable);
    }
  }
  hidden() {
    if (this.ripple) {
      this.ripple.classList.remove(this.classes.scrubbingRippleRightEnable);
    }
    if (this.text) {
      this.text.innerHTML = '';
    }
    if (this.icon) {
      this.icon.classList.remove(this.classes.scrubbingIconEnable);
    }
  }
}

export default ScrubbingForward;
