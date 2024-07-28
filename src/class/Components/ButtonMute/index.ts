import { muteIcon } from '../../../icons';
import { IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';

interface IConstructorProps extends IConstructorBaseProps {
  handleButtonClick: (event: MouseEvent) => void;
}

class ButtonMute extends BaseComponent {
  private handleButtonClick: (event: MouseEvent) => void;
  constructor(props: IConstructorProps) {
    super(props);
    this.handleButtonClick = props.handleButtonClick;
  }

  render() {
    if (this.containerElement) {
      this.containerElement.innerHTML = muteIcon;
      // this.containerElement.classList.add(this.classes.taskbarGroupBtnEnable);
    }
  }
  registerListener() {
    this.containerElement?.addEventListener('click', (event) => this.handleButtonClick(event));
  }

  unregisterListener() {
    // FIXME: this function not working?
    // this.containerElement?.removeEventListener('click', this.handleContainerClick);
  }
  // handleContainerClick(event: MouseEvent) {
  //   const { apiPlayer } = this;
  //   event.preventDefault();
  //   event.stopPropagation();

  //   apiPlayer.updateVolume(1);
  // }

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

export default ButtonMute;
