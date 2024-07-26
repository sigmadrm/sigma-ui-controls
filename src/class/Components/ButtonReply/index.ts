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
    if (!apiPlayer.method.isPlay()) {
      apiPlayer.method.play();
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
