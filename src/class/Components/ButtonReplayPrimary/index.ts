import { replyIcon } from '../../../icons';
import { IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';

interface IConstructorProps extends IConstructorBaseProps {}
class ButtonReplyPrimary extends BaseComponent {
  constructor(props: IConstructorProps) {
    super(props);
  }
  render() {
    if (this.containerElement) {
      this.containerElement.innerHTML = replyIcon;
    }
  }
  registerListener() {
    if (this.containerElement) {
      this.containerElement.addEventListener('click', (event: MouseEvent) => {
        this.handleContainerClick(event);
      });
    }
  }

  unregisterListener() {
    if (this.containerElement) {
      this.containerElement.removeEventListener('click', (event: MouseEvent) => {
        this.handleContainerClick(event);
      });
    }
  }

  handleContainerClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.apiPlayer.setCurrentTime(0);
    this.apiPlayer.play();
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

export default ButtonReplyPrimary;
