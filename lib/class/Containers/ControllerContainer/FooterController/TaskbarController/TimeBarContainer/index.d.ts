import { IConstructorBaseProps } from '../../../../../../type';
import BaseComponent from '../../../../../BaseComponent';
interface IConstructorProps extends IConstructorBaseProps {
}
declare class TimeBarContainer extends BaseComponent<IConstructorProps> {
    private currentTime;
    private timeDuration;
    constructor(props: IConstructorProps);
    render(): void;
    registerListener(): void;
    unregisterListener(): void;
    hide(): void;
    show(): void;
}
export default TimeBarContainer;
//# sourceMappingURL=index.d.ts.map