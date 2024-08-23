import { typePlayerDef, versionDef } from './constants';
import { IConfigureUIPlayerProps, IIds, ISmEventEmitter, SmListeners } from './type';

import ControllerContainer from './class/Containers/ControllerContainer';
import LoadingContainer from './class/Containers/LoadingContainer';
import PopupSetting from './class/Components/PopupSetting';

import { checkHasTouch, detectDevice, generateIIds } from './services';
import generateStyles from './class/Styles/style';
import SmApiPlayer from './class/SmApiPlayer';

import 'animate.css';
import './index.css';

const deviceInfo = detectDevice();
const hasTouch = checkHasTouch();
const classes = generateStyles({
  deviceType: deviceInfo.type,
});

class SmUIControls implements ISmEventEmitter {
  private apiPlayer: SmApiPlayer | null;
  private isInit: boolean = false;
  private controllerContainer: ControllerContainer | undefined;
  // private errorContainer: ErrorContainer | undefined;
  private loadingContainer: LoadingContainer | undefined;
  private popupSetting: PopupSetting | undefined;
  private ids: IIds;

  constructor(props: IConfigureUIPlayerProps) {
    const { player, video, idVideoContainer, typePlayer = typePlayerDef, version = versionDef, videoInfo } = props;

    const apiPlayer = (this.apiPlayer = new SmApiPlayer({ player, video, typePlayer, version, hasTouch, deviceInfo }));
    const VideoContainerElement = document.getElementById(idVideoContainer);
    this.ids = generateIIds();
    if (!this.isInit) {
      this.isInit = true;
      if (VideoContainerElement) {
        VideoContainerElement.style.position = 'relative';
        VideoContainerElement.style.overflow = 'hidden';
        const smControllerContainerEle = document.createElement('div');
        smControllerContainerEle.className = classes.container;
        smControllerContainerEle.id = this.ids.smControllerContainer;
        smControllerContainerEle.innerHTML = `
          <div class="${classes.controllerContent}" id="${this.ids.smControllerContent}"></div>
          <div class="${classes.loadingContainer}" id="${this.ids.smLoading}"></div>
          <div class="${classes.errorContainer}" id="${this.ids.smError}"></div>
          <div class="${classes.popupSettings}" id="${this.ids.smPopupSettings}"></div>
          `;
        VideoContainerElement.appendChild(smControllerContainerEle);

        this.controllerContainer = new ControllerContainer({
          id: this.ids.smControllerContent,
          classes,
          videoInfo,
          apiPlayer,
          ids: this.ids,
        });
        // this.errorContainer = new ErrorContainer({ id: this.ids.smError, classes, apiPlayer, ids: this.ids });
        this.loadingContainer = new LoadingContainer({ id: this.ids.smLoading, classes, apiPlayer, ids: this.ids });
        this.popupSetting = new PopupSetting({ id: this.ids.smPopupSettings, classes, apiPlayer, ids: this.ids });
      }
    }
  }
  on<E extends keyof SmListeners, Context = undefined>(event: E, listener: SmListeners[E], context?: Context): void {
    this.apiPlayer?.eventemitter.on(event, listener, context);
    return;
  }
  once<E extends keyof SmListeners, Context = undefined>(event: E, listener: SmListeners[E], context?: Context): void {
    this.apiPlayer?.eventemitter.on(event, listener, context);
    return;
  }
  removeAllListeners<E extends keyof SmListeners>(event?: E): void {
    this.apiPlayer?.eventemitter.removeAllListeners(event);
    return;
  }
  off<E extends keyof SmListeners, Context = undefined>(
    event: E,
    listener?: SmListeners[E],
    context?: Context,
    once?: boolean,
  ): void {
    this.apiPlayer?.eventemitter.off(event, listener, context, once);
    return;
  }
  listeners<E extends keyof SmListeners>(event: E): SmListeners[E][] {
    this.apiPlayer?.eventemitter.listeners(event);
    return [];
  }
  emit<E extends keyof SmListeners>(event: E, name: E, eventObject: Parameters<SmListeners[E]>[1]): boolean {
    this.apiPlayer?.eventemitter.emit(event, name, eventObject);
    return true;
  }
  trigger<E extends keyof SmListeners>(event: E, eventObject: Parameters<SmListeners[E]>[1]): boolean {
    this.apiPlayer?.eventemitter.trigger(event, eventObject);
    return true;
  }
  listenerCount<E extends keyof SmListeners>(event: E): number {
    this.apiPlayer?.eventemitter.listenerCount(event);
    return 0;
  }

  destroy() {
    this.controllerContainer?.destroy();
    // this.errorContainer?.destroy();
    this.loadingContainer?.destroy();
    this.apiPlayer = null;
    this.isInit = false;
  }
}

export { SmListeners, deviceInfo };
export default SmUIControls;
