import BaseComponent from '../../../BaseComponent';
import { IConstructorBaseProps } from '../../../../type';
interface IConstructorProps extends IConstructorBaseProps {
}
declare class BodyController extends BaseComponent {
    private buttonPrimary;
    private settingsController;
    constructor(props: IConstructorProps);
    render(): void;
    destroy(): void;
}
export default BodyController;
//# sourceMappingURL=index.d.ts.map