import BaseComponent from '../../../../BaseComponent';
import { IConstructorBaseProps } from '../../../../../type';
interface IConstructorProps extends IConstructorBaseProps {
}
declare class SeekBarController extends BaseComponent {
    private progressBuffer;
    private progressBar;
    private progressThumb;
    constructor(props: IConstructorProps);
    render(): void;
    registerListener(): void;
    unregisterListener(): void;
}
export default SeekBarController;
//# sourceMappingURL=index.d.ts.map