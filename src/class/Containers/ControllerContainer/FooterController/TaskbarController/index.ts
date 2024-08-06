import { EEVentName, IConstructorBaseProps } from '../../../../../type';
import ButtonFullScreen from '../../../../Components/ButtonFullScreen';
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
    const { classes, apiPlayer, ids } = props;
    this.buttonFullScreen = new ButtonFullScreen({
      id: ids.smButtonFullScreen,
      classes,
      apiPlayer,
      ids,
    });
    this.buttonPlaySecondary = new ButtonPlaySecondary({
      id: ids.smButtonPlaySecondary,
      classes,
      apiPlayer,
      ids,
    });
    this.buttonPauseSecondary = new ButtonPauseSecondary({
      id: ids.smButtonPauseSecondary,
      classes,
      apiPlayer,
      ids,
    });
    this.buttonExitFullScreen = new ButtonExitFullScreen({
      id: ids.smButtonExitFullScreen,
      classes,
      apiPlayer,
      ids,
    });
    this.settingIconButton = new SettingIconButton({
      id: ids.smSettingIconButton,
      classes,
      apiPlayer,
      ids,
    });
    this.volumeContainer = new VolumeContainer({
      id: ids.smVolumeContainer,
      classes,
      apiPlayer,
      ids,
    });
    this.liveStream = new LiveStream({
      id: ids.smTaskbarLiveStream,
      classes,
      apiPlayer,
      ids,
    });
    this.timeBarContainer = new TimeBarContainer({
      id: ids.smTimeBarContainer,
      classes,
      apiPlayer,
      ids,
    });
    this.buttonReplaySecondary = new ButtonReplySecondary({
      id: ids.smButtonReplaySecondary,
      classes,
      apiPlayer,
      ids,
    });
  }

  render() {
    if (this.containerElement) {
      const { classes } = this;
      const htmlString = `<div class=${classes.taskbarGroup}>
      <div class=${classes.taskbarGroupBtn} id=${this.ids.smButtonPlaySecondary}></div>
      <div class=${classes.taskbarGroupBtn} id=${this.ids.smButtonPauseSecondary}></div>
      <div class=${classes.taskbarGroupBtn} id=${this.ids.smButtonReplaySecondary}></div>
      <div class=${classes.taskbarVolumeContainer} id=${this.ids.smVolumeContainer}></div>
     <div class=${classes.taskbarTimeBarContainer} id=${this.ids.smTimeBarContainer}></div>
     <div class=${classes.taskbarLiveStream} id=${this.ids.smTaskbarLiveStream}></div>
  </div>
  <div class=${classes.taskbarGroup}>
      <div class=${classes.taskbarGroupBtn} id=${this.ids.smSettingIconButton}></div>
      <div class=${classes.taskbarGroupBtn} id=${this.ids.smButtonFullScreen}></div>
      <div class=${classes.taskbarGroupBtn} id=${this.ids.smButtonExitFullScreen}></div>
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
