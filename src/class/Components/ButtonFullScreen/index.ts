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
    this.containerElement?.addEventListener('click', (event) => this.handleContainerClick(event));
  }

  unregisterListener() {
    // FIXME: this function not working
    // this.containerElement?.removeEventListener('click', this.handleContainerClick);
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
