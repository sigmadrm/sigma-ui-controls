import { scrubbingRewindIcon } from '../../../icons';
import { EEVentName, IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';

interface IConstructorProps extends IConstructorBaseProps {}
class ScrubbingRewind extends BaseComponent {
  private counter = 0;
  private timerId: number | null | undefined;
  private timerIdScrubbing: number | null | undefined;
  constructor(props: IConstructorProps) {
    super(props);
  }

  render() {
    if (this.containerElement) {
      this.containerElement.innerHTML = `<div style="width: 24px; height: 24px;">${scrubbingRewindIcon}</div>`;
    }
  }
  registerListener() {
    if (!this.containerElement) return;
    this.containerElement.onclick = (event) => this.handleContainerClick(event);
  }

  unregisterListener() {
    if (!this.containerElement) return;
    this.containerElement.onclick = () => {};
  }

  handleContainerClick(event: MouseEvent | ToggleEvent) {
    const { apiPlayer } = this;
    event.preventDefault();
    event.stopPropagation();
    const evt = event as PointerEvent;
    if (evt) {
      if (evt.pointerType === 'touch') {
        this.counter++;
        if (this.timerId) clearTimeout(this.timerId);
        this.timerId = null;
        this.timerId = self.setTimeout(() => {
          if (this.counter - 1 !== 0) {
            const timeStep = apiPlayer.getCurrentTime() - (this.counter - 1) * 10;
            if (timeStep > 0) {
              apiPlayer.setCurrentTime(timeStep);
            } else {
              apiPlayer.setCurrentTime(0);
            }
            this.counter = 0;
            this.apiPlayer.eventemitter.trigger(EEVentName.SCRUBBING, { counter: this.counter });
            this.apiPlayer.eventemitter.trigger(EEVentName.SEEKING, { seeking: false });
          }
        }, 300);
        if (this.timerIdScrubbing) clearTimeout(this.timerIdScrubbing);
        this.timerIdScrubbing = self.setTimeout(() => {
          this.counter = 0;
        }, 500);
        this.apiPlayer.eventemitter.trigger(EEVentName.SCRUBBING, { counter: this.counter });
        this.apiPlayer.eventemitter.trigger(EEVentName.SEEKING, { seeking: true });
      }
    }
  }
}

export default ScrubbingRewind;
