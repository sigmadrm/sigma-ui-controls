import BaseComponent from '../../../BaseComponent';

import { EEVentName, IConstructorBaseProps } from '../../../../type';

import ButtonPlayPrimary from '../../../Components/ButtonPlayPrimary';
import SettingsController from './SettingsController';
import ButtonReplyPrimary from '../../../Components/ButtonReplayPrimary';
import ButtonPausePrimary from '../../../Components/ButtonPausePrimary';
import ScrubbingForward from '../../../Components/ScrubbingForward';
import ScrubbingRewind from '../../../Components/ScrubbingRewind';

interface IConstructorProps extends IConstructorBaseProps {}

class BodyController extends BaseComponent {
  private buttonPlayPrimary: ButtonPlayPrimary | undefined;
  private buttonReplayPrimary: ButtonReplyPrimary | undefined;
  private buttonPausePrimary: ButtonPausePrimary | undefined;
  private scrubbingRewind: ScrubbingRewind | undefined;
  private scrubbingForward: ScrubbingForward | undefined;
  private settingsController: SettingsController;

  constructor(props: IConstructorProps) {
    const { classes, apiPlayer, ids } = props;
    super(props);

    this.buttonPlayPrimary = new ButtonPlayPrimary({
      id: ids.smButtonPlayPrimary,
      classes,
      apiPlayer,
      ids,
    });
    this.buttonReplayPrimary = new ButtonReplyPrimary({
      id: ids.smButtonReplayPrimary,
      classes,
      apiPlayer,
      ids,
    });
    this.buttonReplayPrimary = new ButtonReplyPrimary({
      id: ids.smButtonReplayPrimary,
      classes,
      apiPlayer,
      ids,
    });
    this.settingsController = new SettingsController({
      id: ids.smSettingsContainer,
      classes,
      apiPlayer,
      ids,
    });
    this.buttonPausePrimary = new ButtonPausePrimary({
      id: ids.smButtonPausePrimary,
      classes,
      apiPlayer,
      ids,
    });
    this.scrubbingForward = new ScrubbingForward({
      id: ids.smScrubbingForward,
      classes,
      apiPlayer,
      ids,
    });
    this.scrubbingRewind = new ScrubbingRewind({
      id: ids.smScrubbingRewind,
      classes,
      apiPlayer,
      ids,
    });
    this.handleEventPlay = this.handleEventPlay.bind(this);
    this.handleEventPause = this.handleEventPause.bind(this);
    this.handleEventEnded = this.handleEventEnded.bind(this);
  }
  render() {
    if (this.containerElement) {
      const { classes, ids } = this;
      const htmlString = `
      <div class="${classes.scrubbingRewind}" id="${ids.smScrubbingRewind}"></div>
      <div class="${classes.bodyControllerCenter}">
        <div class="${classes.buttonPrimary}" id="${ids.smButtonPlayPrimary}"></div>
        <div class="${classes.buttonPrimary}" id="${ids.smButtonPausePrimary}"></div>
        <div class="${classes.buttonPrimary}" id="${ids.smButtonReplayPrimary}"></div>
      </div>
      <div class="${classes.scrubbingForward}" id="${ids.smScrubbingForward}"></div>
      <div class="${classes.settingsContainer}" id="${ids.smSettingsContainer}" tabindex="0"></div>`;
      this.containerElement.innerHTML = htmlString;
    }
  }

  registerListener(): void {
    this.apiPlayer.eventemitter.on(EEVentName.PLAY, this.handleEventPlay, this);
    this.apiPlayer.eventemitter.on(EEVentName.PAUSE, this.handleEventPause, this);
    this.apiPlayer.eventemitter.on(EEVentName.ENDED, this.handleEventEnded, this);
  }
  unregisterListener(): void {
    this.apiPlayer.eventemitter.off(EEVentName.PLAY, this.handleEventPlay, this);
    this.apiPlayer.eventemitter.off(EEVentName.PAUSE, this.handleEventPause, this);
    this.apiPlayer.eventemitter.off(EEVentName.ENDED, this.handleEventEnded, this);
  }
  handleEventPlay(): void {
    if (this.buttonPlayPrimary) {
      this.buttonPlayPrimary.hide();
    }
    if (this.buttonReplayPrimary) {
      this.buttonReplayPrimary.hide();
    }
    if (this.buttonReplayPrimary) {
      this.buttonReplayPrimary.hide();
    }
  }
  handleEventPause(): void {
    if (this.buttonPlayPrimary) {
      this.buttonPlayPrimary.show();
    }
    if (this.buttonPausePrimary) {
      this.buttonPausePrimary.hide();
    }
    if (this.buttonReplayPrimary) {
      this.buttonReplayPrimary.hide();
    }
  }
  handleEventEnded(): void {
    if (this.buttonPlayPrimary) {
      this.buttonPlayPrimary.hide();
    }
    if (this.buttonPausePrimary) {
      this.buttonPausePrimary.hide();
    }
    if (this.buttonReplayPrimary) {
      this.buttonReplayPrimary.show();
    }
  }
  show(): void {
    const { apiPlayer } = this;

    if (apiPlayer.isEnded()) {
      if (this.buttonPlayPrimary) {
        this.buttonPlayPrimary.hide();
      }
      if (this.buttonPausePrimary) {
        this.buttonPausePrimary.hide();
      }
      if (this.buttonReplayPrimary) {
        this.buttonReplayPrimary.show();
      }
    } else {
      if (apiPlayer.isPlay()) {
        if (this.buttonPlayPrimary) {
          this.buttonPlayPrimary.hide();
        }
        if (this.buttonPausePrimary) {
          this.buttonPausePrimary.show();
        }
        if (this.buttonReplayPrimary) {
          this.buttonReplayPrimary.hide();
        }
      } else {
        if (this.buttonPlayPrimary) {
          this.buttonPlayPrimary.show();
        }
        if (this.buttonPausePrimary) {
          this.buttonPausePrimary.hide();
        }
        if (this.buttonReplayPrimary) {
          this.buttonReplayPrimary.hide();
        }
      }
    }
  }
  hidden(): void {
    const { apiPlayer } = this;

    if (apiPlayer.isEnded()) {
      if (this.buttonPlayPrimary) {
        this.buttonPlayPrimary.hide();
      }
      if (this.buttonPausePrimary) {
        this.buttonPausePrimary.hide();
      }
      if (this.buttonReplayPrimary) {
        this.buttonReplayPrimary.show();
      }
    } else {
      if (apiPlayer.isPlay()) {
        if (this.buttonPlayPrimary) {
          this.buttonPlayPrimary.hide();
        }
        if (this.buttonPausePrimary) {
          this.buttonPausePrimary.hide();
        }
        if (this.buttonReplayPrimary) {
          this.buttonReplayPrimary.hide();
        }
      } else {
        if (this.buttonPlayPrimary) {
          this.buttonPlayPrimary.show();
        }
        if (this.buttonPausePrimary) {
          this.buttonPausePrimary.hide();
        }
        if (this.buttonReplayPrimary) {
          this.buttonReplayPrimary.hide();
        }
      }
    }
  }
  destroy(): void {
    this.settingsController.destroy();
  }
}

export default BodyController;
