import { IConstructorBaseProps } from '../../../type';
import { playIcon } from '../../../icons';
import BaseComponent from '../../BaseComponent';

interface IConstructorProps extends IConstructorBaseProps {}
class ButtonPlaySecondary extends BaseComponent {
  constructor(props: IConstructorProps) {
    super(props);
  }

  render() {
    if (this.containerElement) {
      this.containerElement.innerHTML = playIcon;
      this.containerElement.classList.add(this.classes.taskbarGroupBtnEnable);
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
      this.containerElement.className = [
        this.classes.taskbarGroupBtn,
        this.classes.taskbarGroupBtnEnable,
        this.classes.taskbarGroupBtnMobile,
      ].join(' ');
    }
  }
}

export default ButtonPlaySecondary;
