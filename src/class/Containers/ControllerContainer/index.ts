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
    console.log('Render componet con');

    const { classes } = this;
    const htmlContentString = generateHtmlContentControllerString(classes);
    if (this.containerElement) {
      this.containerElement.innerHTML = htmlContentString;
    }
  }

  registerListener() {
    const { containerElement } = this;
    containerElement?.addEventListener('click', this.handleClickContainer);
  }

  unregisterListener() {
    this.containerElement?.removeEventListener('click', this.handleClickContainer);
  }

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
