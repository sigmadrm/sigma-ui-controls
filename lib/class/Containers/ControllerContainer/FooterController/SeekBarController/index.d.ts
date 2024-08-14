import BaseComponent from '../../../../BaseComponent';
import { IConstructorBaseProps } from '../../../../../type';
interface IConstructorProps extends IConstructorBaseProps {
}
declare class SeekBarController extends BaseComponent {
    private progressBuffer;
    private progressBar;
    private progressThumb;
    private duration;
    constructor(props: IConstructorProps);
    render(): void;
    registerListener(): void;
    unregisterListener(): void;
    handleEventClick(e: MouseEvent): void;
    handleEventProgress(): void;
    handleEventTimeUpdate(): void;
    handleEventLoaded(): void;
    handleEventSeeking(e: any, data: any): void;
}
export default SeekBarController;
//# sourceMappingURL=index.d.ts.map