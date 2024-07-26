import { IConstructorBaseProps } from '../../../../../type';
import BaseComponent from '../../../../BaseComponent';
interface IConstructorProps extends IConstructorBaseProps {
}
declare class TaskbarController extends BaseComponent {
    private buttonFullScreen;
    private buttonPlaySecondary;
    private buttonPauseSecondary;
    private buttonVolume;
    private buttonMute;
    private buttonExitFullScreen;
    constructor(props: IConstructorProps);
    render(): void;
}
export default TaskbarController;
//# sourceMappingURL=index.d.ts.map