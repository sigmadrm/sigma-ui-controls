import { ETypePlayer, ids } from './constants';
import generateStyles from './style';
import { EEVentName } from './type';

export const convertDataEventLoaded = (data: any) => {
  return data;
};

export const convertDataEventError = (data: any) => {
  return { errorCode: data.detail.code, message: data.detail.message };
};

export const convertDataEventPlay = (data: any) => {
  return data;
};

export const convertDataEventPause = (data: any) => {
  return data;
};
export const convertDataEventFullScreenChange = (data: any) => {
  return data;
};

export const createElementFromHTML = (htmlString: string) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString.trim();
  return tempDiv.firstChild;
};

export const generateApiPlayer = (
  player: any,
  video: HTMLVideoElement | null | undefined,
  typePlayer: ETypePlayer,
  version?: string,
) => {
  const apiPlayer: { [key: string]: any } = {
    play: () => {
      return video?.play();
    },
    pause: () => {
      video?.pause();
    },
    isPlay: () => {
      if (video) {
        return !video.paused;
      }
      return false;
    },
    isFullScreen: () => {
      const isFullscreen = document.fullscreenElement;
      if (isFullscreen) {
        return true;
      } else {
        return false;
      }
    },
    enterFullScreen: () => {
      if (video) {
        const videoContainer = video.parentElement as any;
        if (videoContainer) {
          if (videoContainer.requestFullscreen) {
            videoContainer.requestFullscreen();
          } else if (videoContainer.mozRequestFullScreen) {
            // Firefox
            videoContainer.mozRequestFullScreen();
          } else if (videoContainer.webkitRequestFullscreen) {
            // Chrome, Safari and Opera
            videoContainer.webkitRequestFullscreen();
          } else if (videoContainer.msRequestFullscreen) {
            // IE/Edge
            videoContainer.msRequestFullscreen();
          }
        }
      }
    },
    exitFullScreen: () => {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    },
  };

  if (typePlayer === ETypePlayer.SHAKA) {
    apiPlayer.addEventListener = (evtName: EEVentName, clb: (data: any) => any) => {
      switch (evtName) {
        case EEVentName.PLAY:
          video &&
            video.addEventListener(evtName, (data: any) => {
              const dataConvert = convertDataEventPlay(data);
              clb(dataConvert);
            });
          break;
        case EEVentName.PAUSE:
          video &&
            video.addEventListener(evtName, (data: any) => {
              const dataConvert = convertDataEventPause(data);
              clb(dataConvert);
            });
          break;
        case EEVentName.LOADED:
          player.addEventListener(evtName, (data: any) => {
            const dataConvert = convertDataEventLoaded(data);
            clb(dataConvert);
          });
          break;
        case EEVentName.ERROR:
          player.addEventListener(evtName, (data: any) => {
            const dataConvert = convertDataEventError(data);
            clb(dataConvert);
          });
          break;
        case EEVentName.FULLSCREENCHANGE:
          document.addEventListener(evtName, (data: any) => {
            const dataConvert = convertDataEventFullScreenChange(data);
            clb(dataConvert);
          });
          break;
        default:
          break;
      }
    };
    apiPlayer.removeEventListener = (evtName: EEVentName, clb: (data: any) => any) => {
      switch (evtName) {
        case EEVentName.LOADED:
          player.removeEventListener(evtName, (data: any) => {
            const dataConvert = convertDataEventLoaded(data);
            clb(dataConvert);
          });
          break;
        case EEVentName.ERROR:
          player.removeEventListener(evtName, (data: any) => {
            const dataConvert = convertDataEventError(data);
            clb(dataConvert);
          });
          break;
        default:
          break;
      }
    };

    if (version) {
      //check version
    }
  }
  return apiPlayer;
};

export const generateHtmlContentContainerString = (classes: ReturnType<typeof generateStyles>) => {
  return `
    <div class=${classes.controllerContent}  id=${ids.smControllerContent}>
    </div>
    <div class=${classes.loadingContainer} id=${ids.smLoading}>
    </div>
    <div class=${classes.errorContainer} id=${ids.smError}>
    </div>
    `;
};
export const generateHtmlContentControllerString = (classes: ReturnType<typeof generateStyles>) => {};
