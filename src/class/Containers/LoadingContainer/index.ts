import BaseComponent from '../../BaseComponent';
import { loadingIcon } from '../../../icons';
import { EEVentName, IConstructorBaseProps } from '../../../type';

interface IConstructorProps extends IConstructorBaseProps {}
class LoadingContainer extends BaseComponent {
  constructor(props: IConstructorProps) {
    const { apiPlayer } = props;
    super(props);
    apiPlayer.eventemitter.on(EEVentName.LOADED, this.hide, this);
    apiPlayer.eventemitter.on(EEVentName.ERROR, this.hide, this);
  }
  registerListener(): void {
    this.apiPlayer.eventemitter.off(EEVentName.LOADED, this.hide, this);
    this.apiPlayer.eventemitter.off(EEVentName.ERROR, this.hide, this);
  }

  render() {
    this.containerElement?.classList.add(this.classes.loadingContainerEnable);
    if (this.containerElement) {
      this.containerElement.innerHTML = loadingIcon;
    }
  }
  hide() {
    if (this.containerElement) {
      this.containerElement.className = this.classes.errorContainer;
    }
  }
  show() {
    if (this.containerElement) {
      this.containerElement.classList.add(this.classes.loadingContainerEnable);
    }
  }
}
export default LoadingContainer;
