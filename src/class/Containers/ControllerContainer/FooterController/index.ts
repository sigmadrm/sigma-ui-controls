import BaseComponent from '../../../BaseComponent';
import { IConstructorBaseProps } from '../../../../type';
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
      this.containerElement.onmouseover = (event) => this.handelOnmouseover(event);
      this.containerElement.onmouseout = (event) => this.handelOnmouseout(event);
    }
  }
  unregisterListener(): void {
    if (this.containerElement) {
      this.containerElement.onclick = (event) => {};
      this.containerElement.onmouseover = (event) => {};
      this.containerElement.onmouseout = (event) => {};
    }
  }
  getIsInside() {
    return this.isInside;
  }
  handelOnmouseover(e: MouseEvent) {
    this.isInside = true;
  }
  handelOnmouseout(e: MouseEvent) {
    this.isInside = false;
  }
  handelEventClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
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
