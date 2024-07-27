/* eslint-disable no-restricted-properties */
import { ETypePlayer } from '../../constants';
import { EEVentName } from '../../type';
import SmEventEmitter from '../SmEventEmitter/SmEventEmitter';

export default class SmApiPlayer {
  public player: any;
  public video: HTMLVideoElement | null | undefined;
  public typePlayer: ETypePlayer;
  public version?: string;
  public eventemitter: SmEventEmitter;

  constructor(props: {
    player: any;
    video: HTMLVideoElement | null | undefined;
    typePlayer: ETypePlayer;
    version?: string;
  }) {
    this.player = props.player;
    this.video = props.video;
    this.typePlayer = props.typePlayer;
    this.version = props.version;
    this.eventemitter = new SmEventEmitter();

    this.emitTracksChangeEvent = this.emitTracksChangeEvent.bind(this);

    this.registerListener();
  }

  registerListener() {
    const { player } = this;
    player.addEventListener('adaptation', this.emitTracksChangeEvent);
    player.addEventListener('variantchanged', this.emitTracksChangeEvent);
    player.addEventListener('abrstatuschanged', this.emitTracksChangeEvent);
    player.addEventListener('trackschanged', this.emitTracksChangeEvent);
  }

  unregisterListener() {
    const { player } = this;
    player.addEventListener('adaptation', this.emitTracksChangeEvent);
    player.addEventListener('variantchanged', this.emitTracksChangeEvent);
    player.addEventListener('abrstatuschanged', this.emitTracksChangeEvent);
    player.addEventListener('trackschanged', this.emitTracksChangeEvent);
  }

  emitTracksChangeEvent() {
    const data = this.getVariantTracks();
    this.eventemitter.trigger(EEVentName.TRACKS_CHANGED, data);
  }

  play() {
    const { video } = this;
    return video?.play();
  }
  pause() {
    const { video } = this;
    video?.pause();
  }
  isPlay() {
    const { video } = this;

    if (video) {
      return !video.paused;
    }
    return false;
  }
  isFullScreen() {
    const isFullscreen = document.fullscreenElement;
    if (isFullscreen) {
      return true;
    } else {
      return false;
    }
  }
  enterFullScreen() {
    const { video } = this;

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
  }
  exitFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  getVariantTracks() {
    const tracks = this.player.getVariantTracks();
    const selectedTrack = tracks.find((track) => track.active);
    let filteredTracks = tracks;

    if (selectedTrack) {
      filteredTracks = tracks.filter(
        (track) => track.language === selectedTrack.language && track.channelsCount === selectedTrack.channelsCount,
      );
    }
    filteredTracks = filteredTracks.filter((track, idx) => {
      const otherIdx = this.player.isAudioOnly()
        ? filteredTracks.findIndex((t) => t.bandwidth === track.bandwidth)
        : filteredTracks.findIndex((t) => t.height === track.height);
      return otherIdx === idx;
    });

    if (this.player.isAudioOnly()) {
      filteredTracks.sort((t1, t2) => t1.bandwidth - t2.bandwidth);
    } else {
      filteredTracks.sort((t1, t2) => t1.height - t2.height);
    }

    const activeTrack = filteredTracks.find((track) => track.active);

    return { tracks: filteredTracks, activeTrack };
  }

  addEventListener<Context = undefined>(evtName: EEVentName, clb: (data: any) => any, context?: Context) {
    const { typePlayer, video, player, version } = this;
    if (typePlayer === ETypePlayer.SHAKA) {
      switch (evtName) {
        case EEVentName.PLAY:
          video?.addEventListener(evtName, (data: any) => {
            const dataConvert = convertDataEventPlay(data);
            clb.call(context, dataConvert);
          });
          break;
        case EEVentName.PAUSE:
          video?.addEventListener(evtName, (data: any) => {
            const dataConvert = convertDataEventPause(data);
            clb.call(context, dataConvert);
          });
          break;
        case EEVentName.LOADED:
          // TODO: check api version document
          if (version) {
            //check version
          }
          player.addEventListener(evtName, (data: any) => {
            const dataConvert = convertDataEventLoaded(data);
            clb.call(context, dataConvert);
          });
          break;
        case EEVentName.ERROR:
          player.addEventListener(evtName, (data: any) => {
            const dataConvert = convertDataEventError(data);
            clb.call(context, dataConvert);
          });
          break;
        case EEVentName.FULLSCREENCHANGE:
          document.addEventListener(evtName, (data: any) => {
            const dataConvert = convertDataEventFullScreenChange(data);
            clb.call(context, dataConvert);
          });
          break;
        default:
          break;
      }
    }
  }
  removeEventListener<Context = undefined>(evtName: EEVentName, clb: (data: any) => any, context?: Context) {
    const { player, typePlayer } = this;
    if (typePlayer === ETypePlayer.SHAKA) {
      switch (evtName) {
        case EEVentName.LOADED:
          player.removeEventListener(evtName, clb, context);
          break;
        case EEVentName.ERROR:
          player.removeEventListener(evtName, clb, context);
          break;
        default:
          player.removeEventListener(evtName, clb, context);
          break;
      }
    }
  }

  destroy() {
    this.unregisterListener();
    this.eventemitter.removeAllListeners();
  }
}

export const convertDataEventLoaded = (data: any) => {
  return {
    event: EEVentName.LOADED,
    data: {
      ...data,
    },
  };
};

export const convertDataEventError = (data: any) => {
  return {
    event: EEVentName.ERROR,
    data: {
      errorCode: data.detail.code,
      message: data.detail.message,
    },
  };
};

export const convertDataEventPlay = (data: any) => {
  return {
    event: EEVentName.PLAY,
    data: {
      ...data,
    },
  };
};

export const convertDataEventPause = (data: any) => {
  return {
    event: EEVentName.PAUSE,
    data: {
      ...data,
    },
  };
};

export const convertDataEventFullScreenChange = (data: any) => {
  return {
    event: EEVentName.FULLSCREENCHANGE,
    data: {
      ...data,
    },
  };
};
