import SmApiPlayer from './class/SmApiPlayer';
import { ETypePlayer } from './constants';
import generateStyles from './style';
export interface IConfigureUIPlayerProps {
    player: any;
    video?: HTMLVideoElement;
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
    FULL_SCREEN_CHANGE = "fullscreenchange",
    LOADING = "loading",
    TRACKS_CHANGED = "trackschanged",
    ADAPTATION = "adaptation",
    RATE_CHANGE = "ratechange",
    SETTING_PANEL_VISIBLE = "settingPanelVisible",
    VARIANT_CHANGED = "variantchanged",
    ABR_STATUS_CHANGED = "abrstatuschanged",
    VOLUME_CHANGE = "volumechange",
    TIME_UPDATE = "timeupdate",
    LOADED_META_DATA = "loadedmetadata",
    PROGRESS = "progress",
    ENDED = "ended",
    WAITING = "waiting",
    PLAYING = "playing"
}
export declare const RESOLUTION_LABEL: {
    AUTO: string;
    SD: string;
    HD: string;
    FullHD: string;
    '2K': string;
    '4K': string;
    '8K': string;
};
export type TClasses = ReturnType<typeof generateStyles>;
export interface IConstructorBaseProps {
    id: string;
    classes: TClasses;
    apiPlayer: SmApiPlayer;
}
export interface SmListeners {
    [EEVentName.LOADED]: (event: EEVentName.LOADED, data: {
        [key: string]: any;
    }) => void;
    [EEVentName.PAUSE]: (event: EEVentName.PAUSE, data: {
        [key: string]: any;
    }) => void;
    [EEVentName.PLAY]: (event: EEVentName.PLAY, data: {
        [key: string]: any;
    }) => void;
    [EEVentName.ERROR]: (event: EEVentName.ERROR, data: {
        [key: string]: any;
    }) => void;
    [EEVentName.FULL_SCREEN_CHANGE]: (event: EEVentName.FULL_SCREEN_CHANGE, data: {
        [key: string]: any;
    }) => void;
    [EEVentName.TRACKS_CHANGED]: (event: EEVentName.TRACKS_CHANGED, data: {
        tracks: Track[];
    }) => void;
    [EEVentName.RATE_CHANGE]: (event: EEVentName.RATE_CHANGE, data: {
        playbackRate: number;
    }) => void;
    [EEVentName.SETTING_PANEL_VISIBLE]: (event: EEVentName.SETTING_PANEL_VISIBLE, data: {
        visible: boolean;
    }) => void;
    [EEVentName.VOLUME_CHANGE]: (event: EEVentName.VOLUME_CHANGE, data: {
        [key: string]: any;
    }) => void;
    [EEVentName.TIME_UPDATE]: (event: EEVentName.TIME_UPDATE, data: {
        [key: string]: any;
    }) => void;
    [EEVentName.LOADED_META_DATA]: (event: EEVentName.LOADED_META_DATA, data: {
        [key: string]: any;
    }) => void;
    [EEVentName.PROGRESS]: (event: EEVentName.PROGRESS, data: {
        [key: string]: any;
    }) => void;
    [EEVentName.ENDED]: (event: EEVentName.ENDED, data: {
        [key: string]: any;
    }) => void;
    [EEVentName.WAITING]: (event: EEVentName.WAITING, data: {
        [key: string]: any;
    }) => void;
    [EEVentName.PLAYING]: (event: EEVentName.PLAYING, data: {
        [key: string]: any;
    }) => void;
}
declare enum AccessibilityPurpose {
    HARD_OF_HEARING = "hard of hearing",
    VISUALLY_IMPAIRED = "visually impaired"
}
export type Track = {
    accessibilityPurpose?: AccessibilityPurpose | null;
    active?: boolean;
    audioBandwidth?: number | null;
    audioCodec?: string | null;
    audioId?: number | null;
    audioMimeType?: string | null;
    audioRoles?: string[] | null;
    audioSamplingRate?: number | null;
    bandwidth: number;
    channelsCount?: number | null;
    codecs?: string | null;
    colorGamut?: string | null;
    forced?: boolean;
    frameRate?: number | null;
    hdr?: string | null;
    height?: number | null;
    id?: number;
    kind?: string | null;
    label?: string | null;
    language?: string;
    mimeType?: string | null;
    originalAudioId?: string | null;
    originalImageId?: string | null;
    originalLanguage?: string | null;
    originalTextId?: string | null;
    originalVideoId?: string | null;
    pixelAspectRatio?: string | null;
    primary?: boolean;
    roles?: string[];
    spatialAudio?: boolean;
    tilesLayout?: string | null;
    type?: string;
    videoBandwidth?: number | null;
    videoCodec?: string | null;
    videoId?: number | null;
    videoLayout?: string | null;
    videoMimeType?: string | null;
    width?: number | null;
};
export interface ISmEventEmitter {
    on<E extends keyof SmListeners, Context = undefined>(event: E, listener: SmListeners[E], context?: Context): void;
    once<E extends keyof SmListeners, Context = undefined>(event: E, listener: SmListeners[E], context?: Context): void;
    removeAllListeners<E extends keyof SmListeners>(event?: E): void;
    off<E extends keyof SmListeners, Context = undefined>(event: E, listener?: SmListeners[E], context?: Context, once?: boolean): void;
    listeners<E extends keyof SmListeners>(event: E): SmListeners[E][];
    emit<E extends keyof SmListeners>(event: E, name: E, eventObject: Parameters<SmListeners[E]>[1]): boolean;
    listenerCount<E extends keyof SmListeners>(event: E): number;
}
export {};
//# sourceMappingURL=type.d.ts.map