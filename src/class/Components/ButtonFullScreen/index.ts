import { fullScreenIcon } from '../../../icons';
import generateStyles from '../../../style';
import { IConstructorBaseProps } from '../../../type';

interface IConstructorProps extends IConstructorBaseProps {}
class ButtonFullScreen {
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
      ele.innerHTML = fullScreenIcon;
      ele.classList.add(this.classes.taskbarGroupBtnEnable);
      ele.addEventListener('click', (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        if (apiPlayer.isFullScreen()) {
          apiPlayer.exitFullScreen();
        } else {
          apiPlayer.enterFullScreen();
        }
      });
    }
  }
}

export default ButtonFullScreen;
