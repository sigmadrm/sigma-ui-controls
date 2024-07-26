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
export declare enum EEVentName {
    LOADED = "loaded",
    ERROR = "error",
    PLAY = "play",
    PAUSE = "pause",
    FULLSCREENCHANGE = "fullscreenchange"
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
        data: any;
    };
    [EEVentName.PAUSE]: {
        event: EEVentName.PAUSE;
        data: any;
    };
    [EEVentName.PLAY]: {
        event: EEVentName.PLAY;
        data: any;
    };
    [EEVentName.ERROR]: {
        event: EEVentName.ERROR;
        data: any;
    };
    [EEVentName.FULLSCREENCHANGE]: {
        event: EEVentName.FULLSCREENCHANGE;
        data: any;
    };
}
//# sourceMappingURL=type.d.ts.map