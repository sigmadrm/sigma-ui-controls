import { IConstructorBaseProps } from '../../../type';
import generateStyles from '../../../style';
import { playIcon } from '../../../icons';

interface IConstructorProps extends IConstructorBaseProps {}
class ButtonPlaySecondary {
  private id: string;
  private classes: ReturnType<typeof generateStyles>;

  containerEle: HTMLElement | undefined | null;
  constructor(props: IConstructorProps) {
    const { id, classes, apiPlayer } = props;
    this.id = id;
    this.classes = classes;
    const ele = document.getElementById(id);
    this.containerEle = ele;

    if (ele) {
      ele.innerHTML = playIcon;
      ele.classList.add(this.classes.taskbarGroupBtnEnable);
      ele?.addEventListener('click', (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        if (!apiPlayer.isPlay()) {
          apiPlayer.play();
        }
      });
    }
  }
  hide = () => {
    if (this.containerEle) {
      this.containerEle.className = this.classes.taskbarGroupBtn;
    }
  };
  show = () => {
    if (this.containerEle) {
      this.containerEle.classList.add(this.classes.taskbarGroupBtnEnable);
    }
  };
}

export default ButtonPlaySecondary;
