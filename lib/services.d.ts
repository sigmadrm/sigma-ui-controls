import { ETypePlayer } from './constants';
import generateStyles from './style';
export declare const convertDataEventLoaded: (data: any) => any;
export declare const convertDataEventError: (data: any) => {
    errorCode: any;
    message: any;
};
export declare const convertDataEventPlay: (data: any) => any;
export declare const convertDataEventPause: (data: any) => any;
export declare const convertDataEventFullScreenChange: (data: any) => any;
export declare const createElementFromHTML: (htmlString: string) => ChildNode | null;
export declare const generateApiPlayer: (player: any, video: HTMLVideoElement | null | undefined, typePlayer: ETypePlayer, version?: string) => {
    [key: string]: any;
};
export declare const generateHtmlContentContainerString: (classes: ReturnType<typeof generateStyles>) => string;
export declare const generateHtmlContentControllerString: (classes: ReturnType<typeof generateStyles>) => void;
//# sourceMappingURL=services.d.ts.map