import { IConstructorBaseProps } from '../../../../../type';
import ButtonFullScreen from '../../../../Components/ButtonFullScreen';
import { ids } from '../../../../../constants';
import ButtonPlaySecondary from '../../../../Components/ButtonPlaySecondary';
import BaseComponent from '../../../../BaseComponent';
import { playIcon, pausedIcon, replyIcon, forwardIcon, volumeIcon, muteIcon } from '../../../../../icons';

interface IConstructorProps extends IConstructorBaseProps {}

class TaskbarController extends BaseComponent {
  private buttonFullScreen: ButtonFullScreen | undefined;
  private buttonPlaySecondary: ButtonPlaySecondary | undefined;

  constructor(props: IConstructorProps) {
    const { classes, apiPlayer } = props;
    super(props);

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
  }

  render() {
    if (this.containerElement) {
      const { classes } = this;
      const htmlString = `
      <div class=${classes.taskbarGroup}>
        <div class=${classes.taskbarGroupBtn}  id=${ids.smButtonPlaySecondary}>${playIcon}</div>
        <div class=${classes.taskbarGroupBtn}>${pausedIcon}</div>
        <div class=${classes.taskbarGroupBtn}>${replyIcon}</div>
        <div class=${classes.taskbarGroupBtn}>${forwardIcon}</div>
        <div class=${classes.taskbarGroupBtn}>${volumeIcon}</div>
        <div class=${classes.taskbarGroupBtn}>${muteIcon}</div>
       </div>
      <div>
        <div class=${classes.taskbarGroupBtn} id=${ids.smButtonFullScreen}></div>
      </div>`;
      this.containerElement.innerHTML = htmlString;
    }
  }

  handleEventPlay = () => {
    if (this.buttonPlaySecondary) {
      this.buttonPlaySecondary.hide();
    }
  };
  handleEventPause = () => {
    if (this.buttonPlaySecondary) {
      this.buttonPlaySecondary.show();
    }
  };
}

export default TaskbarController;
