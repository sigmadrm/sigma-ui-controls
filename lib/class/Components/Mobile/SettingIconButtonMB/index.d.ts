import { IConstructorBaseProps } from '../../../../type';
import BaseComponent from '../../../BaseComponent';
interface IConstructorProps extends IConstructorBaseProps {
}
type TSettingIconButtonMBState = {
    active: boolean;
};
declare class SettingIconButtonMB extends BaseComponent<TSettingIconButtonMBState> {
    constructor(props: IConstructorProps);
    render(): void;
    registerListener(): void;
    unregisterListener(): void;
    handleSettingPanelVisible(event: any, data: any): void;
    handleContainerClick(event: MouseEvent): void;
}
export default SettingIconButtonMB;
//# sourceMappingURL=index.d.ts.map