import { IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';
import { convertDataEventError } from '../../SmApiPlayer';
interface IConstructorProps extends IConstructorBaseProps {
}
declare class ErrorContainer extends BaseComponent {
    constructor(props: IConstructorProps);
    hide(): void;
    show: (data: any) => void;
    generateHtml: (dataEvent: ReturnType<typeof convertDataEventError>) => string;
}
export default ErrorContainer;
//# sourceMappingURL=index.d.ts.map