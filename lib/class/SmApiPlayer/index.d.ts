import { ETypePlayer } from '../../constants';
import { EEVentName, Track } from '../../type';
import SmEventEmitter from '../SmEventEmitter/SmEventEmitter';
export default class SmApiPlayer {
    player: any;
    video?: HTMLVideoElement;
    typePlayer: ETypePlayer;
    version?: string;
    eventemitter: SmEventEmitter;
    constructor(props: {
        player: any;
        video?: HTMLVideoElement;
        typePlayer: ETypePlayer;
        version?: string;
    });
    registerListener(): void;
    unregisterListener(): void;
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
//# sourceMappingURL=index.d.ts.map