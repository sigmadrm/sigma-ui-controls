import { IConfigureUIPlayerProps, IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';
interface IConstructorProps extends IConstructorBaseProps {
    videoInfo: IConfigureUIPlayerProps['videoInfo'];
}
declare class ControllerContainer extends BaseComponent {
    private headController;
    private bodyController;
    private footerController;
    private timerId;
    constructor(props: IConstructorProps);
    render(): void;
    registerListener(): void;
    unregisterListener(): void;
    handleEvtFullScreenChange(): void;
    handleEventEnded(): void;
    handleEventPlay(): void;
    handleEventSeekBarSeeking(e: any, data: any): void;
    handleOnMouseMover(e: MouseEvent | TouchEvent): void;
    handleOnMouseover(e: MouseEvent | TouchEvent): void;
    handleOnMouseout(e: MouseEvent | TouchEvent): void;
    handleClickContainer(event: MouseEvent): void;
    handleEvtLoaded(): void;
    handleEvtError(): void;
    handleEvtSeeking(e: any, data: any): void;
    handleEvtScrubbing(e: any, data: any): void;
}
export default ControllerContainer;
//# sourceMappingURL=index.d.ts.map