import { convertDataEventError } from '../../../services';
import { IConstructorBaseProps } from '../../../type';
interface IConstructorProps extends IConstructorBaseProps {
}
declare class ErrorContainer {
    private id;
    private classes;
    containerEle: HTMLElement | undefined | null;
    constructor(props: IConstructorProps);
    hide: () => void;
    show: (data: ReturnType<typeof convertDataEventError>) => void;
    generateHtml: (data: ReturnType<typeof convertDataEventError>) => string;
}
export default ErrorContainer;
//# sourceMappingURL=index.d.ts.map