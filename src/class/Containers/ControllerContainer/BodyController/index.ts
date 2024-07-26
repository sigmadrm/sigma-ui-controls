import BaseComponent from '../../../BaseComponent';
import { ids } from '../../../../constants';
import { playIcon } from '../../../../icons';
import { EEVentName, IConstructorBaseProps } from '../../../../type';

import ButtonPlayPrimary from '../../../Components/ButtonPlayPrimary';
import SettingsController from './SettingsController';

interface IConstructorProps extends IConstructorBaseProps {}

class BodyController extends BaseComponent {
  private buttonPrimary: ButtonPlayPrimary | undefined;
  private settingsController: SettingsController;

  constructor(props: IConstructorProps) {
    const { classes, apiPlayer } = props;
    super(props);

    this.buttonPrimary = new ButtonPlayPrimary({
      id: ids.smButtonPlayPrimary,
      classes,
      apiPlayer,
    });
    this.settingsController = new SettingsController({
      id: ids.smSettingsContainer,
      classes,
      apiPlayer,
    });
    apiPlayer.eventemitter.on(EEVentName.PLAY, () => {
      if (this.buttonPrimary) {
        this.buttonPrimary.hide();
      }
    });
    apiPlayer.eventemitter.on(EEVentName.PAUSE, () => {
      if (this.buttonPrimary) {
        this.buttonPrimary.show();
      }
    });
  }
  render() {
    if (this.containerElement) {
      const { classes } = this;
      const htmlString = `
      <div class=${classes.buttonPlayPrimary} id=${ids.smButtonPlayPrimary}>
        ${playIcon}
      </div>
      <div class=${classes.settingsContainer} id=${ids.smSettingsContainer}>
      </div>
      `;
      this.containerElement.innerHTML = htmlString;
    }
  }

  registerListener(): void {
    document.getElementById(ids.smSettingsContainer)?.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
    });
  }
}

export default BodyController;
