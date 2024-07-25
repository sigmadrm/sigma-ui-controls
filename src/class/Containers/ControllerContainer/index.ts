import HeadController from './HeadController';
import BodyController from './BodyController';
import FooterController from './FooterController';

import { generateHtmlContentControllerString } from '../../../services';
import { ids } from '../../../constants';
import { IConfigureUIPlayerProps, IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';

interface IConstructorProps extends IConstructorBaseProps {
  videoInfo: IConfigureUIPlayerProps['videoInfo'];
}
class ControllerContainer extends BaseComponent {
  private headController: HeadController | undefined;
  private bodyController: BodyController | undefined;
  private footerController: FooterController | undefined;

  constructor(props: IConstructorProps) {
    const { classes, videoInfo, apiPlayer } = props;
    super(props);

    this.headController = new HeadController({ id: ids.smHeadController, classes, videoInfo, apiPlayer });
    this.bodyController = new BodyController({ id: ids.smBodyController, classes, apiPlayer });
    this.footerController = new FooterController({ id: ids.smFooterController, classes, apiPlayer });
  }

  render() {
    const { classes } = this;
    const htmlContentString = `
      <div class=${classes.headController} id=${ids.smHeadController}></div>
      <div class=${classes.bodyController} id=${ids.smBodyController}></div>
      <div class=${classes.footerController} id=${ids.smFooterController}></div>
     `;
    if (this.containerElement) {
      this.containerElement.innerHTML = htmlContentString;
    }
  }

  registerListener() {
    this.containerElement?.addEventListener('click', (event) => this.handleClickContainer(event));
  }

  unregisterListener() {}

  handleClickContainer = (event: MouseEvent) => {
    const { apiPlayer } = this;
    event.preventDefault();
    event.stopPropagation();
    if (apiPlayer.isPlay()) {
      apiPlayer.pause();
    } else {
      apiPlayer.play();
    }
  };

  hide = () => {
    if (this.containerElement) {
      this.containerElement.className = this.classes.controllerContent;
    }
  };
  show = () => {
    if (this.containerElement) {
      this.containerElement.classList.add(this.classes.controllerContentEnable);
    }
  };
  handleEventPlay = () => {
    this.bodyController && this.bodyController.handleEventPlay();
    this.footerController && this.footerController.handleEventPlay();
  };
  handleEventPause = () => {
    this.bodyController && this.bodyController.handleEventPause();
    this.footerController && this.footerController.handleEventPause();
  };
}
export default ControllerContainer;
