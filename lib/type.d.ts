import { ETypePlayer } from './constants';
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
export interface IGenerateHtmlContentStringPros {
    videoName?: string;
}
//# sourceMappingURL=type.d.ts.map