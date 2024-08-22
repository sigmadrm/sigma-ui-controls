import HeadController from './HeadController';
import BodyController from './BodyController';
import FooterController from './FooterController';

import { EEVentName, ESettingPanelDataState, IConfigureUIPlayerProps, IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';

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
      // mouse
      this.containerElement.onmousemove = (e: MouseEvent) => this.handleOnMouseMover(e);
      this.containerElement.onmouseover = (e: MouseEvent) => this.handleOnMouseover(e);
      this.containerElement.onmouseout = (e: MouseEvent) => this.handleOnMouseout(e);
      //touch
      this.containerElement.ontouchmove = (e: TouchEvent) => this.handleOnMouseMover(e);
      this.containerElement.ontouchstart = (e: TouchEvent) => this.handleOnMouseover(e);
      this.containerElement.ontouchend = (e: TouchEvent) => this.handleOnMouseout(e);
    }
    this.apiPlayer.eventemitter.on(EEVentName.LOADED, this.handleEvtLoaded, this);
    this.apiPlayer.eventemitter.on(EEVentName.ERROR, this.handleEvtError, this);
    this.apiPlayer.eventemitter.on(EEVentName.SCRUBBING, this.handleEvtScrubbing, this);
    this.apiPlayer.eventemitter.on(EEVentName.SEEKING, this.handleEvtSeeking, this);
    this.apiPlayer.eventemitter.on(EEVentName.FULL_SCREEN_CHANGE, this.handleEvtFullScreenChange, this);
    this.apiPlayer.eventemitter.on(EEVentName.SEEK_BAR_SEEKING, this.handleEventSeekBarSeeking, this);
    this.apiPlayer.eventemitter.on(EEVentName.ENDED, this.handleEventEnded, this);
    this.apiPlayer.eventemitter.on(EEVentName.PLAY, this.handleEventPlay, this);
  }

  unregisterListener() {
    if (this.containerElement) {
      this.containerElement.onclick = () => {};
      // mouse
      this.containerElement.onmousemove = () => {};
      this.containerElement.onmouseover = () => {};
      this.containerElement.onmouseout = () => {};
      // touch
      this.containerElement.ontouchstart = () => {};
      this.containerElement.ontouchend = () => {};
      this.containerElement.ontouchmove = () => {};
    }
    this.apiPlayer.eventemitter.off(EEVentName.LOADED, this.handleEvtLoaded, this);
    this.apiPlayer.eventemitter.off(EEVentName.ERROR, this.handleEvtError, this);
    this.apiPlayer.eventemitter.off(EEVentName.SCRUBBING, this.handleEvtScrubbing, this);
    this.apiPlayer.eventemitter.off(EEVentName.SEEKING, this.handleEvtSeeking, this);
    this.apiPlayer.eventemitter.off(EEVentName.FULL_SCREEN_CHANGE, this.handleEvtFullScreenChange, this);
    this.apiPlayer.eventemitter.off(EEVentName.SEEK_BAR_SEEKING, this.handleEventSeekBarSeeking, this);
    this.apiPlayer.eventemitter.off(EEVentName.ENDED, this.handleEventEnded, this);
    this.apiPlayer.eventemitter.off(EEVentName.PLAY, this.handleEventPlay, this);
  }
  handleEvtFullScreenChange(e, data) {
    console.log({ e, data });
    const containerEle = this?.containerElement?.parentElement;
    if (this.apiPlayer.isFullScreen()) {
      this.apiPlayer.rotateVideo(containerEle);
    } else {
      this.apiPlayer.resetRotation(containerEle);
    }
  }
  handleEventEnded() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }

    if (this.footerController) {
      this.footerController.show();
    }
    if (this.headController) {
      this.headController.show();
    }
    if (this.bodyController) {
      this.bodyController.show();
    }
  }
  handleEventPlay() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.footerController) {
      this.footerController.show();
    }
    if (this.headController) {
      this.headController.show();
    }
    if (this.bodyController) {
      this.bodyController.show();
    }
    this.timerId = self.setTimeout(() => {
      if (this.footerController) {
        this.footerController.hidden();
      }
      if (this.headController) {
        this.headController.hidden();
      }
      if (this.bodyController) {
        this.bodyController.hidden();
      }
    }, 3000);
  }
  handleEventSeekBarSeeking(e, data) {
    if (data.seeking) {
      if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = null;
        if (this.footerController) {
          this.footerController.show();
        }
      }
    } else {
      if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }

      if (this.footerController) {
        this.footerController.show();
      }
      if (this.headController) {
        this.headController.show();
      }
      if (this.bodyController) {
        this.bodyController.show();
      }
      this.timerId = self.setTimeout(() => {
        if (this.footerController) {
          this.footerController.hidden();
        }
        if (this.headController) {
          this.headController.hidden();
        }
        if (this.bodyController) {
          this.bodyController.hidden();
        }
      }, 3000);
    }
  }
  handleOnMouseMover(e: MouseEvent | TouchEvent) {
    if (e.type === 'mousemove') {
      if (this.footerController) {
        if (this.timerId) {
          clearTimeout(this.timerId);
          this.timerId = null;
        }
        this.footerController.show();
        this.timerId = self.setTimeout(() => {
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
  }
  handleOnMouseover(e: MouseEvent | TouchEvent) {
    if (e.type === 'mouseover') {
      if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }
      if (this.footerController) {
        this.footerController.show();
      }
      if (this.headController) {
        this.headController.show();
      }
      this.timerId = self.setTimeout(() => {
        if (this.footerController) {
          if (!this.footerController?.getIsInside()) {
            if (this.footerController) {
              this.footerController.hidden();
            }
          }
        }
        if (this.headController) {
          this.headController.hidden();
        }
      }, 3000);
    }
  }
  handleOnMouseout(e: MouseEvent | TouchEvent) {
    if (e.type === 'mouseout') {
      if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }
      this.timerId = self.setTimeout(() => {
        if (!this.footerController?.getIsInside()) {
          if (this.footerController) {
            this.footerController.hidden();
          }
        }
        if (this.headController) {
          this.headController.hidden();
        }
      }, 3000);
    }
  }
  handleClickContainer(event: MouseEvent) {
    const evt = event as PointerEvent;
    if (evt) {
      const { apiPlayer } = this;
      event.preventDefault();
      event.stopPropagation();
      if (evt.pointerType === 'mouse') {
        if (
          document.getElementById(this.ids.smSettingsContainer)?.getAttribute('data-state') ===
          ESettingPanelDataState.BLUR
        ) {
          return;
        }
        if (apiPlayer.isPlay()) {
          apiPlayer.pause();
        } else {
          apiPlayer.play();
        }
      } else {
        if (this.timerId) {
          clearTimeout(this.timerId);
          this.timerId = null;
        }

        if (this.footerController) {
          this.footerController.show();
        }
        if (this.headController) {
          this.headController.show();
        }
        if (this.bodyController) {
          this.bodyController.show();
        }
        this.timerId = self.setTimeout(() => {
          if (!this.footerController?.getIsInside()) {
            if (this.footerController) {
              this.footerController.hidden();
            }
          }
          if (this.headController) {
            this.headController.hidden();
          }
          if (this.bodyController) {
            this.bodyController.hidden();
          }
        }, 3000);
      }
    }
  }
  handleEvtLoaded() {
    if (this.containerElement) {
      this.containerElement.classList.add(this.classes.controllerContentEnable);
    }
  }
  handleEvtError() {
    if (this.containerElement) {
      this.containerElement.className = this.classes.controllerContent;
    }
  }
  handleEvtSeeking(e, data) {
    if (data.seeking === false) {
      // this.counter = 0;
    }
  }
  handleEvtScrubbing(e, data) {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (data.counter > 1) {
      if (this.footerController) {
        this.footerController.hidden();
      }
      if (this.headController) {
        this.headController.hidden();
      }
      if (this.bodyController) {
        this.bodyController.hidden();
      }
    } else {
      if (this.footerController) {
        this.footerController.show();
      }
      if (this.headController) {
        this.headController.show();
      }
      if (this.bodyController) {
        this.bodyController.show();
      }
      this.timerId = self.setTimeout(() => {
        if (this.footerController) {
          this.footerController.hidden();
        }
        if (this.headController) {
          this.headController.hidden();
        }
        if (this.bodyController) {
          this.bodyController.hidden();
        }
      }, 3000);
    }
  }
}
export default ControllerContainer;
