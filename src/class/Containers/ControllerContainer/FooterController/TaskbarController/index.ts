import { EEVentName, IConstructorBaseProps } from '../../../../../type';
import ButtonFullScreen from '../../../../Components/ButtonFullScreen';
import { ids } from '../../../../../constants';
import ButtonPlaySecondary from '../../../../Components/ButtonPlaySecondary';
import BaseComponent from '../../../../BaseComponent';
import ButtonPauseSecondary from '../../../../Components/ButtonPauseSecondary';
import ButtonExitFullScreen from '../../../../Components/ButtonExitFullScreen';
import SettingIconButton from '../../../../Components/SettingIconButton';
import VolumeContainer from './VolumeContainer';
import TimeBarContainer from './TimeBarContainer';
import LiveStream from '../../../../Components/LiveStream';

interface IConstructorProps extends IConstructorBaseProps {}

class TaskbarController extends BaseComponent {
  private buttonFullScreen: ButtonFullScreen | undefined;
  private buttonPlaySecondary: ButtonPlaySecondary | undefined;
  private buttonPauseSecondary: ButtonPauseSecondary | undefined;
  private volumeContainer: VolumeContainer | undefined;
  private buttonExitFullScreen: ButtonExitFullScreen | undefined;
  // private settingIconButton: SettingIconButton;
  private timeBarContainer: TimeBarContainer | undefined;
  private liveStream: LiveStream | undefined;

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
    this.liveStream = new LiveStream({
      id: ids.smTaskbarLiveStream,
      classes,
      apiPlayer,
    });
    this.timeBarContainer = new TimeBarContainer({
      id: ids.smTimeBarContainer,
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
    apiPlayer.eventemitter.on(EEVentName.FULL_SCREEN_CHANGE, () => {
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
    apiPlayer.eventemitter.on(EEVentName.LOADED, () => {
      const isLive = this.apiPlayer.isLive();
      if (isLive) {
        if (this.liveStream) {
          this.liveStream.show();
        }
        if (this.timeBarContainer) {
          this.timeBarContainer.hide();
        }
      } else {
        if (this.liveStream) {
          this.liveStream.hide();
        }
        if (this.timeBarContainer) {
          this.timeBarContainer.show();
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
     <div class=${classes.taskbarTimeBarContainer} id=${ids.smTimeBarContainer}></div>
     <div class=${classes.taskbarLiveStream} id=${ids.smTaskbarLiveStream}></div>
  </div>
  <div class=${classes.taskbarGroup}>
      <div class=${classes.taskbarGroupBtn} id=${ids.smSettingIconButton}></div>
      <div class=${classes.taskbarGroupBtn} id=${ids.smButtonFullScreen}></div>
      <div class=${classes.taskbarGroupBtn} id=${ids.smButtonExitFullScreen}></div>
  </div>`;
      this.containerElement.innerHTML = htmlString;
    }
  }
}

export default TaskbarController;
