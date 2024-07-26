import { convertDataEventError } from '../../../services';
import { IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';
interface IConstructorProps extends IConstructorBaseProps {
}
declare class ErrorContainer extends BaseComponent {
    constructor(props: IConstructorProps);
    hide: () => void;
    show: (data: ReturnType<typeof convertDataEventError>) => void;
    generateHtml: (data: ReturnType<typeof convertDataEventError>) => string;
    handleEventLoaded: () => void;
}
export default ErrorContainer;
//# sourceMappingURL=index.d.ts.map