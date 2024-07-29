import BaseComponent from '../../../../BaseComponent';
import { EEVentName, IConstructorBaseProps } from '../../../../../type';

import { ids } from '../../../../../constants';
import { createElementFromHTML } from '../../../../../services';

interface IConstructorProps extends IConstructorBaseProps {}

class SeekBarController extends BaseComponent {
  private progressBuffer: ProgressBuffer | undefined;
  private progressBar: ProgressBar | undefined;
  private progressThumb: ProgressThumb | undefined;
  constructor(props: IConstructorProps) {
    const { classes, apiPlayer } = props;
    super(props);
    this.progressBuffer = new ProgressBuffer({
      id: ids.smProgressBarContainer,
      classes,
      apiPlayer,
    });
    this.progressBar = new ProgressBar({
      id: ids.smProgressBarContainer,
      classes,
      apiPlayer,
    });
    this.progressThumb = new ProgressThumb({
      id: ids.smProgressBarContainer,
      classes,
      apiPlayer,
    });
  }
  render(): void {
    if (this.containerElement) {
      const { classes } = this;
      const htmlString = `<div class="${classes.progressContainer}" id="${ids.smProgressBarContainer}"></div>`;
      this.containerElement.innerHTML = htmlString;
    }
  }
  registerListener(): void {
    const { apiPlayer } = this;
    apiPlayer.eventemitter.on(EEVentName.PROGRESS, (e, data) => {
      const bufferedProgress = apiPlayer.getBuffering();
      if (this.progressBuffer) {
        this.progressBuffer.updateSliderHighlight(bufferedProgress);
      }
    });
    apiPlayer.eventemitter.on(EEVentName.TIME_UPDATE, (e, data) => {
      const progress = apiPlayer.getProgress();
      if (!Number.isNaN(progress)) {
        if (this.progressBar) {
          this.progressBar.updateSliderHighlight(progress);
        }
        if (this.progressThumb) {
          this.progressThumb.updateSliderHighlight(progress);
        }
      }
    });
    apiPlayer.eventemitter.on(EEVentName.LOADED, (e, data) => {
      const progress = apiPlayer.getProgress();

      if (this.progressBar) {
        this.progressBar.updateSliderHighlight(progress);
      }
      const bufferedProgress = apiPlayer.getBuffering();
      if (this.progressBuffer) {
        this.progressBuffer.updateSliderHighlight(bufferedProgress);
      }
      if (this.progressThumb) {
        this.progressThumb.updateSliderHighlight(progress);
      }
    });
  }
  unregisterListener(): void {}
}

export default SeekBarController;

class ProgressBuffer extends BaseComponent {
  constructor(props: IConstructorProps) {
    const { classes, apiPlayer } = props;
    super(props);
  }
  render(): void {
    if (this.containerElement) {
      const { classes } = this;
      const htmlString = `<div class="${classes.progressBuffer}" id="${ids.smProgressBuffer}"></div>`;
      const ele = createElementFromHTML(htmlString);
      ele && this.containerElement.appendChild(ele);
    }
  }
  updateSliderHighlight(volume: number) {
    const percentage = volume;
    const inputVolRangeEle = document.getElementById(ids.smProgressBuffer);
    inputVolRangeEle && inputVolRangeEle.style.setProperty('--highlight-width-progress-buffer', `${percentage}%`);
  }
}
class ProgressBar extends BaseComponent {
  constructor(props: IConstructorProps) {
    const { classes, apiPlayer } = props;
    super(props);
  }
  render(): void {
    if (this.containerElement) {
      const { classes } = this;
      const htmlString = `<div class="${classes.progressBar}" id="${ids.smProgressBar}"></div>`;
      const ele = createElementFromHTML(htmlString);
      ele && this.containerElement.appendChild(ele);
    }
  }
  updateSliderHighlight(volume: number) {
    const percentage = volume;
    const inputVolRangeEle = document.getElementById(ids.smProgressBar);
    inputVolRangeEle && inputVolRangeEle.style.setProperty('--highlight-width-progress-bar', `${percentage}%`);
  }
}
class ProgressThumb extends BaseComponent {
  constructor(props: IConstructorProps) {
    const { classes, apiPlayer } = props;
    super(props);
  }
  render(): void {
    if (this.containerElement) {
      const { classes } = this;
      const htmlString = `<div class="${classes.progressThumb}" id="${ids.smProgressThumb}"></div>`;
      const ele = createElementFromHTML(htmlString);
      ele && this.containerElement.appendChild(ele);
    }
  }
  updateSliderHighlight(volume: number) {
    const percentage = volume;
    const inputVolRangeEle = document.getElementById(ids.smProgressThumb);
    inputVolRangeEle && inputVolRangeEle.style.setProperty('--highlight-width-progress-thumb', `${percentage}%`);
  }
}
