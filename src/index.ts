import { ids, typePlayerDef, versionDef } from './constants';
import { EEVentName, IConfigureUIPlayerProps, SmListeners } from './type';

import ControllerContainer from './class/Containers/ControllerContainer';
import ErrorContainer from './class/Containers/ErrorContainer';
import LoadingContainer from './class/Containers/LoadingContainer';

import { generateHtmlContentContainerString } from './services';

import 'animate.css';
import './index.css';
import generateStyles from './style';
import SmApiPlayer from './class/SmApiPlayer';

const classes = generateStyles();

class SmUIControls {
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
          console.log('addEventListener', EEVentName.ENDED, data);
          apiPlayer.eventemitter.trigger(EEVentName.ENDED, data);
        });
      }
    }
  }

  destroy() {
    this.controllerContainer?.destroy();
    this.errorContainer?.destroy();
    this.loadingContainer?.destroy();
    this.apiPlayer = null;
    this.isInit = false;
  }
}

export default SmUIControls;
