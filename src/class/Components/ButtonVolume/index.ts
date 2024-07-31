import { volumeIcon } from '../../../icons';
import { IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';

interface IConstructorProps extends IConstructorBaseProps {
  handleButtonClick: (event: MouseEvent) => void;
}

class ButtonVolume extends BaseComponent {
  private handleButtonClick: (event: MouseEvent) => void;
  constructor(props: IConstructorProps) {
    super(props);
    this.handleButtonClick = props.handleButtonClick;
  }

  render() {
    if (this.containerElement) {
      this.containerElement.innerHTML = volumeIcon;
      this.containerElement.classList.add(this.classes.taskbarGroupBtnEnable);
    }
  }
  registerListener() {
    if (!this.containerElement) return;
    this.containerElement.onclick = (event) => this.handleButtonClick(event);
  }
  unregisterListener() {
    if (!this.containerElement) return;
    this.containerElement.onclick = () => {};
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

export default ButtonVolume;
