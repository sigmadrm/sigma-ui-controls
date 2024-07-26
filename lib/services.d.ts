import { ETypePlayer } from './constants';
import generateStyles from './style';
import { EEVentName, IApiPlayer } from './type';
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
export declare const convertDataEventPause: (data: any) => {
    event: EEVentName;
    data: any;
};
export declare const convertDataEventFullScreenChange: (data: any) => {
    event: EEVentName;
    data: any;
};
export declare const createElementFromHTML: (htmlString: string) => ChildNode | null;
export declare const generateApiPlayer: (player: any, video: HTMLVideoElement | null | undefined, typePlayer: ETypePlayer, version?: string) => IApiPlayer;
export declare const generateHtmlContentContainerString: (classes: ReturnType<typeof generateStyles>) => string;
export declare const generateHtmlContentControllerString: (classes: ReturnType<typeof generateStyles>) => void;
//# sourceMappingURL=services.d.ts.map