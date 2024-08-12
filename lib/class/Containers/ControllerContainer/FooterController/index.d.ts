import BaseComponent from '../../../BaseComponent';
import { IConstructorBaseProps } from '../../../../type';
import SmApiPlayer from '../../../SmApiPlayer';
interface IConstructorProps extends IConstructorBaseProps {
    apiPlayer: SmApiPlayer;
}
declare class FooterController extends BaseComponent {
    private seekBarController;
    private taskbarController;
    private isInside;
    constructor(props: IConstructorProps);
    render(): void;
    registerListener(): void;
    unregisterListener(): void;
    getIsInside(): boolean | null;
    handelOnmouseover(): void;
    handelOnmouseout(): void;
    handelEventClick(e: MouseEvent): void;
    handleEvtSeeking(e: any, data: any): void;
    handleEvtScrubbing(e: any, data: any): void;
    hidden(): void;
    show(): void;
}
export default FooterController;
//# sourceMappingURL=index.d.ts.map