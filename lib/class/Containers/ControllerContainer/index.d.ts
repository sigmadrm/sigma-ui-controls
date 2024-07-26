import { IConfigureUIPlayerProps, IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';
interface IConstructorProps extends IConstructorBaseProps {
    videoInfo: IConfigureUIPlayerProps['videoInfo'];
}
declare class ControllerContainer extends BaseComponent {
    private headController;
    private bodyController;
    private footerController;
    constructor(props: IConstructorProps);
    render(): void;
    registerListener(): void;
    unregisterListener(): void;
    handleClickContainer: (event: MouseEvent) => void;
    hide: () => void;
    show: () => void;
    handleEventPlay: () => void;
    handleEventPause: () => void;
    handleEventLoaded: () => void;
    handleEventFullScreenChange: () => void;
}
export default ControllerContainer;
//# sourceMappingURL=index.d.ts.map