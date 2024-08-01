import { ids, typePlayerDef, versionDef } from './constants';
import { EEVentName, IConfigureUIPlayerProps, ISmEventEmitter, SmListeners } from './type';

import ControllerContainer from './class/Containers/ControllerContainer';
import ErrorContainer from './class/Containers/ErrorContainer';
import LoadingContainer from './class/Containers/LoadingContainer';

import { generateHtmlContentContainerString } from './services';

import 'animate.css';
import './index.css';
import generateStyles from './style';
import SmApiPlayer from './class/SmApiPlayer';
import SmEventEmitter from './class/SmEventEmitter/SmEventEmitter';

const classes = generateStyles();

class SmUIControls implements ISmEventEmitter {
  private apiPlayer: SmApiPlayer | null;
  private isInit: boolean = false;
  private controllerContainer: ControllerContainer | undefined;
  private errorContainer: ErrorContainer | undefined;
  private loadingContainer: LoadingContainer | undefined;

  constructor(props: IConfigureUIPlayerProps) {
    const { player, video, idVideoContainer, typePlayer = typePlayerDef, version = versionDef, videoInfo } = props;

    const htmlContentString = generateHtmlContentContainerString(classes);
    const apiPlayer = (this.apiPlayer = new SmApiPlayer({ player, video, typePlayer, version }));
    const VideoContainerElement = document.getElementById(idVideoContainer);

    if (!this.isInit) {
      this.isInit = true;
      if (VideoContainerElement) {
        VideoContainerElement.style.position = 'relative';
        VideoContainerElement.style.overflow = 'hidden';
        const smControllerContainerEle = document.createElement('div');
        smControllerContainerEle.className = classes.container;
        smControllerContainerEle.id = ids.smControllerContainer;
        smControllerContainerEle.innerHTML = htmlContentString;
        VideoContainerElement.appendChild(smControllerContainerEle);

        this.controllerContainer = new ControllerContainer({
          id: ids.smControllerContent,
          classes,
          videoInfo,
          apiPlayer,
        });
        this.errorContainer = new ErrorContainer({ id: ids.smError, classes, apiPlayer });
        this.loadingContainer = new LoadingContainer({ id: ids.smLoading, classes, apiPlayer });

        apiPlayer.addEventListener(EEVentName.LOADED, (data: any) => {
          // console.log('addEventListener', EEVentName.LOADED, data);
          apiPlayer.eventemitter.trigger(EEVentName.LOADED, data);
        });
        apiPlayer.addEventListener(EEVentName.ERROR, (data: any) => {
          // console.log('addEventListener', EEVentName.ERROR, data);
          apiPlayer.eventemitter.trigger(EEVentName.ERROR, data);
        });
        apiPlayer.addEventListener(EEVentName.PLAY, (data: any) => {
          // console.log('addEventListener', EEVentName.PLAY, data);
          apiPlayer.eventemitter.trigger(EEVentName.PLAY, data);
        });
        apiPlayer.addEventListener(EEVentName.PAUSE, (data: any) => {
          // console.log('addEventListener', EEVentName.PAUSE, data);
          apiPlayer.eventemitter.trigger(EEVentName.PAUSE, data);
        });
        apiPlayer.addEventListener(EEVentName.FULL_SCREEN_CHANGE, (data: any) => {
          // console.log('addEventListener', EEVentName.FULL_SCREEN_CHANGE, data);
          apiPlayer.eventemitter.trigger(EEVentName.FULL_SCREEN_CHANGE, data);
        });
        apiPlayer.addEventListener(EEVentName.VOLUME_CHANGE, (data: any) => {
          // console.log('addEventListener', EEVentName.VOLUME_CHANGE, data);
          apiPlayer.eventemitter.trigger(EEVentName.VOLUME_CHANGE, data);
        });
        apiPlayer.addEventListener(EEVentName.TIME_UPDATE, (data: any) => {
          // console.log('addEventListener', EEVentName.TIME_UPDATE, data);
          apiPlayer.eventemitter.trigger(EEVentName.TIME_UPDATE, data);
        });
        apiPlayer.addEventListener(EEVentName.LOADED_META_DATA, (data: any) => {
          // console.log('addEventListener', EEVentName.LOADED_META_DATA, data);
          apiPlayer.eventemitter.trigger(EEVentName.LOADED_META_DATA, data);
        });
        apiPlayer.addEventListener(EEVentName.PROGRESS, (data: any) => {
          // console.log('addEventListener', EEVentName.PROGRESS, data);
          apiPlayer.eventemitter.trigger(EEVentName.PROGRESS, data);
        });
        apiPlayer.addEventListener(EEVentName.ENDED, (data: any) => {
          // console.log('addEventListener', EEVentName.ENDED, data);
          apiPlayer.eventemitter.trigger(EEVentName.ENDED, data);
        });
        apiPlayer.addEventListener(EEVentName.WAITING, (data: any) => {
          // console.log('addEventListener', EEVentName.WAITING, data);
          apiPlayer.eventemitter.trigger(EEVentName.WAITING, data);
        });
        apiPlayer.addEventListener(EEVentName.PLAYING, (data: any) => {
          // console.log('addEventListener', EEVentName.PLAYING, data);
          apiPlayer.eventemitter.trigger(EEVentName.PLAYING, data);
        });
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
    this.errorContainer?.destroy();
    this.loadingContainer?.destroy();
    this.apiPlayer = null;
    this.isInit = false;
  }
}

export { SmListeners };
export default SmUIControls;
