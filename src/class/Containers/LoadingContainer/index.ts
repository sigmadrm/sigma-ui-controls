import BaseComponent from '../../BaseComponent';
import { loadingIcon } from '../../../icons';
import { EEVentName, IConstructorBaseProps } from '../../../type';

interface IConstructorProps extends IConstructorBaseProps {}
class LoadingContainer extends BaseComponent {
  constructor(props: IConstructorProps) {
    super(props);
  }
  registerListener(): void {
    this.apiPlayer.eventemitter.on(EEVentName.LOADED, this.hide, this);
    // this.apiPlayer.eventemitter.on(EEVentName.ERROR, this.hide, this);
    this.apiPlayer.eventemitter.on(EEVentName.WAITING, this.show, this);
    this.apiPlayer.eventemitter.on(EEVentName.PLAYING, this.hide, this);
  }
  unregisterListener(): void {
    this.apiPlayer.eventemitter.off(EEVentName.LOADED, this.hide, this);
    // this.apiPlayer.eventemitter.off(EEVentName.ERROR, this.hide, this);
    this.apiPlayer.eventemitter.off(EEVentName.WAITING, this.show, this);
    this.apiPlayer.eventemitter.off(EEVentName.PLAYING, this.hide, this);
  }

  render() {
    this.containerElement?.classList.add(this.classes.loadingContainerEnable);
    if (this.containerElement) {
      this.containerElement.innerHTML = loadingIcon;
    }
  }
  hide() {
    if (this.containerElement) {
      this.containerElement.className = this.classes.loadingContainer;
    }
  }
  show() {
    if (this.containerElement) {
      this.containerElement.classList.add(this.classes.loadingContainerEnable);
    }
  }
}
export default LoadingContainer;
