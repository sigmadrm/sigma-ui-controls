import { IConstructorBaseProps } from '../../../../../type';
import BaseComponent from '../../../../BaseComponent';
interface IConstructorProps extends IConstructorBaseProps {
}
declare class TaskbarController extends BaseComponent {
    private buttonFullScreen;
    private buttonPlaySecondary;
    private buttonPauseSecondary;
    private buttonReplaySecondary;
    private volumeContainer;
    private buttonExitFullScreen;
    private settingIconButton;
    private timeBarContainer;
    private liveStream;
    constructor(props: IConstructorProps);
    render(): void;
    registerListener(): void;
    unregisterListener(): void;
    handleEventPlay(): void;
    handleEventPause(): void;
    handleEventLoaded(): void;
    handleEventFullScreen(): void;
    handleEventEnded(): void;
}
export default TaskbarController;
//# sourceMappingURL=index.d.ts.map