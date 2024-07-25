import { IConstructorBaseProps } from '../../../type';
interface IConstructorProps extends IConstructorBaseProps {
}
declare class LoadingContainer {
    private id;
    private classes;
    containerEle: HTMLElement | undefined | null;
    constructor(props: IConstructorProps);
    hide: () => void;
    show: () => void;
}
export default LoadingContainer;
//# sourceMappingURL=index.d.ts.map