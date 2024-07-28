import { EEVentName, IConstructorBaseProps } from '../../../../../type';
import ButtonFullScreen from '../../../../Components/ButtonFullScreen';
import { ids } from '../../../../../constants';
import ButtonPlaySecondary from '../../../../Components/ButtonPlaySecondary';
import BaseComponent from '../../../../BaseComponent';
import ButtonPauseSecondary from '../../../../Components/ButtonPauseSecondary';
import ButtonExitFullScreen from '../../../../Components/ButtonExitFullScreen';
import VolumeContainer from './VolumeContainer';

interface IConstructorProps extends IConstructorBaseProps {}

class TaskbarController extends BaseComponent {
  private buttonFullScreen: ButtonFullScreen | undefined;
  private buttonPlaySecondary: ButtonPlaySecondary | undefined;
  private buttonPauseSecondary: ButtonPauseSecondary | undefined;
  private volumeContainer: VolumeContainer | undefined;
  private buttonExitFullScreen: ButtonExitFullScreen | undefined;

  constructor(props: IConstructorProps) {
    super(props);
    const { classes, apiPlayer } = props;
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
    this.volumeContainer = new VolumeContainer({
      id: ids.smVolumeContainer,
      classes,
      apiPlayer,
    });
    apiPlayer.eventemitter.on(EEVentName.PLAY, () => {
      if (this.buttonPauseSecondary) {
        this.buttonPauseSecondary.show();
      }
      if (this.buttonPlaySecondary) {
        this.buttonPlaySecondary.hide();
      }
    });
    apiPlayer.eventemitter.on(EEVentName.PAUSE, () => {
      if (this.buttonPauseSecondary) {
        this.buttonPauseSecondary.hide();
      }
      if (this.buttonPlaySecondary) {
        this.buttonPlaySecondary.show();
      }
    });
    apiPlayer.eventemitter.on(EEVentName.LOADED, () => {
      // this.show();
      if (this.buttonPlaySecondary) {
        this.buttonPlaySecondary.show();
      }
      if (this.buttonPauseSecondary) {
        this.buttonPauseSecondary.hide();
      }
    });
    apiPlayer.eventemitter.on(EEVentName.FULLSCREENCHANGE, () => {
      if (this.apiPlayer.isFullScreen()) {
        if (this.buttonExitFullScreen) {
          this.buttonExitFullScreen.show();
        }
        if (this.buttonFullScreen) {
          this.buttonFullScreen.hide();
        }
      } else {
        if (this.buttonExitFullScreen) {
          this.buttonExitFullScreen.hide();
        }
        if (this.buttonFullScreen) {
          this.buttonFullScreen.show();
        }
      }
    });
  }

  render() {
    if (this.containerElement) {
      const { classes } = this;
      const htmlString = `<div class=${classes.taskbarGroup}>
      <div class=${classes.taskbarGroupBtn} id=${ids.smButtonPlaySecondary}></div>
      <div class=${classes.taskbarGroupBtn} id=${ids.smButtonPauseSecondary}></div>
      <div class=${classes.taskbarVolumeContainer} id=${ids.smVolumeContainer}></div>
  </div>
  <div class=${classes.taskbarGroup}>
      <div class=${classes.taskbarGroupBtn} id=${ids.smButtonFullScreen}></div>
      <div class=${classes.taskbarGroupBtn} id=${ids.smButtonExitFullScreen}></div>
  </div>`;
      this.containerElement.innerHTML = htmlString;
    }
  }
}

export default TaskbarController;
