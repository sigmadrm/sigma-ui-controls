import BaseComponent from '../../../BaseComponent';
import { ids } from '../../../../constants';
import { EEVentName, IConstructorBaseProps } from '../../../../type';

import ButtonPlayPrimary from '../../../Components/ButtonPlayPrimary';
import SettingsController from './SettingsController';
import ButtonReplyPrimary from '../../../Components/ButtonReplayPrimary';

interface IConstructorProps extends IConstructorBaseProps {}

class BodyController extends BaseComponent {
  private buttonPlayPrimary: ButtonPlayPrimary | undefined;
  private buttonReplayPrimary: ButtonReplyPrimary | undefined;
  private settingsController: SettingsController;

  constructor(props: IConstructorProps) {
    const { classes, apiPlayer } = props;
    super(props);

    this.buttonPlayPrimary = new ButtonPlayPrimary({
      id: ids.smButtonPlayPrimary,
      classes,
      apiPlayer,
    });
    this.buttonReplayPrimary = new ButtonReplyPrimary({
      id: ids.smButtonReplayPrimary,
      classes,
      apiPlayer,
    });
    this.settingsController = new SettingsController({
      id: ids.smSettingsContainer,
      classes,
      apiPlayer,
    });
  }
  render() {
    if (this.containerElement) {
      const { classes } = this;
      const htmlString = `
      <div class=${classes.buttonPrimary} id=${ids.smButtonPlayPrimary}></div>
      <div class=${classes.buttonPrimary} id=${ids.smButtonReplayPrimary}></div>
      <div class=${classes.settingsContainer} id=${ids.smSettingsContainer} tabindex="0"></div>`;
      this.containerElement.innerHTML = htmlString;
    }
  }

  destroy(): void {
    this.settingsController.destroy();
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
  }
  handleEventPause(): void {
    if (this.buttonPlayPrimary) {
      this.buttonPlayPrimary.show();
    }
    if (this.buttonReplayPrimary) {
      this.buttonReplayPrimary.hide();
    }
  }
  handleEventEnded(): void {
    if (this.buttonPlayPrimary) {
      this.buttonPlayPrimary.hide();
    }
    if (this.buttonReplayPrimary) {
      this.buttonReplayPrimary.show();
    }
  }
}

export default BodyController;
