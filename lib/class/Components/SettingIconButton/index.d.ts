import { IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';
interface IConstructorProps extends IConstructorBaseProps {
}
type TSettingIconButtonState = {
    active: boolean;
};
declare class SettingIconButton extends BaseComponent<TSettingIconButtonState> {
    constructor(props: IConstructorProps);
    render(): void;
    registerListener(): void;
    unregisterListener(): void;
    handleSettingPanelVisible(event: any, data: any): void;
    handleContainerClick(event: MouseEvent): void;
}
export default SettingIconButton;
//# sourceMappingURL=index.d.ts.map