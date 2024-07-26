import BaseComponent from '../../../BaseComponent';
import { ids } from '../../../../constants';
import { playIcon } from '../../../../icons';
import { EEVentName, IConstructorBaseProps } from '../../../../type';

import ButtonPlayPrimary from '../../../Components/ButtonPlayPrimary';

interface IConstructorProps extends IConstructorBaseProps {}

class BodyController extends BaseComponent {
  private buttonPrimary: ButtonPlayPrimary | undefined;

  constructor(props: IConstructorProps) {
    const { classes, apiPlayer } = props;
    super(props);

    this.buttonPrimary = new ButtonPlayPrimary({
      id: ids.smButtonPlayPrimary,
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
      const htmlString = `<div class=${classes.buttonPlayPrimary} id=${ids.smButtonPlayPrimary}>
        ${playIcon}
      </div>`;
      this.containerElement.innerHTML = htmlString;
    }
  }
}

export default BodyController;
