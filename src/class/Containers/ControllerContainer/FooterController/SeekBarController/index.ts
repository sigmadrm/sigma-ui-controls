import BaseComponent from '../../../../BaseComponent';
import { EEVentName, IConstructorBaseProps } from '../../../../../type';

interface IConstructorProps extends IConstructorBaseProps {}

class SeekBarController extends BaseComponent {
  private progressBuffer: ProgressBuffer | undefined;
  private progressBar: ProgressBar | undefined;
  private progressThumb: ProgressThumb | undefined;
  private timeoutId: number | null | undefined;
  private duration: number = 0;
  constructor(props: IConstructorProps) {
    const { classes, apiPlayer, ids } = props;
    super(props);
    this.progressBuffer = new ProgressBuffer({
      id: ids.smProgressBuffer,
      classes,
      apiPlayer,
      ids,
    });
    this.progressBar = new ProgressBar({
      id: ids.smProgressBar,
      classes,
      apiPlayer,
      ids,
    });
    this.progressThumb = new ProgressThumb({
      id: ids.smProgressThumb,
      classes,
      apiPlayer,
      ids,
    });
    this.handleEventTimeUpdate = this.handleEventTimeUpdate.bind(this);
    this.handleEventProgress = this.handleEventProgress.bind(this);
    this.handleEventLoaded = this.handleEventLoaded.bind(this);
    this.handleEventSeeking = this.handleEventSeeking.bind(this);
  }
  render(): void {
    if (this.containerElement) {
      const { classes } = this;
      const htmlString = `
        <div class="${classes.progressContainer}" id="${this.ids.smProgressBarContainer}">
          <div class="${classes.progressBuffer}" id="${this.ids.smProgressBuffer}"></div>
          <div class="${classes.progressBar}" id="${this.ids.smProgressBar}"></div>
          <div class="${classes.progressThumb}" id="${this.ids.smProgressThumb}"></div>
        </div>`;
      this.containerElement.innerHTML = htmlString;
    }
  }
  registerListener(): void {
    this.apiPlayer.eventemitter.on(EEVentName.PROGRESS, this.handleEventProgress, this);
    this.apiPlayer.eventemitter.on(EEVentName.TIME_UPDATE, this.handleEventTimeUpdate, this);
    this.apiPlayer.eventemitter.on(EEVentName.LOADED, this.handleEventLoaded, this);
    this.apiPlayer.eventemitter.on(EEVentName.SEEKING, this.handleEventSeeking, this);
    if (this?.containerElement) {
      this.containerElement.onclick = (e: MouseEvent) => {
        this.handleEventClick(e);
      };
    }

    // Xử lý kéo thanh tiến trình
    const progressThumbContainer = document.getElementById(this.ids.smProgressThumb);
    const progressBarbContainer = document.getElementById(this.ids.smProgressBar);

    if (progressThumbContainer && progressBarbContainer) {
      const onMove = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();

        let x: number;
        if (e.type === 'mousemove') {
          const mouseEvent = e as MouseEvent;
          // x = this.apiPlayer.isFullScreen() ? mouseEvent.clientY : mouseEvent.clientX;
          x = mouseEvent.clientX;
        } else {
          const touchEvent = e as TouchEvent;
          // x = this.apiPlayer.isFullScreen() ? touchEvent.touches[0].clientY : touchEvent.touches[0].clientX;
          x = touchEvent.touches[0].clientX;
        }

        const rect = progressBarbContainer.getBoundingClientRect();
        const offsetX = x - rect.left;
        const widthContainer = this.containerElement ? this.containerElement.offsetWidth : 0;
        const percentage = widthContainer ? (offsetX / widthContainer) * 100 : 0;

        if (percentage >= 0 && percentage <= 100) {
          progressBarbContainer.style.setProperty('--highlight-width-progress-bar', `${percentage}%`);
          progressThumbContainer.style.setProperty('--highlight-left-progress-thumb', `${percentage}%`);

          if (this.timeoutId) {
            clearTimeout(this.timeoutId);
          }
          this.timeoutId = self.setTimeout(() => {
            this.apiPlayer.setCurrentTime((percentage / 100) * this.apiPlayer.getDuration());
          }, 0);
        }
      };

      const onEnd = () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onEnd);
        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('touchend', onEnd);
      };

      progressThumbContainer.addEventListener('mousedown', (e) => {
        e.preventDefault();
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onEnd);
      });

      progressThumbContainer.addEventListener('touchstart', (e) => {
        e.preventDefault();
        document.addEventListener('touchmove', onMove);
        document.addEventListener('touchend', onEnd);
      });
    }
  }
  unregisterListener(): void {
    this.apiPlayer.eventemitter.off(EEVentName.PROGRESS, this.handleEventProgress, this);
    this.apiPlayer.eventemitter.off(EEVentName.TIME_UPDATE, this.handleEventTimeUpdate, this);
    this.apiPlayer.eventemitter.off(EEVentName.LOADED, this.handleEventLoaded, this);
    this.apiPlayer.eventemitter.off(EEVentName.SEEKING, this.handleEventSeeking, this);
    if (this?.containerElement) {
      this.containerElement.onclick = () => {};
    }
    document.onmousemove = () => {};
    document.onmouseup = () => {};
    const progressThumbContainer = document.getElementById(this.ids.smProgressThumb);
    if (progressThumbContainer) {
      progressThumbContainer.onmousedown = () => {};
      progressThumbContainer.ontouchmove = () => {};
    }
  }
  handleEventClick(e: MouseEvent) {
    e.preventDefault();

    const progressBarbContainer = document.getElementById(this.ids.smProgressBar);
    const progressThumbContainer = document.getElementById(this.ids.smProgressThumb);
    if (progressBarbContainer) {
      const rect = progressBarbContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const widthContainer = this.containerElement ? this.containerElement.offsetWidth : 0;
      const percentage = widthContainer ? (x / widthContainer) * 100 : 0;
      progressBarbContainer.style.setProperty('--highlight-width-progress-bar', `${percentage}%`);
      progressThumbContainer &&
        progressThumbContainer.style.setProperty('--highlight-left-progress-thumb', `${percentage}%`);
      this.apiPlayer.setCurrentTime((percentage / 100) * this.apiPlayer.getDuration());
    }
  }
  handleEventProgress() {
    const bufferedProgress = this.apiPlayer.getBuffering();
    if (this.progressBuffer) {
      this.progressBuffer.updateSliderHighlight(bufferedProgress);
    }
  }
  handleEventTimeUpdate() {
    const progress = this.apiPlayer.getCurrentTime();
    if (!Number.isNaN(progress)) {
      if (this.progressBar) {
        this.progressBar.updateSliderHighlight((progress / this.duration) * 100);
      }
      if (this.progressThumb) {
        this.progressThumb.updateSliderHighlight((progress / this.duration) * 100);
      }
    }
  }
  handleEventLoaded() {
    this.duration = this.apiPlayer.getDuration();

    if (this.progressBar) {
      this.progressBar.updateSliderHighlight(0);
    }
    const bufferedProgress = this.apiPlayer.getBuffering();
    if (this.progressBuffer) {
      this.progressBuffer.updateSliderHighlight(bufferedProgress);
    }
    if (this.progressThumb) {
      this.progressThumb.updateSliderHighlight(0);
    }
  }
  handleEventSeeking(e, data) {
    if (data.seeking) {
      this.apiPlayer.eventemitter.off(EEVentName.TIME_UPDATE, this.handleEventTimeUpdate, this);
      const timeStep = data.time;
      if (this.progressBar) {
        this.progressBar.updateSliderHighlight((timeStep / this.duration) * 100);
      }
      if (this.progressThumb) {
        this.progressThumb.updateSliderHighlight((timeStep / this.duration) * 100);
      }
    } else {
      this.apiPlayer.eventemitter.on(EEVentName.TIME_UPDATE, this.handleEventTimeUpdate, this);
    }
  }
}

export default SeekBarController;

class ProgressBuffer extends BaseComponent {
  constructor(props: IConstructorProps) {
    super(props);
  }
  render(): void {
    this?.containerElement?.style.setProperty('--highlight-width-progress-buffer', `0%`);
  }
  updateSliderHighlight(value: number) {
    const percentage = value;
    const inputVolRangeEle = document.getElementById(this.ids.smProgressBuffer);
    inputVolRangeEle && inputVolRangeEle.style.setProperty('--highlight-width-progress-buffer', `${percentage}%`);
  }
  getElementContainer() {
    const containerElement = this.containerElement;
    return containerElement;
  }
}
class ProgressBar extends BaseComponent {
  constructor(props: IConstructorProps) {
    super(props);
  }
  render(): void {
    this?.containerElement?.style.setProperty('--highlight-width-progress-bar', `0%`);
  }
  updateSliderHighlight(value: number) {
    const percentage = value;
    const inputVolRangeEle = document.getElementById(this.ids.smProgressBar);
    inputVolRangeEle && inputVolRangeEle.style.setProperty('--highlight-width-progress-bar', `${percentage}%`);
  }
  getElementContainer() {
    const containerElement = this.containerElement;
    return containerElement;
  }
}
class ProgressThumb extends BaseComponent {
  constructor(props: IConstructorProps) {
    super(props);
  }
  render(): void {
    this?.containerElement?.style.setProperty('--highlight-left-progress-thumb', `0%`);
  }
  updateSliderHighlight(value: number) {
    const percentage = value;
    const inputVolRangeEle = document.getElementById(this.ids.smProgressThumb);
    inputVolRangeEle && inputVolRangeEle.style.setProperty('--highlight-left-progress-thumb', `${percentage}%`);
  }
  getElementContainer() {
    const containerElement = this.containerElement;
    return containerElement;
  }
}
