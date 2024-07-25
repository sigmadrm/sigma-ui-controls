import BaseComponent from '../../../BaseComponent';
import { ids } from '../../../../constants';
import { playIcon } from '../../../../icons';
import { IConstructorBaseProps } from '../../../../type';

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
  handleEventPlay = () => {
    this.hideButtonPlay();
  };
  handleEventPause = () => {
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
