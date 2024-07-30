import BaseComponent from '../../../BaseComponent';
import { IConstructorBaseProps } from '../../../../type';
interface IConstructorProps extends IConstructorBaseProps {
}
declare class BodyController extends BaseComponent {
    private buttonPlayPrimary;
    private buttonReplayPrimary;
    private settingsController;
    constructor(props: IConstructorProps);
    render(): void;
    destroy(): void;
    registerListener(): void;
    unregisterListener(): void;
    handleEventPlay(): void;
    handleEventPause(): void;
    handleEventEnded(): void;
}
export default BodyController;
//# sourceMappingURL=index.d.ts.map