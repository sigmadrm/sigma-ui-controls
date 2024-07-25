import HeadController from './HeadController';
import BodyController from './BodyController';
import FooterController from './FooterController';

import { generateHtmlContentControllerString } from '../../../services';
import { ids } from '../../../constants';
import { IConfigureUIPlayerProps, IConstructorBaseProps } from '../../../type';

import generateStyles from '../../../style';

interface IConstructorProps extends IConstructorBaseProps {
  videoInfo: IConfigureUIPlayerProps['videoInfo'];
}
class ControllerContainer {
  private id: string;
  private headController: HeadController | undefined;
  private bodyController: BodyController | undefined;
  private footerController: FooterController | undefined;
  private classes: ReturnType<typeof generateStyles>;

  containerEle: HTMLElement | undefined | null;
  constructor(props: IConstructorProps) {
    const { id, classes, videoInfo, apiPlayer } = props;
    this.id = id;
    this.classes = classes;
    const ele = document.getElementById(id);
    this.containerEle = ele;
    const htmlContentString = generateHtmlContentControllerString(classes);
    if (ele) {
      ele.innerHTML = htmlContentString;
      ele.addEventListener('click', (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        if (apiPlayer.isPlay()) {
          apiPlayer.pause();
        } else {
          apiPlayer.play();
        }
      });
    }

    this.headController = new HeadController({ id: ids.smHeadController, classes, videoInfo, apiPlayer });
    this.bodyController = new BodyController({ id: ids.smBodyController, classes, apiPlayer });
    this.footerController = new FooterController({ id: ids.smFooterController, classes, apiPlayer });
  }

  hide = () => {
    if (this.containerEle) {
      this.containerEle.className = this.classes.controllerContent;
    }
  };
  show = () => {
    if (this.containerEle) {
      this.containerEle.classList.add(this.classes.controllerContentEnable);
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
