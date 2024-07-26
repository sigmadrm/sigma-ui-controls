import { IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';
interface IConstructorProps extends IConstructorBaseProps {
}
declare class ButtonPauseSecondary extends BaseComponent {
    constructor(props: IConstructorProps);
    render(): void;
    registerListener(): void;
    unregisterListener(): void;
    handleContainerClick(event: MouseEvent): void;
    hide: () => void;
    show: () => void;
}
export default ButtonPauseSecondary;
//# sourceMappingURL=index.d.ts.map