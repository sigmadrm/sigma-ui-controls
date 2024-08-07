import { IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';
import { pausedIcon } from '../../../icons';

interface IConstructorProps extends IConstructorBaseProps {}
class ButtonPauseSecondary extends BaseComponent {
  constructor(props: IConstructorProps) {
    super(props);
  }
  render() {
    if (this.containerElement) {
      this.containerElement.innerHTML = pausedIcon;
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
  handleContainerClick(event: MouseEvent) {
    const { apiPlayer } = this;
    event.preventDefault();
    event.stopPropagation();

    if (apiPlayer.isPlay()) {
      apiPlayer.pause();
    }
  }

  hide() {
    if (this.containerElement) {
      this.containerElement.className = this.classes.taskbarGroupBtn;
    }
  }
  show() {
    if (this.containerElement) {
      this.containerElement.className = [
        this.classes.taskbarGroupBtn,
        this.classes.taskbarGroupBtnEnable,
        this.classes.taskbarGroupBtnMobile,
      ].join(' ');
    }
  }
}

export default ButtonPauseSecondary;
