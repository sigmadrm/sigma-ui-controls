import { ids } from '../../../constants';
import generateStyles from '../../../style';
import { IConstructorBaseProps } from '../../../type';
import { generateHtmlBodyControllerString } from '../services';
import ButtonPrimary from './ButtonPrimary';

interface IConstructorProps extends IConstructorBaseProps {}

class BodyController {
  private id: string;
  private classes: ReturnType<typeof generateStyles>;
  private buttonPrimary: ButtonPrimary | undefined;

  containerEle: HTMLElement | undefined | null;
  constructor(props: IConstructorProps) {
    const { id, classes, apiPlayer } = props;
    this.id = id;
    this.classes = classes;
    const ele = document.getElementById(id);
    this.containerEle = ele;
    const htmlString = generateHtmlBodyControllerString(classes);
    if (ele) {
      ele.innerHTML = htmlString;
    }
    this.buttonPrimary = new ButtonPrimary({
      id: ids.smBodyControllerButtonPrimary,
      classes,
      apiPlayer,
    });
  }
  hideButtonPlay = () => {
    if (this.buttonPrimary) {
      this.buttonPrimary.hide();
    }
  };
  showButtonPlay = () => {
    if (this.buttonPrimary) {
      this.buttonPrimary.show();
    }
  };
}

export default BodyController;
