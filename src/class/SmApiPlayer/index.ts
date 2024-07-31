/* eslint-disable no-restricted-properties */
import { ETypePlayer } from '../../constants';
import { EEVentName, Track } from '../../type';
import SmEventEmitter from '../SmEventEmitter/SmEventEmitter';

export default class SmApiPlayer {
  public player: any;
  public video?: HTMLVideoElement;
  public typePlayer: ETypePlayer;
  public version?: string;
  public eventemitter: SmEventEmitter;

  constructor(props: { player: any; video?: HTMLVideoElement; typePlayer: ETypePlayer; version?: string }) {
    this.player = props.player;
    this.video = props.video;
    this.typePlayer = props.typePlayer;
    this.version = props.version;
    this.eventemitter = new SmEventEmitter();

    this.emitTracksChangeEvent = this.emitTracksChangeEvent.bind(this);
    this.emitRateChange = this.emitRateChange.bind(this);

    this.registerListener();
  }

  registerListener() {
    const { player } = this;
    player.addEventListener('adaptation', this.emitTracksChangeEvent);
    player.addEventListener('variantchanged', this.emitTracksChangeEvent);
    player.addEventListener('abrstatuschanged', this.emitTracksChangeEvent);
    player.addEventListener('trackschanged', this.emitTracksChangeEvent);
    this.video?.addEventListener('ratechange', this.emitRateChange);
  }

  unregisterListener() {
    const { player } = this;
    player.addEventListener('adaptation', this.emitTracksChangeEvent);
    player.addEventListener('variantchanged', this.emitTracksChangeEvent);
    player.addEventListener('abrstatuschanged', this.emitTracksChangeEvent);
    player.addEventListener('trackschanged', this.emitTracksChangeEvent);
    this.video?.removeEventListener('ratechange', this.emitRateChange);
  }

  getVariantTracks(): { tracks: Track[] } {
    const tracks = this.player.getVariantTracks();
    const selectedTrack = tracks.find((track) => track.active);
    let filteredTracks = tracks;

    if (selectedTrack) {
      filteredTracks = tracks.filter(
        (track) => track.language === selectedTrack.language && track.channelsCount === selectedTrack.channelsCount,
      );
    }
    filteredTracks = filteredTracks.filter((track, idx) => {
      if (track.height === 0 || track.width === 0) return false; // only video tracks
      const otherIdx = this.player.isAudioOnly()
        ? filteredTracks.findIndex((t) => t.bandwidth === track.bandwidth)
        : filteredTracks.findIndex((t) => t.height === track.height);
      return otherIdx === idx; // only select video track
    });
    filteredTracks.sort((t1, t2) => t2.height - t1.height);
    const isAuto = this.player.getConfiguration().abr.enabled;
    const autoTrack: Track = {
      id: -1,
      label: 'Auto',
      bandwidth: 0,
      active: isAuto || !filteredTracks.length,
    };
    return { tracks: [...filteredTracks, autoTrack] };
  }

  selectVariantTrack(track: Track) {
    if (track.id === -1) {
      // Enable ABR (Adaptive Bitrate)
      this.player.configure({ abr: { enabled: true } });
    } else {
      this.player.configure({ abr: { enabled: false } });
      this.player.selectVariantTrack(track, /* clearBuffer= */ false);
    }
  }

  emitTracksChangeEvent() {
    const data = this.getVariantTracks();
    this.eventemitter.trigger(EEVentName.TRACKS_CHANGED, data);
  }

  emitRateChange() {
    const playbackRate = this.video?.playbackRate || 0;
    this.eventemitter.trigger(EEVentName.RATE_CHANGE, { playbackRate });
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

  set playbackRate(value: number) {
    if (this.video) {
      this.video.playbackRate = value;
    }
  }

  get playbackRate(): number {
    return this.video?.playbackRate || 1;
  }

  updateVolume(value: number) {
    const { video } = this;
    if (video) {
      return (video.volume = value);
    }
  }

  getVolume() {
    const { video } = this;
    if (video) {
      return video.volume;
    }
    return 0;
  }

  getDuration() {
    const { video } = this;
    if (video) {
      return video.duration;
    }
    return 0;
  }
  getCurrentTime() {
    const { video } = this;
    if (video) {
      return video.currentTime;
    }
    return 0;
  }
  isLive() {
    const { player } = this;
    return player?.isLive();
  }
  getProgress() {
    const { video } = this;
    if (video) {
      return (video.currentTime / video.duration) * 100;
    }
    return 0;
  }
  getBuffering() {
    const { video } = this;
    if (video) {
      if (video.buffered.length > 0) {
        const bufferEnd = video.buffered.end(video.buffered.length - 1);
        const bufferedProgress = (bufferEnd / video.duration) * 100;
        return bufferedProgress;
      }
      return 0;
    }
    return 0;
  }
  setCurrentTime(time: number) {
    const { video } = this;
    if (video) {
      video.currentTime = time;
    }
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
        case EEVentName.FULL_SCREEN_CHANGE:
          document.addEventListener(evtName, (data: any) => {
            const dataConvert = convertDataEventFullScreenChange(data);
            clb.call(context, dataConvert);
          });
          break;
        case EEVentName.ADAPTATION:
        case EEVentName.TRACKS_CHANGED:
        case EEVentName.ABR_STATUS_CHANGED:
        case EEVentName.VARIANT_CHANGED:
          player.addEventListener(evtName, (data: any) => {
            clb.call(context, data);
          });
          break;
        case EEVentName.VOLUME_CHANGE:
          if (video) {
            video.addEventListener(evtName, (data: any) => {
              const dataConvert = convertDataEventVolumeChange(data);
              clb.call(context, dataConvert);
            });
          }
          break;
        case EEVentName.TIME_UPDATE:
          if (video) {
            video.addEventListener(evtName, (data: any) => {
              const dataConvert = convertDataEventTimeUpdate(data);
              clb.call(context, dataConvert);
            });
          }
          break;
        case EEVentName.LOADED_META_DATA:
          if (video) {
            video.addEventListener(evtName, (data: any) => {
              const dataConvert = convertDataEventLoadedMetaData(data);
              clb.call(context, dataConvert);
            });
          }
          break;
        case EEVentName.PROGRESS:
          if (video) {
            video.addEventListener(evtName, (data: any) => {
              const dataConvert = convertDataEventProgress(data);
              clb.call(context, dataConvert);
            });
          }
          break;
        case EEVentName.ENDED:
          if (video) {
            video.addEventListener(evtName, (data: any) => {
              const dataConvert = convertDataEventEnded(data);
              clb.call(context, dataConvert);
            });
          }
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
export const convertDataEventVolumeChange = (data: any) => {
  return {
    event: EEVentName.VARIANT_CHANGED,
    data: {
      ...data,
    },
  };
};
export const convertDataEventTimeUpdate = (data: any) => {
  return {
    event: EEVentName.TIME_UPDATE,
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
    event: EEVentName.FULL_SCREEN_CHANGE,
    data: {
      ...data,
    },
  };
};
export const convertDataEventLoadedMetaData = (data: any) => {
  return {
    event: EEVentName.LOADED_META_DATA,
    data: {
      ...data,
    },
  };
};
export const convertDataEventProgress = (data: any) => {
  return {
    event: EEVentName.PROGRESS,
    data: {
      ...data,
    },
  };
};
export const convertDataEventEnded = (data: any) => {
  return {
    event: EEVentName.ENDED,
    data: {
      ...data,
    },
  };
};
