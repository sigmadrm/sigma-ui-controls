import { replyIcon } from '../../../icons';
import { IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';

interface IConstructorProps extends IConstructorBaseProps {}
class ButtonReplySecondary extends BaseComponent {
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
  unregisterListener() {}
  handleContainerClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.apiPlayer.setCurrentTime(0);
    this.apiPlayer.play();
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

export default ButtonReplySecondary;
