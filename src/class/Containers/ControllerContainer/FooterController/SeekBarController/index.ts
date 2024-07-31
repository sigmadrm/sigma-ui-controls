import BaseComponent from '../../../../BaseComponent';
import { EEVentName, IConstructorBaseProps } from '../../../../../type';

import { ids } from '../../../../../constants';

interface IConstructorProps extends IConstructorBaseProps {}

class SeekBarController extends BaseComponent {
  private progressBuffer: ProgressBuffer | undefined;
  private progressBar: ProgressBar | undefined;
  private progressThumb: ProgressThumb | undefined;
  private timeoutId: number | null | undefined;
  private isPlay: boolean | undefined;
  private percentage: number | undefined;
  constructor(props: IConstructorProps) {
    const { classes, apiPlayer } = props;
    super(props);
    this.progressBuffer = new ProgressBuffer({
      id: ids.smProgressBuffer,
      classes,
      apiPlayer,
    });
    this.progressBar = new ProgressBar({
      id: ids.smProgressBar,
      classes,
      apiPlayer,
    });
    this.progressThumb = new ProgressThumb({
      id: ids.smProgressThumb,
      classes,
      apiPlayer,
    });
  }
  render(): void {
    if (this.containerElement) {
      const { classes } = this;
      const htmlString = `
        <div class="${classes.progressContainer}" id="${ids.smProgressBarContainer}">
          <div class="${classes.progressBuffer}" id="${ids.smProgressBuffer}"></div>
          <div class="${classes.progressBar}" id="${ids.smProgressBar}"></div>
          <div class="${classes.progressThumb}" id="${ids.smProgressThumb}"></div>
        </div>`;
      this.containerElement.innerHTML = htmlString;

      const progressThumbContainer = document.getElementById(ids.smProgressThumb);
      const progressBarbContainer = document.getElementById(ids.smProgressBar);

      // Xử lý kéo thanh tiến trình
      if (progressThumbContainer && progressBarbContainer) {
        progressThumbContainer.addEventListener('mousedown', (e) => {
          e.preventDefault(); // Ngăn chặn các sự kiện mặc định của trình duyệt
          e.stopPropagation();

          // Hàm cập nhật thanh tiến trình và video.currentTime
          if (this.apiPlayer.isPlay()) {
            this.isPlay = true;
            this.apiPlayer.pause();
          } else {
            this.isPlay = false;
          }
          const onMouseMove = (e) => {
            e.preventDefault();
            e.stopPropagation();

            const rect = progressBarbContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const widthContainer = this.containerElement ? this.containerElement.offsetWidth : 0;

            const percentage = widthContainer ? (x / widthContainer) * 100 : 0;
            if (percentage >= 0 && percentage <= 100) {
              progressBarbContainer.style.setProperty('--highlight-width-progress-bar', `${percentage}%`);
              progressThumbContainer.style.setProperty('--highlight-left-progress-thumb', `${percentage}%`);
              this.percentage = percentage;
              // Xóa timeout cũ nếu có
              if (this.timeoutId) {
                clearTimeout(this.timeoutId);
              }
              // Đặt timeout để cập nhật video.currentTime sau 300ms
              this.timeoutId = self.setTimeout(() => {
                this.apiPlayer.setCurrentTime((percentage / 100) * this.apiPlayer.getDuration());
                if (this.isPlay) {
                  this.apiPlayer.play();
                }
              }, 300);
            }
          };

          // Thêm các sự kiện mousemove và mouseup
          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener(
            'mouseup',
            () => {
              document.removeEventListener('mousemove', onMouseMove);
            },
            { once: true },
          );
        });
      }
    }
  }
  registerListener(): void {
    this.apiPlayer.eventemitter.on(EEVentName.PROGRESS, this.handleEventProgress, this);
    this.apiPlayer.eventemitter.on(EEVentName.TIME_UPDATE, this.handleEventTimeUpdate, this);
    this.apiPlayer.eventemitter.on(EEVentName.LOADED, this.handleEventTimeLoaded, this);
    if (this?.containerElement) {
      this.containerElement.onclick = (e: MouseEvent) => {
        this.handleEventClick(e);
      };
    }
  }
  unregisterListener(): void {
    this.apiPlayer.eventemitter.off(EEVentName.PROGRESS, this.handleEventProgress, this);
    this.apiPlayer.eventemitter.off(EEVentName.TIME_UPDATE, this.handleEventTimeUpdate, this);
    this.apiPlayer.eventemitter.off(EEVentName.LOADED, this.handleEventTimeLoaded, this);
    if (this?.containerElement) {
      this.containerElement.onclick = () => {};
    }
  }
  handleEventClick(e: MouseEvent) {
    const progressBarbContainer = document.getElementById(ids.smProgressBar);
    if (progressBarbContainer) {
      const rect = progressBarbContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const widthContainer = this.containerElement ? this.containerElement.offsetWidth : 0;
      const percentage = widthContainer ? (x / widthContainer) * 100 : 0;
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
    const progress = this.apiPlayer.getProgress();
    if (!Number.isNaN(progress)) {
      if (this.progressBar) {
        this.progressBar.updateSliderHighlight(progress);
      }
      if (this.progressThumb) {
        this.progressThumb.updateSliderHighlight(progress);
      }
    }
  }
  handleEventTimeLoaded() {
    const progress = this.apiPlayer.getProgress();

    if (this.progressBar) {
      this.progressBar.updateSliderHighlight(progress);
    }
    const bufferedProgress = this.apiPlayer.getBuffering();
    if (this.progressBuffer) {
      this.progressBuffer.updateSliderHighlight(bufferedProgress);
    }
    if (this.progressThumb) {
      this.progressThumb.updateSliderHighlight(progress);
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
  updateSliderHighlight(volume: number) {
    const percentage = volume;
    const inputVolRangeEle = document.getElementById(ids.smProgressBuffer);
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
  updateSliderHighlight(volume: number) {
    const percentage = volume;
    const inputVolRangeEle = document.getElementById(ids.smProgressBar);
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
  updateSliderHighlight(volume: number) {
    const percentage = volume;
    const inputVolRangeEle = document.getElementById(ids.smProgressThumb);
    inputVolRangeEle && inputVolRangeEle.style.setProperty('--highlight-left-progress-thumb', `${percentage}%`);
  }
  getElementContainer() {
    const containerElement = this.containerElement;
    return containerElement;
  }
}
