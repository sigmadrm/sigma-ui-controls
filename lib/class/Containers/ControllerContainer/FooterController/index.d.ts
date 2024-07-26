import BaseComponent from '../../../BaseComponent';
import { IApiPlayer, IConstructorBaseProps } from '../../../../type';
interface IConstructorProps extends IConstructorBaseProps {
    apiPlayer: IApiPlayer;
}
declare class FooterController extends BaseComponent {
    private seekBarController;
    private taskbarController;
    constructor(props: IConstructorProps);
    render(): void;
    handleEventPlay: () => void;
    handleEventPause: () => void;
    handleEventLoaded: () => void;
    handleEventFullScreenChange: () => void;
}
export default FooterController;
//# sourceMappingURL=index.d.ts.map