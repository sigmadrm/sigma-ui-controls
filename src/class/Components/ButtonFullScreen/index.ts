import { fullScreenIcon } from '../../../icons';
import { IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';

interface IConstructorProps extends IConstructorBaseProps {}
class ButtonFullScreen extends BaseComponent {
  constructor(props: IConstructorProps) {
    super(props);
  }

  render() {
    if (this.containerElement) {
      this.containerElement.innerHTML = fullScreenIcon;
      this.containerElement.classList.add(this.classes.taskbarGroupBtnEnable);
    }
  }

  registerListener() {
    if (!this.containerElement) return;
    this.containerElement.onclick = (event) => this.handleContainerClick(event);
  }

  unregisterListener() {}

  hide() {
    if (this.containerElement) {
      this.containerElement.className = this.classes.taskbarGroupBtn;
    }
  }
  show() {
    if (this.containerElement) {
      this.containerElement.classList.add(this.classes.taskbarGroupBtnEnable);
    }
  }

  handleContainerClick = (event: MouseEvent) => {
    const { apiPlayer } = this;
    event.preventDefault();
    event.stopPropagation();
    if (apiPlayer.isFullScreen()) {
      apiPlayer.exitFullScreen();
    } else {
      apiPlayer.enterFullScreen();
    }
  };
}

export default ButtonFullScreen;
