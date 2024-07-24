import generateStyles from '../../../../style';
import { IConstructorBaseProps } from '../../../../type';

interface IConstructorProps extends IConstructorBaseProps {}
class ButtonPrimary {
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
      ele.classList.add(this.classes.bodyControllerButtonPrimaryEnable);
    }
    ele?.addEventListener('click', (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      if (!apiPlayer.isPlay()) {
        apiPlayer.play();
      }
    });
  }
  hide = () => {
    if (this.containerEle) {
      this.containerEle.className = this.classes.bodyControllerButtonPrimary;
    }
  };
  show = () => {
    if (this.containerEle) {
      this.containerEle.classList.add(this.classes.bodyControllerButtonPrimaryEnable);
    }
  };
}

export default ButtonPrimary;
