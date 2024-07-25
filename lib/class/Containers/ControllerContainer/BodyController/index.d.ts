import { IConstructorBaseProps } from '../../../../type';
interface IConstructorProps extends IConstructorBaseProps {
}
declare class BodyController {
    private id;
    private classes;
    private buttonPrimary;
    containerEle: HTMLElement | undefined | null;
    constructor(props: IConstructorProps);
    hideButtonPlay: () => void;
    showButtonPlay: () => void;
}
export default BodyController;
//# sourceMappingURL=index.d.ts.map