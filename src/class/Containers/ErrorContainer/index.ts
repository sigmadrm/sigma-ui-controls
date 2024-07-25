import { convertDataEventError } from '../../../services';
import { infoIcon } from '../../../icons';
import { IConstructorBaseProps } from '../../../type';

import generateStyles from '../../../style';

interface IConstructorProps extends IConstructorBaseProps {}

class ErrorContainer {
  private id: string;
  private classes: ReturnType<typeof generateStyles>;

  containerEle: HTMLElement | undefined | null;
  constructor(props: IConstructorProps) {
    const { id, classes } = props;
    this.id = id;
    this.classes = classes;
    const ele = document.getElementById(id);
    this.containerEle = ele;
  }
  hide = () => {
    if (this.containerEle) {
      this.containerEle.className = this.classes.errorContainer;
    }
  };
  show = (data: ReturnType<typeof convertDataEventError>) => {
    if (this.containerEle) {
      this.containerEle.classList.add(this.classes.loadingContainerEnable);
      const htmlString = this.generateHtml(data);
      this.containerEle.innerHTML = htmlString;
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
}
export default ErrorContainer;
