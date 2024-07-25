import { IConstructorBaseProps } from '../../../../../type';
import { generateHtmlTaskbarControllerString } from '../../services';

import ButtonFullScreen from '../../../../Components/ButtonFullScreen';
import { ids } from '../../../../../constants';
import ButtonPlaySecondary from '../../../../Components/ButtonPlaySecondary';
import BaseComponent from '../../../../BaseComponent';

interface IConstructorProps extends IConstructorBaseProps {}

class TaskbarController extends BaseComponent {
  private buttonFullScreen: ButtonFullScreen | undefined;
  private buttonPlaySecondary: ButtonPlaySecondary | undefined;

  constructor(props: IConstructorProps) {
    const { classes, apiPlayer } = props;
    super(props);

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

  render() {
    if (this.containerElement) {
      const htmlString = generateHtmlTaskbarControllerString(this.classes);
      this.containerElement.innerHTML = htmlString;
    }
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
