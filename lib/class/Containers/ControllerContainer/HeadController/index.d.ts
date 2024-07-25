import { IConfigureUIPlayerProps, IConstructorBaseProps } from '../../../../type';
interface IConstructorProps extends IConstructorBaseProps {
    videoInfo: IConfigureUIPlayerProps['videoInfo'];
}
declare class HeadController {
    private id;
    private classes;
    private videoInfo;
    containerEle: HTMLElement | undefined | null;
    constructor(props: IConstructorProps);
}
export default HeadController;
//# sourceMappingURL=index.d.ts.map