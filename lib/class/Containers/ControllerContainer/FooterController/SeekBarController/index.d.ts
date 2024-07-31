import BaseComponent from '../../../../BaseComponent';
import { IConstructorBaseProps } from '../../../../../type';
interface IConstructorProps extends IConstructorBaseProps {
}
declare class SeekBarController extends BaseComponent {
    private progressBuffer;
    private progressBar;
    private progressThumb;
    private timeoutId;
    private isPlay;
    constructor(props: IConstructorProps);
    render(): void;
    registerListener(): void;
    unregisterListener(): void;
    handleEventClick(e: MouseEvent): void;
    handleEventProgress(): void;
    handleEventTimeUpdate(): void;
    handleEventTimeLoaded(): void;
}
export default SeekBarController;
//# sourceMappingURL=index.d.ts.map