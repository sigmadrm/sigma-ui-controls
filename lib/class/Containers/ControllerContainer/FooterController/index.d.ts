import BaseComponent from '../../../BaseComponent';
import { IConstructorBaseProps } from '../../../../type';
import SmApiPlayer from '../../../SmApiPlayer';
interface IConstructorProps extends IConstructorBaseProps {
    apiPlayer: SmApiPlayer;
}
declare class FooterController extends BaseComponent {
    private seekBarController;
    private taskbarController;
    constructor(props: IConstructorProps);
    render(): void;
    registerListener(): void;
}
export default FooterController;
//# sourceMappingURL=index.d.ts.map