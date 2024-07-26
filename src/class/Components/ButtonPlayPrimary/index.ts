import { IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';

interface IConstructorProps extends IConstructorBaseProps {}
class ButtonPlayPrimary extends BaseComponent {
  constructor(props: IConstructorProps) {
    super(props);
  }

  render() {
    if (this.containerElement) {
      this.containerElement.classList.add(this.classes.buttonPlayPrimaryEnable);
    }
  }
  registerListener() {
    this.containerElement?.addEventListener('click', (event) => this.handleContainerClick(event));
  }

  unregisterListener() {}

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
      this.containerElement.className = this.classes.buttonPlayPrimary;
    }
  }
  show() {
    if (this.containerElement) {
      this.containerElement.classList.add(this.classes.buttonPlayPrimaryEnable);
    }
  }
}

export default ButtonPlayPrimary;
