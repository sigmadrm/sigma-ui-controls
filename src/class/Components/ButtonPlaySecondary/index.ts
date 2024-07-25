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
      this.containerElement.addEventListener('click', (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        if (!this.apiPlayer.isPlay()) {
          this.apiPlayer.play();
        }
      });
    }
  }

  registerListener(): void {
    const { apiPlayer } = this;
    this.containerElement?.addEventListener('click', (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      if (!apiPlayer.isPlay()) {
        apiPlayer.play();
      }
    });
  }

  hide = () => {
    if (this.containerElement) {
      this.containerElement.className = this.classes.taskbarGroupBtn;
    }
  };
  show = () => {
    if (this.containerElement) {
      this.containerElement.classList.add(this.classes.taskbarGroupBtnEnable);
    }
  };
}

export default ButtonPlaySecondary;
