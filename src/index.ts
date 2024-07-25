import { ids, typePlayerDef, versionDef } from './constants';
import { EEVentName, IApiPlayer, IConfigureUIPlayerProps } from './type';

import ControllerContainer from './class/Containers/ControllerContainer';
import ErrorContainer from './class/Containers/ErrorContainer';
import LoadingContainer from './class/Containers/LoadingContainer';

import { generateApiPlayer, generateHtmlContentContainerString } from './services';

import generateStyles from './style';
import './index.css';

const classes = generateStyles();

class SmUIControls {
  private apiPlayer: IApiPlayer = {
    play: () => Promise<void> || undefined,
    pause: () => Promise<void> || undefined,
  };
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
    const apiPlayer = generateApiPlayer(player, video, typePlayer, version);
    this.apiPlayer = apiPlayer;
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
          this.handleEventLoaded(data);
        });
        apiPlayer.addEventListener(EEVentName.ERROR, (data: any) => {
          this.handleEventError(data);
        });
        apiPlayer.addEventListener(EEVentName.PLAY, (data: any) => {
          this.handleEventPlay(data);
        });
        apiPlayer.addEventListener(EEVentName.PAUSE, (data: any) => {
          this.handleEventPause(data);
        });
        apiPlayer.addEventListener(EEVentName.FULLSCREENCHANGE, (data: any) => {
          this.handleEventFullScreenChange(data);
        });
      }
    }
  }
  handleEventLoaded = (data: any) => {
    this.loadingContainer && this.loadingContainer.handleEventLoaded();
    this.controllerContainer && this.controllerContainer.handleEventLoaded();
    this.errorContainer && this.errorContainer.handleEventLoaded();
  };
  handleEventError = (data: any) => {
    console.log('error', { data });
    this.loadingContainer && this.loadingContainer.hide();
    this.controllerContainer && this.controllerContainer.hide();
    this.errorContainer && this.errorContainer.show(data);
  };
  handleEventPlay = (data: any) => {
    console.log('play', { data });
    this.controllerContainer?.handleEventPlay();
  };
  handleEventPause = (data: any) => {
    console.log('pause', { data });
    this.controllerContainer?.handleEventPause();
  };
  handleEventFullScreenChange = (data: any) => {
    console.log('fullscreen change', { data });
    this.controllerContainer?.handleEventFullScreenChange();
  };
  destroy() {
    this.apiPlayer = {};
    this.isInit = false;
  }
}

export default SmUIControls;
