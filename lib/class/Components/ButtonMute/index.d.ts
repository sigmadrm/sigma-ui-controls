import { IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';
interface IConstructorProps extends IConstructorBaseProps {
    handleButtonClick: (event: MouseEvent) => void;
}
declare class ButtonMute extends BaseComponent {
    private handleButtonClick;
    constructor(props: IConstructorProps);
    render(): void;
    registerListener(): void;
    unregisterListener(): void;
    hide(): void;
    show(): void;
}
export default ButtonMute;
//# sourceMappingURL=index.d.ts.map