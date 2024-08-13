import { IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';
interface IConstructorProps extends IConstructorBaseProps {
}
declare class ScrubbingForward extends BaseComponent {
    private counter;
    private timerId;
    private timerIdScrubbing;
    private ripple;
    private icon;
    private text;
    constructor(props: IConstructorProps);
    render(): void;
    registerListener(): void;
    unregisterListener(): void;
    handleContainerClick(event: TouchEvent): void;
    show(): void;
    hidden(): void;
}
export default ScrubbingForward;
//# sourceMappingURL=index.d.ts.map