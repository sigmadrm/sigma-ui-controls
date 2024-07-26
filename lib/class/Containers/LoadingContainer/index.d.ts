import BaseComponent from '../../BaseComponent';
import { IConstructorBaseProps } from '../../../type';
interface IConstructorProps extends IConstructorBaseProps {
}
declare class LoadingContainer extends BaseComponent {
    constructor(props: IConstructorProps);
    render(): void;
    hide: () => void;
    show: () => void;
}
export default LoadingContainer;
//# sourceMappingURL=index.d.ts.map