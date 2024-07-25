import BaseComponent from '../../BaseComponent';
import { loadingIcon } from '../../../icons';
import { IConstructorBaseProps } from '../../../type';

interface IConstructorProps extends IConstructorBaseProps {}
class LoadingContainer extends BaseComponent {
  constructor(props: IConstructorProps) {
    super(props);
  }

  render() {
    this.containerElement?.classList.add(this.classes.loadingContainerEnable);
    if (this.containerElement) {
      this.containerElement.innerHTML = loadingIcon;
    }
  }
  hide = () => {
    if (this.containerElement) {
      this.containerElement.className = this.classes.errorContainer;
    }
  };
  show = () => {
    if (this.containerElement) {
      this.containerElement.classList.add(this.classes.loadingContainerEnable);
    }
  };
}
export default LoadingContainer;
