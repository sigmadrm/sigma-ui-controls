import { infoIcon } from '../../../icons';
import { EEVentName, IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';
import { convertDataEventError } from '../../SmApiPlayer';

interface IConstructorProps extends IConstructorBaseProps {}

class ErrorContainer extends BaseComponent {
  constructor(props: IConstructorProps) {
    super(props);
  }

  registerListener(): void {
    // this.apiPlayer.eventemitter.on(EEVentName.LOADED, this.handelEventLoaded, this);
    // this.apiPlayer.eventemitter.on(EEVentName.ERROR, this.handelEventError, this);
  }
  unregisterListener(): void {
    // this.apiPlayer.eventemitter.off(EEVentName.LOADED, this.handelEventLoaded, this);
    // this.apiPlayer.eventemitter.off(EEVentName.ERROR, this.handelEventError, this);
  }
  handelEventLoaded() {
    this.hide();
  }
  handelEventError(event, data) {
    if (data) {
      this.show(data);
    }
  }
  hide() {
    if (this.containerElement) {
      this.containerElement.className = this.classes.errorContainer;
    }
  }
  show = (data) => {
    if (this.containerElement) {
      this.containerElement.classList.add(this.classes.errorContainerEnable);
      const htmlString = this.generateHtml(data);
      this.containerElement.innerHTML = htmlString;
    }
  };
  generateHtml = (dataEvent: ReturnType<typeof convertDataEventError>) => {
    const htmlString = `<div class="${this.classes.errorIconWrap}">
        ${infoIcon}
    </div>
    <div class="${this.classes.flexColumnStartCenter}">
      <h2 style="margin:0px">${dataEvent.data.errorCode}</h2>
      <h3 style="margin:0px">${dataEvent.data.message}</h3>
    </div>
    `;
    return htmlString;
  };
}
export default ErrorContainer;
