import { IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';
interface IConstructorProps extends IConstructorBaseProps {
}
declare class ScrubbingRewind extends BaseComponent {
    private counter;
    private timerId;
    private timerIdScrubbing;
    private icon;
    private text;
    private ripple;
    constructor(props: IConstructorProps);
    render(): void;
    registerListener(): void;
    unregisterListener(): void;
    handleContainerClick(event: MouseEvent | TouchEvent): void;
    show(): void;
    hidden(): void;
}
export default ScrubbingRewind;
//# sourceMappingURL=index.d.ts.map