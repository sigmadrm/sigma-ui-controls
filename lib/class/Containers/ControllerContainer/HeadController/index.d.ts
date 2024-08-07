import BaseComponent from '../../../BaseComponent';
import { IConstructorBaseProps } from '../../../../type';
interface IConstructorProps extends IConstructorBaseProps {
}
declare class HeadController extends BaseComponent {
    private settingIconButton;
    constructor(props: IConstructorProps);
    render(): void;
    registerListener(): void;
    unregisterListener(): void;
    handelEventClick: (e: MouseEvent) => void;
    hidden(): void;
    show(): void;
}
export default HeadController;
//# sourceMappingURL=index.d.ts.map