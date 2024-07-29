import { IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';
interface IConstructorProps extends IConstructorBaseProps {
}
declare class SelectVolumeRange extends BaseComponent {
    constructor(props: IConstructorProps);
    render(): void;
    update(value: number): void;
    registerListener(): void;
    updateSliderHighlight(volume: number): void;
    unregisterListener(): void;
    hide: () => void;
    show: () => void;
}
export default SelectVolumeRange;
//# sourceMappingURL=index.d.ts.map