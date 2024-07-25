import { IConfigureUIPlayerProps, IConstructorBaseProps } from '../../../type';
interface IConstructorProps extends IConstructorBaseProps {
    videoInfo: IConfigureUIPlayerProps['videoInfo'];
}
declare class ControllerContainer {
    private id;
    private headController;
    private bodyController;
    private footerController;
    private classes;
    containerEle: HTMLElement | undefined | null;
    constructor(props: IConstructorProps);
    hide: () => void;
    show: () => void;
    hideButtonPlay: () => void;
    showButtonPlay: () => void;
}
export default ControllerContainer;
//# sourceMappingURL=index.d.ts.map