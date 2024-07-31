import { playIcon } from '../../../icons';
import { IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';

interface IConstructorProps extends IConstructorBaseProps {}
class ButtonPlayPrimary extends BaseComponent {
  constructor(props: IConstructorProps) {
    super(props);
  }

  render() {
    if (this.containerElement) {
      this.containerElement.innerHTML = playIcon;
      this.containerElement.classList.add(this.classes.buttonPrimaryEnable);
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
    event.preventDefault();
    event.stopPropagation();
    if (!this.apiPlayer.isPlay()) {
      this.apiPlayer.play();
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

export default ButtonPlayPrimary;
