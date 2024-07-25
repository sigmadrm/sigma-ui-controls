import { IConstructorBaseProps } from '../../../../../type';
import { generateHtmlTaskbarControllerString } from '../../services';

import ButtonFullScreen from '../../../../Components/ButtonFullScreen';

import generateStyles from '../../../../../style';
import { ids } from '../../../../../constants';
import ButtonPlaySecondary from '../../../../Components/ButtonPlaySecondary';

interface IConstructorProps extends IConstructorBaseProps {}

class TaskbarController {
  private id: string;
  private classes: ReturnType<typeof generateStyles>;
  private buttonFullScreen: ButtonFullScreen | undefined;
  private buttonPlaySecondary: ButtonPlaySecondary | undefined;

  containerEle: HTMLElement | undefined | null;
  constructor(props: IConstructorProps) {
    const { id, classes, apiPlayer } = props;
    this.id = id;
    this.classes = classes;

    const ele = document.getElementById(id);
    this.containerEle = ele;
    const htmlString = generateHtmlTaskbarControllerString(classes);
    if (ele) {
      ele.innerHTML = htmlString;
    }

    this.buttonFullScreen = new ButtonFullScreen({
      id: ids.smButtonFullScreen,
      classes,
      apiPlayer,
    });
    this.buttonPlaySecondary = new ButtonPlaySecondary({
      id: ids.smButtonPlaySecondary,
      classes,
      apiPlayer,
    });
  }
  handleEventPlay = () => {
    if (this.buttonPlaySecondary) {
      this.buttonPlaySecondary.hide();
    }
  };
  handleEventPause = () => {
    if (this.buttonPlaySecondary) {
      this.buttonPlaySecondary.show();
    }
  };
}

export default TaskbarController;
