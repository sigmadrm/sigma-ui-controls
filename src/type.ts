import SmApiPlayer from './class/SmApiPlayer';
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
  LOADING = 'loading',
  ADAPTATION = 'adaptation',
  TRACKS_CHANGED = 'trackschanged',
  VARIANT_CHANGED = 'variantchanged',
  ABR_STATUS_CHANGED = 'abrstatuschanged',
}

export type TClasses = ReturnType<typeof generateStyles>;
export interface IConstructorBaseProps {
  id: string;
  classes: TClasses;
  apiPlayer: SmApiPlayer;
}
export interface SmListeners {
  [EEVentName.LOADED]: (event: EEVentName.LOADED, data: { [key: string]: any }) => void;
  [EEVentName.PAUSE]: (event: EEVentName.PAUSE, data: { [key: string]: any }) => void;
  [EEVentName.PLAY]: (event: EEVentName.PLAY, data: { [key: string]: any }) => void;
  [EEVentName.ERROR]: (event: EEVentName.ERROR, data: { [key: string]: any }) => void;
  [EEVentName.FULLSCREENCHANGE]: (event: EEVentName.FULLSCREENCHANGE, data: { [key: string]: any }) => void;
}
// export interface ISmEventEmitter {
//   on<E extends keyof SmListeners, Context = undefined>(event: E, listener: SmListeners[E], context?: Context): void;
//   once<E extends keyof SmListeners, Context = undefined>(event: E, listener: SmListeners[E], context?: Context): void;
//   removeAllListeners<E extends keyof SmListeners>(event?: E): void;
//   off<E extends keyof SmListeners, Context = undefined>(
//     event: E,
//     listener?: SmListeners[E],
//     context?: Context,
//     once?: boolean,
//   ): void;

//   listeners<E extends keyof SmListeners>(event: E): SmListeners[E][];
//   emit<E extends keyof SmListeners>(event: E, data: SmListeners[E]['data']): boolean;
//   listenerCount<E extends keyof SmListeners>(event: E): number;
// }

export interface ISmEventEmitter {
  on<E extends keyof SmListeners, Context = undefined>(event: E, listener: SmListeners[E], context?: Context): void;
  once<E extends keyof SmListeners, Context = undefined>(event: E, listener: SmListeners[E], context?: Context): void;
  removeAllListeners<E extends keyof SmListeners>(event?: E): void;
  off<E extends keyof SmListeners, Context = undefined>(
    event: E,
    listener?: SmListeners[E],
    context?: Context,
    once?: boolean,
  ): void;
  listeners<E extends keyof SmListeners>(event: E): SmListeners[E][];
  emit<E extends keyof SmListeners>(event: E, name: E, eventObject: Parameters<SmListeners[E]>[1]): boolean;
  listenerCount<E extends keyof SmListeners>(event: E): number;
}
