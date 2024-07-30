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
import ButtonReplySecondary from '../../../../Components/ButtonReplySecondary';

interface IConstructorProps extends IConstructorBaseProps {}

class TaskbarController extends BaseComponent {
  private buttonFullScreen: ButtonFullScreen | undefined;
  private buttonPlaySecondary: ButtonPlaySecondary | undefined;
  private buttonPauseSecondary: ButtonPauseSecondary | undefined;
  private buttonReplaySecondary: ButtonReplySecondary | undefined;
  private volumeContainer: VolumeContainer | undefined;
  private buttonExitFullScreen: ButtonExitFullScreen | undefined;
  private settingIconButton: SettingIconButton;
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
    this.settingIconButton = new SettingIconButton({
      id: ids.smSettingIconButton,
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
    this.buttonReplaySecondary = new ButtonReplySecondary({
      id: ids.smButtonReplaySecondary,
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
      <div class=${classes.taskbarGroupBtn} id=${ids.smButtonReplaySecondary}></div>
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
  registerListener() {
    this.apiPlayer.eventemitter.on(EEVentName.PLAY, this.handleEventPlay, this);
    this.apiPlayer.eventemitter.on(EEVentName.PAUSE, this.handleEventPause, this);
    this.apiPlayer.eventemitter.on(EEVentName.LOADED, this.handleEventLoaded, this);
    this.apiPlayer.eventemitter.on(EEVentName.FULL_SCREEN_CHANGE, this.handleEventFullScreen, this);
    this.apiPlayer.eventemitter.on(EEVentName.ENDED, this.handleEventEnded, this);
  }
  unregisterListener() {
    this.apiPlayer.eventemitter.off(EEVentName.PLAY, this.handleEventPlay, this);
    this.apiPlayer.eventemitter.off(EEVentName.PAUSE, this.handleEventPause, this);
    this.apiPlayer.eventemitter.off(EEVentName.LOADED, this.handleEventLoaded, this);
    this.apiPlayer.eventemitter.off(EEVentName.FULL_SCREEN_CHANGE, this.handleEventFullScreen, this);
    this.apiPlayer.eventemitter.off(EEVentName.ENDED, this.handleEventFullScreen, this);
  }
  handleEventPlay() {
    if (this.buttonPauseSecondary) {
      this.buttonPauseSecondary.show();
    }
    if (this.buttonPlaySecondary) {
      this.buttonPlaySecondary.hide();
    }
    if (this.buttonReplaySecondary) {
      this.buttonReplaySecondary.hide();
    }
  }
  handleEventPause() {
    if (this.buttonPauseSecondary) {
      this.buttonPauseSecondary.hide();
    }
    if (this.buttonPlaySecondary) {
      this.buttonPlaySecondary.show();
    }
    if (this.buttonReplaySecondary) {
      this.buttonReplaySecondary.hide();
    }
  }
  handleEventLoaded() {
    if (this.buttonPlaySecondary) {
      this.buttonPlaySecondary.show();
    }
    if (this.buttonPauseSecondary) {
      this.buttonPauseSecondary.hide();
    }
    if (this.buttonReplaySecondary) {
      this.buttonReplaySecondary.hide();
    }

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
  }
  handleEventFullScreen() {
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
  }
  handleEventEnded() {
    if (this.buttonPauseSecondary) {
      this.buttonPauseSecondary.hide();
    }
    if (this.buttonPlaySecondary) {
      this.buttonPlaySecondary.hide();
    }
    if (this.buttonReplaySecondary) {
      this.buttonReplaySecondary.show();
    }
  }
}

export default TaskbarController;
