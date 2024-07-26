import BaseComponent from '../../../BaseComponent';
import { IConfigureUIPlayerProps, IConstructorBaseProps } from '../../../../type';
interface IConstructorProps extends IConstructorBaseProps {
    videoInfo: IConfigureUIPlayerProps['videoInfo'];
}
declare class HeadController extends BaseComponent {
    private videoInfo;
    constructor(props: IConstructorProps);
    render(): void;
}
export default HeadController;
//# sourceMappingURL=index.d.ts.map