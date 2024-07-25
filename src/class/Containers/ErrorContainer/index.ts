import { convertDataEventError } from '../../../services';
import { infoIcon } from '../../../icons';
import { IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';

interface IConstructorProps extends IConstructorBaseProps {}

class ErrorContainer extends BaseComponent {
  constructor(props: IConstructorProps) {
    super(props);
  }
  hide = () => {
    if (this.containerElement) {
      this.containerElement.className = this.classes.errorContainer;
    }
  };
  show = (data: ReturnType<typeof convertDataEventError>) => {
    if (this.containerElement) {
      this.containerElement.classList.add(this.classes.loadingContainerEnable);
      const htmlString = this.generateHtml(data);
      this.containerElement.innerHTML = htmlString;
    }
  };
  generateHtml = (data: ReturnType<typeof convertDataEventError>) => {
    const htmlString = `<div class="${this.classes.errorIconWrap}">
        ${infoIcon}
    </div>
    <div class="${this.classes.flexColumnStartCenter}">
      <h2 style="margin:0px">${data.errorCode}</h2>
      <h3 style="margin:0px">${data.message}</h3>
    </div>
    `;
    return htmlString;
  };
  handleEventLoaded = () => {
    this.hide();
  };
}
export default ErrorContainer;
