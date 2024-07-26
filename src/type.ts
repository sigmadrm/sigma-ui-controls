import SmEventEmitter from './class/SmEventEmitter/SmEventEmitter';
import { ETypePlayer } from './constants';
import generateStyles from './style';

export interface IConfigureUIPlayerProps {
  player: any;
  video: HTMLVideoElement | null | undefined;
  idVideoContainer: string;
  typePlayer?: ETypePlayer;
  version?: string;
  videoInfo?: {
    name?: string;
  };

  style?: {
    primaryColor?: string;
    logo?: string;
  };
}
export type TGenerateStylesProps = IConfigureUIPlayerProps['style'];

export enum EEVentName {
  LOADED = 'loaded',
  ERROR = 'error',
  PLAY = 'play',
  PAUSE = 'pause',
  FULLSCREENCHANGE = 'fullscreenchange',
}
export interface IApiPlayer {
  method: {
    play: () => void;
    pause: () => void;
    isPlay: () => boolean;
    isFullScreen: () => boolean;
    enterFullScreen: () => void;
    exitFullScreen: () => void;
  };
  eventemitter: SmEventEmitter;
  addEventListener: (evtName: EEVentName, clb: (data: any) => any) => void;
  removeEventListener: (evtName: EEVentName, clb: (data: any) => any) => void;
}

export type TClasses = ReturnType<typeof generateStyles>;
export interface IConstructorBaseProps {
  id: string;
  classes: TClasses;
  apiPlayer: IApiPlayer;
}
export interface smListeners {
  [EEVentName.LOADED]: {
    event: EEVentName.LOADED;
    data: { [key: string]: any };
  };
  [EEVentName.PAUSE]: {
    event: EEVentName.PAUSE;
    data: { [key: string]: any };
  };
  [EEVentName.PLAY]: {
    event: EEVentName.PLAY;
    data: { [key: string]: any };
  };
  [EEVentName.ERROR]: {
    event: EEVentName.ERROR;
    data: { [key: string]: any };
  };
  [EEVentName.FULLSCREENCHANGE]: {
    event: EEVentName.FULLSCREENCHANGE;
    data: { [key: string]: any };
  };
}
export interface smEventEmitter {
  on<E extends keyof smListeners, Context = undefined>(event: E, listener: smListeners[E], context?: Context): void;
  // once<E extends keyof smListeners, Context = undefined>(event: E, listener: smListeners[E], context?: Context): void;

  // removeAllListeners<E extends keyof smListeners>(event?: E): void;
  // off<E extends keyof smListeners, Context = undefined>(
  //   event: E,
  //   listener?: smListeners[E],
  //   context?: Context,
  //   once?: boolean,
  // ): void;

  // listeners<E extends keyof smListeners>(event: E): smListeners[E][];
  emit<E extends keyof smListeners>(event: E, data: smListeners[E]['data']): boolean;
  // listenerCount<E extends keyof smListeners>(event: E): number;
}
