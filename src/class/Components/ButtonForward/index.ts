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
    // if (!this.containerElement) return;
    // this.containerElement.onclick = (event) => this.handleContainerClick(event);
  }
  unregisterListener() {
    // if (!this.containerElement) return;
    // this.containerElement.onclick = () => {};
  }
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

export default ButtonForward;
