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
    // this.containerElement?.addEventListener('click', (event) => this.handleContainerClick(event));
  }
  unregisterListener() {
    // FIXME: this function not working?
    // this.containerElement?.removeEventListener('click', this.handleContainerClick);
  }
  handleContainerClick(event: MouseEvent) {
    const { apiPlayer } = this;
    event.preventDefault();
    event.stopPropagation();
    if (!apiPlayer.isPlay()) {
      apiPlayer.play();
    }
  }

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
}

export default ButtonPauseSecondary;
