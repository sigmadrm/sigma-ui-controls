import { IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';
interface IConstructorProps extends IConstructorBaseProps {
    handleButtonClick: (event: MouseEvent) => void;
}
declare class ButtonVolume extends BaseComponent {
    private handleButtonClick;
    constructor(props: IConstructorProps);
    render(): void;
    registerListener(): void;
    unregisterListener(): void;
    hide(): void;
    show(): void;
}
export default ButtonVolume;
//# sourceMappingURL=index.d.ts.map