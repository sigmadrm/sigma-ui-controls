import BaseComponent from '../../../../BaseComponent';
import { EEVentName, IConstructorBaseProps } from '../../../../../type';

interface IConstructorProps extends IConstructorBaseProps {}

class SeekBarController extends BaseComponent {
  private progressBarContainer: ProgressBarContainer | undefined;
  constructor(props: IConstructorProps) {
    const { classes, apiPlayer, ids } = props;
    super(props);
    this.progressBarContainer = new ProgressBarContainer({
      id: ids.smProgressBarContainer,
      classes,
      apiPlayer,
      ids,
    });
  }
  render(): void {
    if (this.containerElement) {
      const { classes } = this;
      const htmlString = `
          <div class="${classes.progressContainer}" id="${this.ids.smProgressBarContainer}"></div>`;
      this.containerElement.innerHTML = htmlString;
    }
  }
}

class ProgressBarContainer extends BaseComponent {
  private progressBuffer: ProgressBuffer | undefined;
  private progressBar: ProgressBar | undefined;
  private progressThumb: ProgressThumb | undefined;
  private duration: number = 0;
  private timeStep: number | null = null;
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
          <div class="${classes.progressBuffer}" id="${this.ids.smProgressBuffer}"></div>
          <div class="${classes.progressBar}" id="${this.ids.smProgressBar}"></div>
          <div class="${classes.progressThumb}" id="${this.ids.smProgressThumb}"></div>`;
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
    const progressThumbEle = document.getElementById(this.ids.smProgressThumb);
    const progressBarEle = document.getElementById(this.ids.smProgressBar);
    const progressBarContainerEle = this.containerElement;

    if (progressThumbEle && progressBarEle && progressBarContainerEle) {
      const onMove = (e: MouseEvent | TouchEvent) => {
        e.preventDefault();

        let x: number;
        if (e.type === 'mousemove') {
          const mouseEvent = e as MouseEvent;
          x = mouseEvent.clientX;
        } else {
          const touchEvent = e as TouchEvent;
          x = touchEvent.touches[0].clientX;
        }

        const rect = progressBarEle.getBoundingClientRect();
        const offsetX = x - rect.left;
        const widthContainer = this.containerElement ? this.containerElement.offsetWidth : 0;
        const percentage = widthContainer ? (offsetX / widthContainer) * 100 : 0;
        let timeStep;
        if (percentage >= 0 && percentage <= 100) {
          progressBarEle.style.setProperty('--highlight-width-progress-bar', `${percentage}%`);
          progressThumbEle.style.setProperty('--highlight-left-progress-thumb', `${percentage}%`);
          timeStep = (percentage / 100) * this.duration;
        } else if (percentage < 0) {
          progressBarEle.style.setProperty('--highlight-width-progress-bar', `${0}%`);
          progressThumbEle.style.setProperty('--highlight-left-progress-thumb', `${0}%`);
          timeStep = 0;
        } else {
          progressBarEle.style.setProperty('--highlight-width-progress-bar', `${100}%`);
          progressThumbEle.style.setProperty('--highlight-left-progress-thumb', `${100}%`);
          timeStep = this.duration;
        }

        this.apiPlayer.eventemitter.trigger(EEVentName.SEEK_BAR_SEEKING, { seeking: true, time: timeStep });
        this.timeStep = timeStep;
      };

      const onEnd = () => {
        this.apiPlayer.eventemitter.trigger(EEVentName.SEEK_BAR_SEEKING, { seeking: false });
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onEnd);
        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('touchend', onEnd);
      };

      if (this.containerElement) {
        this.containerElement.addEventListener('touchmove', (e) => {
          e.preventDefault();
          const x = e.touches[0].clientX;
          const rect = progressBarEle.getBoundingClientRect();
          const offsetX = x - rect.left;
          const widthContainer = this.containerElement ? this.containerElement.offsetWidth : 0;
          const percentage = widthContainer ? (offsetX / widthContainer) * 100 : 0;

          let timeStep;
          if (percentage >= 0 && percentage <= 100) {
            progressBarEle.style.setProperty('--highlight-width-progress-bar', `${percentage}%`);
            progressThumbEle.style.setProperty('--highlight-left-progress-thumb', `${percentage}%`);
            timeStep = (percentage / 100) * this.duration;
          } else if (percentage < 0) {
            progressBarEle.style.setProperty('--highlight-width-progress-bar', `${0}%`);
            progressThumbEle.style.setProperty('--highlight-left-progress-thumb', `${0}%`);
            timeStep = 0;
          } else {
            progressBarEle.style.setProperty('--highlight-width-progress-bar', `${100}%`);
            progressThumbEle.style.setProperty('--highlight-left-progress-thumb', `${100}%`);
            timeStep = this.duration;
          }
          progressBarContainerEle.classList.add(this.classes.progressContainerActive);
          progressThumbEle.classList.add(this.classes.smProgressThumbActive);
          this.apiPlayer.eventemitter.off(EEVentName.PROGRESS, this.handleEventProgress, this);
          this.apiPlayer.eventemitter.off(EEVentName.TIME_UPDATE, this.handleEventTimeUpdate, this);
          this.apiPlayer.eventemitter.trigger(EEVentName.SEEK_BAR_SEEKING, { seeking: true, time: timeStep });
          this.timeStep = timeStep;
        });
      }

      progressThumbEle.addEventListener('mousedown', (e) => {
        e.preventDefault();
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onEnd);
      });

      progressThumbEle.addEventListener('touchstart', (e) => {
        e.preventDefault();
        document.addEventListener('touchmove', onMove);
        document.addEventListener('touchend', onEnd);
      });
      progressThumbEle.addEventListener('mouseup', (e) => {
        this.timeStep !== null && this.apiPlayer.setCurrentTime(this.timeStep);
      });
      progressThumbEle.addEventListener('touchend', (e) => {
        this.timeStep !== null && this.apiPlayer.setCurrentTime(this.timeStep);
      });

      progressBarContainerEle.addEventListener('touchstart', (e) => {
        progressBarContainerEle.classList.add(this.classes.progressContainerActive);
        progressThumbEle.classList.add(this.classes.smProgressThumbActive);
      });
      progressBarContainerEle.addEventListener('touchend', (e) => {
        this.apiPlayer.eventemitter.trigger(EEVentName.SEEK_BAR_SEEKING, { seeking: false });
        this.apiPlayer.eventemitter.on(EEVentName.PROGRESS, this.handleEventProgress, this);
        this.apiPlayer.eventemitter.on(EEVentName.TIME_UPDATE, this.handleEventTimeUpdate, this);
        progressBarContainerEle.classList.remove(this.classes.progressContainerActive);
        progressThumbEle.classList.remove(this.classes.smProgressThumbActive);
        this.timeStep !== null && this.apiPlayer.setCurrentTime(this.timeStep);
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
    if (this.containerElement) {
      this.containerElement.ontouchmove = () => {};
      this.containerElement.ontouchstart = () => {};
      this.containerElement.ontouchend = () => {};
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
      const timeStep = (percentage / 100) * this.duration;
      progressBarbContainer.style.setProperty('--highlight-width-progress-bar', `${percentage}%`);
      progressThumbContainer &&
        progressThumbContainer.style.setProperty('--highlight-left-progress-thumb', `${percentage}%`);
      this.apiPlayer.setCurrentTime(timeStep);
      this.apiPlayer.eventemitter.trigger(EEVentName.SEEK_BAR_SEEKING, { seeking: false });
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
}
export default SeekBarController;
