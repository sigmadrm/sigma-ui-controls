import { IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';

interface IConstructorProps extends IConstructorBaseProps {}
class ButtonForward extends BaseComponent {
  constructor(props: IConstructorProps) {
    super(props);
  }

  render() {
    // if (this.containerElement) {
    //   this.containerElement.classList.add(this.classes.buttonPlayPrimaryEnable);
    // }
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

export default ButtonForward;
