import { pausedIcon } from '../../../icons';
import { IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';

interface IConstructorProps extends IConstructorBaseProps {}
class ButtonPausePrimary extends BaseComponent {
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

    if (apiPlayer.isPlay()) {
      apiPlayer.pause();
    }
  }

  hide() {
    if (this.containerElement) {
      this.containerElement.className = this.classes.buttonPrimary;
    }
  }
  show() {
    if (this.containerElement) {
      this.containerElement.classList.add(this.classes.buttonPrimaryEnable);
    }
  }
}

export default ButtonPausePrimary;
