import { ids, typePlayerDef, versionDef } from './constants';
import { EEVentName, IConfigureUIPlayerProps, SmListeners } from './type';

import ControllerContainer from './class/Containers/ControllerContainer';
import ErrorContainer from './class/Containers/ErrorContainer';
import LoadingContainer from './class/Containers/LoadingContainer';

import { generateApiPlayer, generateHtmlContentContainerString } from './services';

import generateStyles from './style';
import './index.css';
import SmApiPlayer from './class/SmApiPlayer';

const classes = generateStyles();

class SmUIControls {
  private apiPlayer: SmApiPlayer | undefined;
  private isInit: boolean = false;
  private controllerContainer: ControllerContainer | undefined;
  private errorContainer: ErrorContainer | undefined;
  private loadingContainer: LoadingContainer | undefined;

  constructor(props: IConfigureUIPlayerProps) {
    const {
      player,
      video,
      idVideoContainer,
      typePlayer = typePlayerDef,
      version = versionDef,
      videoInfo,
      style,
    } = props;

    const htmlContentString = generateHtmlContentContainerString(classes);
    const apiPlayer = (this.apiPlayer = generateApiPlayer(player, video, typePlayer, version));
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
          console.log('addEventListener', EEVentName.LOADED, data);
          apiPlayer.eventemitter.trigger(EEVentName.LOADED, data);
        });
        apiPlayer.addEventListener(EEVentName.ERROR, (data: any) => {
          console.log('addEventListener', EEVentName.ERROR, data);
          apiPlayer.eventemitter.trigger(EEVentName.ERROR, data);
        });
        apiPlayer.addEventListener(EEVentName.PLAY, (data: any) => {
          console.log('addEventListener', EEVentName.PLAY, data);
          apiPlayer.eventemitter.trigger(EEVentName.PLAY, data);
        });
        apiPlayer.addEventListener(EEVentName.PAUSE, (data: any) => {
          console.log('addEventListener', EEVentName.PAUSE, data);
          apiPlayer.eventemitter.trigger(EEVentName.PAUSE, data);
        });
        apiPlayer.addEventListener(EEVentName.FULLSCREENCHANGE, (data: any) => {
          console.log('addEventListener', EEVentName.FULLSCREENCHANGE, data);
          apiPlayer.eventemitter.trigger(EEVentName.FULLSCREENCHANGE, data);
        });
      }
    }
  }

  destroy() {
    this.apiPlayer = undefined;
    this.isInit = false;
  }
}

export default SmUIControls;
