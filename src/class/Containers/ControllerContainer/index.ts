import HeadController from './HeadController';
import BodyController from './BodyController';
import FooterController from './FooterController';

import { ids } from '../../../constants';
import { EEVentName, ESettingPanelDataState, IConfigureUIPlayerProps, IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';

interface IConstructorProps extends IConstructorBaseProps {
  videoInfo: IConfigureUIPlayerProps['videoInfo'];
}
class ControllerContainer extends BaseComponent {
  private headController: HeadController | undefined;
  private bodyController: BodyController | undefined;
  private footerController: FooterController | undefined;

  constructor(props: IConstructorProps) {
    const { classes, apiPlayer } = props;
    super(props);

    // this.headController = new HeadController({ id: ids.smHeadController, classes, videoInfo, apiPlayer });
    this.bodyController = new BodyController({ id: ids.smBodyController, classes, apiPlayer });
    this.footerController = new FooterController({ id: ids.smFooterController, classes, apiPlayer });

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  render() {
    const { classes } = this;
    //   const htmlContentString = `
    //   <div class=${classes.headController} id=${ids.smHeadController}></div>
    //   <div class=${classes.bodyController} id=${ids.smBodyController}></div>
    //   <div class=${classes.footerController} id=${ids.smFooterController}></div>
    //  `;
    const htmlContentString = `
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
    }
    if (this.containerElement) {
      this.containerElement.onmouseover = () => this.handleOnMouseover();
      this.containerElement.onmouseout = () => this.handleOnMouseout();
    }
    this.apiPlayer.eventemitter.on(EEVentName.LOADED, this.show, this);
    this.apiPlayer.eventemitter.on(EEVentName.ERROR, this.hide, this);
  }

  unregisterListener() {
    this.containerElement?.addEventListener('click', (event) => {});
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
  handleOnMouseover() {
    if (this.footerController) {
      this.footerController.show();
    }
  }
  handleOnMouseout() {
    if (this.footerController) {
      this.footerController.hidden();
    }
  }
  handleClickContainer = (event: MouseEvent) => {
    const { apiPlayer } = this;
    event.preventDefault();
    event.stopPropagation();
    if (document.getElementById(ids.smSettingsContainer)?.getAttribute('data-state') === ESettingPanelDataState.BLUR) {
      // prevent event click when setting panel change state opened to blur
      return;
    }
    if (apiPlayer.isPlay()) {
      apiPlayer.pause();
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
