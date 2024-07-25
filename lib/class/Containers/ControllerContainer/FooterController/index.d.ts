import { IApiPlayer, IConstructorBaseProps } from '../../../../type';
interface IConstructorProps extends IConstructorBaseProps {
    apiPlayer: IApiPlayer;
}
declare class FooterController {
    private id;
    private classes;
    private seekBarController;
    private taskbarController;
    containerEle: HTMLElement | undefined | null;
    constructor(props: IConstructorProps);
}
export default FooterController;
//# sourceMappingURL=index.d.ts.map