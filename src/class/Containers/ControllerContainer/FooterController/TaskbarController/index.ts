import { IConstructorBaseProps } from '../../../../../type';
import ButtonFullScreen from '../../../../Components/ButtonFullScreen';
import { ids } from '../../../../../constants';
import ButtonPlaySecondary from '../../../../Components/ButtonPlaySecondary';
import BaseComponent from '../../../../BaseComponent';
import ButtonPauseSecondary from '../../../../Components/ButtonPauseSecondary';
import ButtonExitFullScreen from '../../../../Components/ButtonExitFullScreen';
import ButtonVolume from '../../../../Components/ButtonVolume';
import ButtonMute from '../../../../Components/ButtonMute';

interface IConstructorProps extends IConstructorBaseProps {}

class TaskbarController extends BaseComponent {
  private buttonFullScreen: ButtonFullScreen | undefined;
  private buttonPlaySecondary: ButtonPlaySecondary | undefined;
  private buttonPauseSecondary: ButtonPauseSecondary | undefined;
  private buttonVolume: ButtonVolume | undefined;
  private buttonMute: ButtonMute | undefined;
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
    this.buttonVolume = new ButtonVolume({ id: ids.smButtonVolume, classes, apiPlayer });
    this.buttonMute = new ButtonMute({ id: ids.smButtonMute, classes, apiPlayer });
    this.buttonExitFullScreen = new ButtonExitFullScreen({
      id: ids.smButtonExitFullScreen,
      classes,
      apiPlayer,
    });
  }

  render() {
    if (this.containerElement) {
      const { classes } = this;
      const htmlString = `<div class=${classes.taskbarGroup}>
      <div class=${classes.taskbarGroupBtn} id=${ids.smButtonPlaySecondary}></div>
     <div class=${classes.taskbarGroupBtn} id=${ids.smButtonPauseSecondary}></div>
     <div class=${classes.taskbarGroupBtn} id=${ids.smButtonVolume}></div>
     <div class=${classes.taskbarGroupBtn} id=${ids.smButtonMute}></div>
  </div>
  <div class=${classes.taskbarGroup}>
      <div class=${classes.taskbarGroupBtn} id=${ids.smButtonFullScreen}></div>
      <div class=${classes.taskbarGroupBtn} id=${ids.smButtonExitFullScreen}></div>
  </div>`;
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
