import { convertDataEventError } from '../../../services';
import { infoIcon } from '../../../icons';
import { EEVentName, IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';

interface IConstructorProps extends IConstructorBaseProps {}

class ErrorContainer extends BaseComponent {
  constructor(props: IConstructorProps) {
    const { apiPlayer } = props;
    super(props);
    apiPlayer.eventemitter.on(EEVentName.LOADED, () => {
      this.hide();
    });
    apiPlayer.eventemitter.on(EEVentName.ERROR, (event, data) => {
      if (data) {
        this.show(data);
      }
    });
  }

  hide = () => {
    if (this.containerElement) {
      this.containerElement.className = this.classes.errorContainer;
    }
  };
  show = (data) => {
    if (this.containerElement) {
      this.containerElement.classList.add(this.classes.loadingContainerEnable);
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
