import HeadController from './HeadController';
import BodyController from './BodyController';
import FooterController from './FooterController';

import { EEVentName, ESettingPanelDataState, IConfigureUIPlayerProps, IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';
import { checkDeviceIsTouch } from '../../../services';

interface IConstructorProps extends IConstructorBaseProps {
  videoInfo: IConfigureUIPlayerProps['videoInfo'];
}
class ControllerContainer extends BaseComponent {
  private headController: HeadController | undefined;
  private bodyController: BodyController | undefined;
  private footerController: FooterController | undefined;
  private timerId: number | null | undefined;

  constructor(props: IConstructorProps) {
    const { classes, apiPlayer, ids } = props;
    super(props);
    this.headController = new HeadController({ id: ids.smHeadController, classes, apiPlayer, ids });
    this.bodyController = new BodyController({ id: ids.smBodyController, classes, apiPlayer, ids });
    this.footerController = new FooterController({ id: ids.smFooterController, classes, apiPlayer, ids });
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  render() {
    const { classes, ids } = this;
    const htmlContentString = `
      <div class="${classes.headController} ${classes.headControllerEnable}" id="${ids.smHeadController}"></div>
      <div class="${classes.bodyController}" id="${ids.smBodyController}"></div>
      <div class="${classes.footerController} ${classes.footerControllerEnable}" id="${ids.smFooterController}"></div>
     `;
    if (this.containerElement) {
      this.containerElement.innerHTML = htmlContentString;
    }
  }

  registerListener() {
    if (this.containerElement) {
      this.containerElement.onclick = (event) => this.handleClickContainer(event);
      this.containerElement.onmousemove = (event) => this.handleOnMouseMover();
    }
    if (this.containerElement) {
      this.containerElement.onmouseover = () => this.handleOnMouseover();
      this.containerElement.onmouseout = () => this.handleOnMouseout();
    }
    this.apiPlayer.eventemitter.on(EEVentName.LOADED, this.show, this);
    this.apiPlayer.eventemitter.on(EEVentName.ERROR, this.hide, this);
  }

  unregisterListener() {
    if (this.containerElement) {
      this.containerElement.onclick = (event) => {};
      this.containerElement.onmousemove = (event) => {};
    }
    if (this.containerElement) {
      this.containerElement.onmouseover = () => {};
      this.containerElement.onmouseout = () => {};
    }
    if (this.containerElement) {
      this.containerElement.onclick = (event) => {};
    }
    this.apiPlayer.eventemitter.off(EEVentName.LOADED, this.show, this);
    this.apiPlayer.eventemitter.off(EEVentName.ERROR, this.hide, this);
  }
  handleOnMouseMover = () => {
    if (this.footerController) {
      if (this.timerId) {
        clearTimeout(this.timerId);
      }
      this.footerController.show();
      this.timerId = self.setInterval(() => {
        if (checkDeviceIsTouch(this.apiPlayer.deviceType)) {
          if (this.footerController) {
            this.footerController.hidden();
          }
          if (this.headController) {
            this.headController.hidden();
          }
        } else {
          if (!this.footerController?.getIsInside()) {
            if (this.footerController) {
              this.footerController.hidden();
            }
            if (this.headController) {
              this.headController.hidden();
            }
          }
        }
      }, 3000);
    }
    if (this.headController) {
      this.headController.show();
    }
  };
  handleOnMouseover() {
    if (this.footerController) {
      if (this.timerId) {
        clearTimeout(this.timerId);
      }
      this.footerController.show();
      this.timerId = self.setInterval(() => {
        if (!this.footerController?.getIsInside()) {
          if (this.footerController) {
            this.footerController.hidden();
          }
          if (this.headController) {
            this.headController.hidden();
          }
        }
      }, 3000);
    }
    if (this.headController) {
      this.headController.show();
    }
  }
  handleOnMouseout() {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    if (this.footerController) {
      this.footerController.hidden();
    }
    if (this.headController) {
      this.headController.hidden();
    }
  }
  handleClickContainer = (event: MouseEvent) => {
    const { apiPlayer } = this;
    event.preventDefault();
    event.stopPropagation();
    if (
      document.getElementById(this.ids.smSettingsContainer)?.getAttribute('data-state') === ESettingPanelDataState.BLUR
    ) {
      return;
    }
    if (apiPlayer.isPlay()) {
      apiPlayer.pause();
      this.handleOnMouseover();
    } else {
      apiPlayer.play();
    }
  };

  hide() {
    if (this.containerElement) {
      this.containerElement.className = this.classes.controllerContent;
    }
  }
  show() {
    if (this.containerElement) {
      this.containerElement.classList.add(this.classes.controllerContentEnable);
    }
  }
}
export default ControllerContainer;
