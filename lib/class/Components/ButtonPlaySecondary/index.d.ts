import { IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';
interface IConstructorProps extends IConstructorBaseProps {
}
declare class ButtonPlaySecondary extends BaseComponent {
    constructor(props: IConstructorProps);
    render(): void;
    registerListener(): void;
    hide: () => void;
    show: () => void;
}
export default ButtonPlaySecondary;
//# sourceMappingURL=index.d.ts.map