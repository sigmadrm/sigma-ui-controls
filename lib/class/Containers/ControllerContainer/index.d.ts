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
    handleOnMouseMover: () => void;
    handleOnMouseover(): void;
    handleOnMouseout(): void;
    handleClickContainer: (event: MouseEvent) => void;
    hide(): void;
    show(): void;
}
export default ControllerContainer;
//# sourceMappingURL=index.d.ts.map