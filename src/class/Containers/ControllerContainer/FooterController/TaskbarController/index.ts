import { IConstructorBaseProps } from '../../../../../type';
import { generateHtmlTaskbarControllerString } from '../../services';

import ButtonFullScreen from '../../../../Components/ButtonFullScreen';
import { ids } from '../../../../../constants';
import ButtonPlaySecondary from '../../../../Components/ButtonPlaySecondary';
import BaseComponent from '../../../../BaseComponent';
import ButtonPauseSecondary from '../../../../Components/ButtonPauseSecondary';
import ButtonExitFullScreen from '../../../../Components/ButtonExitFullScreen';

interface IConstructorProps extends IConstructorBaseProps {}

class TaskbarController extends BaseComponent {
  private buttonFullScreen: ButtonFullScreen | undefined;
  private buttonPlaySecondary: ButtonPlaySecondary | undefined;
  private buttonPauseSecondary: ButtonPauseSecondary | undefined;
  private buttonExitFullScreen: ButtonExitFullScreen | undefined;

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
    this.buttonPauseSecondary = new ButtonPauseSecondary({
      id: ids.smButtonPauseSecondary,
      classes,
      apiPlayer,
    });
    this.buttonExitFullScreen = new ButtonExitFullScreen({
      id: ids.smButtonExitFullScreen,
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
    if (this.buttonPauseSecondary) {
      this.buttonPauseSecondary.show();
    }
  };
  handleEventPause = () => {
    if (this.buttonPlaySecondary) {
      this.buttonPlaySecondary.show();
    }
    if (this.buttonPauseSecondary) {
      this.buttonPauseSecondary.hide();
    }
  };
  handleEventLoaded = () => {
    if (this.buttonPlaySecondary) {
      this.buttonPlaySecondary.show();
    }
    if (this.buttonPauseSecondary) {
      this.buttonPauseSecondary.hide();
    }
  };
  handleEventFullScreenChange = () => {
    if (this.apiPlayer.isFullScreen()) {
      if (this.buttonFullScreen) {
        this.buttonFullScreen.hide();
      }
      if (this.buttonExitFullScreen) {
        this.buttonExitFullScreen.show();
      }
    } else {
      if (this.buttonFullScreen) {
        this.buttonFullScreen.show();
      }
      if (this.buttonExitFullScreen) {
        this.buttonExitFullScreen.hide();
      }
    }
  };
}

export default TaskbarController;
