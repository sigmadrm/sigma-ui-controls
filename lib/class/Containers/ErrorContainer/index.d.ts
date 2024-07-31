import { IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';
import { convertDataEventError } from '../../SmApiPlayer';
interface IConstructorProps extends IConstructorBaseProps {
}
declare class ErrorContainer extends BaseComponent {
    constructor(props: IConstructorProps);
    registerListener(): void;
    unregisterListener(): void;
    handelEventLoaded(): void;
    handelEventError(event: any, data: any): void;
    hide(): void;
    show: (data: any) => void;
    generateHtml: (dataEvent: ReturnType<typeof convertDataEventError>) => string;
}
export default ErrorContainer;
//# sourceMappingURL=index.d.ts.map