import { IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';
interface IConstructorProps extends IConstructorBaseProps {
}
declare class ButtonFullScreen extends BaseComponent {
    constructor(props: IConstructorProps);
    render(): void;
    registerListener(): void;
    hide: () => void;
    show: () => void;
    unregisterListener(): void;
    handleContainerClick: (event: MouseEvent) => void;
}
export default ButtonFullScreen;
//# sourceMappingURL=index.d.ts.map