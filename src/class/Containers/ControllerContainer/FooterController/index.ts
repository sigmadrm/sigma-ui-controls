import BaseComponent from '../../../BaseComponent';
import { EEVentName, IConstructorBaseProps } from '../../../../type';
import SeekBarController from './SeekBarController';
import TaskbarController from './TaskbarController';
import SmApiPlayer from '../../../SmApiPlayer';

interface IConstructorProps extends IConstructorBaseProps {
  apiPlayer: SmApiPlayer;
}

class FooterController extends BaseComponent {
  private seekBarController: SeekBarController | undefined;
  private taskbarController: TaskbarController | undefined;
  private isInside: boolean | null = null;

  constructor(props: IConstructorProps) {
    const { classes, apiPlayer, ids } = props;
    super(props);

    this.seekBarController = new SeekBarController({
      id: ids.smSeekBarController,
      classes,
      apiPlayer,
      ids,
    });
    this.taskbarController = new TaskbarController({
      id: ids.smTaskbarController,
      classes,
      apiPlayer,
      ids,
    });
    this.handleEvtScrubbing = this.handleEvtScrubbing.bind(this);
    this.handleEvtSeeking = this.handleEvtSeeking.bind(this);
  }
  render() {
    if (this.containerElement) {
      const { classes } = this;
      const htmlString = `<div class="${classes.seekBarController}" id="${this.ids.smSeekBarController}"></div>
      <div class="${classes.taskbarController}" id="${this.ids.smTaskbarController}"></div>`;
      this.containerElement.innerHTML = htmlString;
    }
  }
  registerListener() {
    if (this.containerElement) {
      this.containerElement.onclick = (event) => this.handelEventClick(event);
      // mouse
      this.containerElement.onmouseover = (event) => this.handelOnmouseover();
      this.containerElement.onmouseout = (event) => this.handelOnmouseout();
      //touch
      this.containerElement.ontouchstart = () => this.handelOnmouseover();
      this.containerElement.ontouchend = () => this.handelOnmouseout();
    }

    this.apiPlayer.eventemitter.on(EEVentName.SCRUBBING, this.handleEvtScrubbing, this);
    this.apiPlayer.eventemitter.on(EEVentName.SEEKING, this.handleEvtSeeking, this);
  }
  unregisterListener(): void {
    if (this.containerElement) {
      this.containerElement.onclick = () => {};
      // mouse
      this.containerElement.onmouseover = () => {};
      this.containerElement.onmouseout = () => {};
      //touch
      this.containerElement.ontouchstart = () => {};
      this.containerElement.ontouchend = () => {};
    }
    this.apiPlayer.eventemitter.off(EEVentName.SCRUBBING, this.handleEvtScrubbing, this);
    this.apiPlayer.eventemitter.off(EEVentName.SEEKING, this.handleEvtSeeking, this);
  }
  getIsInside() {
    return this.isInside;
  }
  handelOnmouseover() {
    this.isInside = true;
  }
  handelOnmouseout() {
    this.isInside = false;
  }
  handelEventClick(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
  }
  handleEvtSeeking(e, data) {}
  handleEvtScrubbing(e, data) {
    if (data.counter >= 2) {
      /* empty */
    }
  }

  hidden() {
    if (this.containerElement) {
      this.containerElement.className = this.classes.footerController;
    }
  }
  show() {
    if (this.containerElement) {
      this.containerElement.classList.add(this.classes.footerControllerEnable);
    }
  }
}

export default FooterController;
