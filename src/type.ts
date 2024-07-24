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
}
export interface IApiPlayer {
  [key: string]: any;
}
export interface IConstructorBaseProps {
  id: string;
  classes: ReturnType<typeof generateStyles>;
  apiPlayer: IApiPlayer;
}
