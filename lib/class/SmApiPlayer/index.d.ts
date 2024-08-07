import { ETypePlayer } from '../../constants';
import { EDeviceType, EEVentName, Track } from '../../type';
import SmEventEmitter from '../SmEventEmitter/SmEventEmitter';
export default class SmApiPlayer {
    player: any;
    video?: HTMLVideoElement;
    typePlayer: ETypePlayer;
    version?: string;
    eventemitter: SmEventEmitter;
    deviceType: EDeviceType;
    hasTouch: boolean;
    constructor(props: {
        player: any;
        video?: HTMLVideoElement;
        typePlayer: ETypePlayer;
        version?: string;
        deviceType: EDeviceType;
        hasTouch: boolean;
    });
    registerListener(): void;
    unregisterListener(): void;
    emitLoaded(data: any): void;
    emitError(data: any): void;
    emitPlay(data: any): void;
    emitPause(data: any): void;
    emitFullScreenChange(data: any): void;
    emitVolumeChange(data: any): void;
    emitTimeUpdate(data: any): void;
    emitLoadedMeteData(data: any): void;
    emitProgress(data: any): void;
    emitPlaying(data: any): void;
    emitEnded(data: any): void;
    emitWaiting(data: any): void;
    getVariantTracks(): {
        tracks: Track[];
    };
    selectVariantTrack(track: Track): void;
    emitTracksChangeEvent(): void;
    emitRateChange(): void;
    play(): Promise<void> | undefined;
    pause(): void;
    isPlay(): boolean;
    isFullScreen(): boolean;
    enterFullScreen(): void;
    exitFullScreen(): void;
    set playbackRate(value: number);
    get playbackRate(): number;
    updateVolume(value: number): number | undefined;
    getVolume(): number;
    getDuration(): number;
    getCurrentTime(): number;
    isLive(): any;
    getProgress(): number;
    getBuffering(): number;
    setCurrentTime(time: number): void;
    addEventListener<Context = undefined>(evtName: EEVentName, clb: (data: any) => any, context?: Context): void;
    removeEventListener<Context = undefined>(evtName: EEVentName, clb: (data: any) => any, context?: Context): void;
    destroy(): void;
}
export declare const convertDataEventLoaded: (data: any) => {
    event: EEVentName;
    data: any;
};
export declare const convertDataEventError: (data: any) => {
    event: EEVentName;
    data: {
        errorCode: any;
        message: any;
    };
};
export declare const convertDataEventPlay: (data: any) => {
    event: EEVentName;
    data: any;
};
export declare const convertDataEventVolumeChange: (data: any) => {
    event: EEVentName;
    data: any;
};
export declare const convertDataEventTimeUpdate: (data: any) => {
    event: EEVentName;
    data: any;
};
export declare const convertDataEventPause: (data: any) => {
    event: EEVentName;
    data: any;
};
export declare const convertDataEventFullScreenChange: (data: any) => {
    event: EEVentName;
    data: any;
};
export declare const convertDataEventLoadedMetaData: (data: any) => {
    event: EEVentName;
    data: any;
};
export declare const convertDataEventProgress: (data: any) => {
    event: EEVentName;
    data: any;
};
export declare const convertDataEventEnded: (data: any) => {
    event: EEVentName;
    data: any;
};
export declare const convertDataEventWaiting: (data: any) => {
    event: EEVentName;
    data: any;
};
export declare const convertDataEventPlaying: (data: any) => {
    event: EEVentName;
    data: any;
};
//# sourceMappingURL=index.d.ts.map