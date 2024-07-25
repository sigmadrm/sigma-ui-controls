import BaseComponent from '../../../BaseComponent';
import { ids } from '../../../../constants';
import { playIcon } from '../../../../icons';
import { IConstructorBaseProps } from '../../../../type';
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
    this.settingsController = new SettingsController({ id: ids.smSettingsContainer, classes, apiPlayer });
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
  handleEventPlay = () => {
    this.hideButtonPlay();
  };
  handleEventPause = () => {
    this.showButtonPlay();
  };
  handleEventLoaded = () => {
    this.showButtonPlay();
  };

  hideButtonPlay = () => {
    if (this.buttonPrimary) {
      this.buttonPrimary.hide();
    }
  };
  showButtonPlay = () => {
    if (this.buttonPrimary) {
      this.buttonPrimary.show();
    }
  };
}

export default BodyController;
