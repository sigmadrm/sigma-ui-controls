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
      this.containerElement.className = [
        this.classes.taskbarGroupBtn,
        this.classes.taskbarGroupBtnEnable,
        this.classes.taskbarGroupBtnMobile,
      ].join(' ');
    }
  }
}

export default ButtonReplySecondary;
