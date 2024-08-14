import BaseComponent from '../../../BaseComponent';
import { IConstructorBaseProps } from '../../../../type';
interface IConstructorProps extends IConstructorBaseProps {
}
declare class BodyController extends BaseComponent {
    private buttonPlayPrimary;
    private buttonReplayPrimary;
    private buttonPausePrimary;
    private scrubbingRewind;
    private scrubbingForward;
    private settingsController;
    constructor(props: IConstructorProps);
    render(): void;
    registerListener(): void;
    unregisterListener(): void;
    handleEventPlay(): void;
    handleEventPause(): void;
    handleEventEnded(): void;
    handleEvtSeeking(e: any, data: any): void;
    handleEventSeekBarSeeking(e: any, data: any): void;
    show(): void;
    hidden(): void;
    destroy(): void;
}
export default BodyController;
//# sourceMappingURL=index.d.ts.map