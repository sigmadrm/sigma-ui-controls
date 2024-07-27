import { replyIcon } from '../../../icons';
import { IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';

interface IConstructorProps extends IConstructorBaseProps {}
class ButtonReply extends BaseComponent {
  constructor(props: IConstructorProps) {
    super(props);
  }

  render() {
    if (this.containerElement) {
      this.containerElement.innerHTML = replyIcon;
      this.containerElement.classList.add([this.classes.taskbarGroupBtn, this.classes.taskbarGroupBtn].join(' '));
    }
  }
  registerListener() {
    // if (!this.containerElement) return;
    // this.containerElement.onclick = (event) => this.handleContainerClick(event);
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
      this.containerElement.className = this.classes.taskbarGroupBtn;
    }
  }
  show() {
    if (this.containerElement) {
      this.containerElement.classList.add(this.classes.taskbarGroupBtnEnable);
    }
  }
}

export default ButtonReply;
