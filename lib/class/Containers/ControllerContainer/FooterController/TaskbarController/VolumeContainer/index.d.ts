import { IConstructorBaseProps } from '../../../../../../type';
import BaseComponent from '../../../../../BaseComponent';
interface IConstructorProps extends IConstructorBaseProps {
}
declare class VolumeContainer extends BaseComponent<IConstructorProps> {
    private buttonVolume;
    private buttonMute;
    private selectVolumeRange;
    constructor(props: IConstructorProps);
    handleButtonClick(event: MouseEvent): void;
    render(): void;
    registerListener(): void;
    unregisterListener(): void;
    handelEventClick(e: MouseEvent): void;
    handelEventMouseover(e: MouseEvent): void;
    handelEventMouseout(e: MouseEvent): void;
}
export default VolumeContainer;
//# sourceMappingURL=index.d.ts.map