import { loadingIcon } from '../../../icons';
import generateStyles from '../../../style';
import { IConstructorBaseProps } from '../../../type';

interface IConstructorProps extends IConstructorBaseProps {}
class LoadingContainer {
  private id: string;
  private classes: ReturnType<typeof generateStyles>;

  containerEle: HTMLElement | undefined | null;
  constructor(props: IConstructorProps) {
    const { id, classes } = props;
    this.id = id;
    this.classes = classes;
    const ele = document.getElementById(id);
    ele?.classList.add(this.classes.loadingContainerEnable);
    this.containerEle = ele;
    if (ele) {
      ele.innerHTML = loadingIcon;
    }
  }
  hide = () => {
    if (this.containerEle) {
      this.containerEle.className = this.classes.errorContainer;
    }
  };
  show = () => {
    if (this.containerEle) {
      this.containerEle.classList.add(this.classes.loadingContainerEnable);
    }
  };
}
export default LoadingContainer;
