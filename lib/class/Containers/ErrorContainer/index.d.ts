import { convertDataEventError } from '../../../services';
import { IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';
interface IConstructorProps extends IConstructorBaseProps {
}
declare class ErrorContainer extends BaseComponent {
    constructor(props: IConstructorProps);
    hide: () => void;
    show: (data: any) => void;
    generateHtml: (dataEvent: ReturnType<typeof convertDataEventError>) => string;
}
export default ErrorContainer;
//# sourceMappingURL=index.d.ts.map