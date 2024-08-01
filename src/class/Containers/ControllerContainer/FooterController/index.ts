import BaseComponent from '../../../BaseComponent';
import { ids } from '../../../../constants';
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

  constructor(props: IConstructorProps) {
    const { classes, apiPlayer } = props;
    super(props);

    this.seekBarController = new SeekBarController({
      id: ids.smSeekBarController,
      classes,
      apiPlayer,
    });
    this.taskbarController = new TaskbarController({
      id: ids.smTaskbarController,
      classes,
      apiPlayer,
    });
  }
  render() {
    if (this.containerElement) {
      const { classes } = this;
      const htmlString = `<div class=${classes.seekBarController} id=${ids.smSeekBarController}></div>
      <div class=${classes.taskbarController} id=${ids.smTaskbarController}></div>`;
      this.containerElement.innerHTML = htmlString;
    }
  }
  registerListener() {
    if (this.containerElement) {
      this.containerElement.onclick = (event) => this.handelEventClick(event);
    }
  }
  unregisterListener(): void {
    if (this.containerElement) {
      this.containerElement.onclick = (event) => {};
    }
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
