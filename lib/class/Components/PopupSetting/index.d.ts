import { IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';
declare class PopupSetting extends BaseComponent {
    private popupSettingContent;
    constructor(props: IConstructorBaseProps);
    registerListener(): void;
    unregisterListener(): void;
    handleEvtPopupSetting(event: any, data: any): void;
    handleEvtClickContainer(event: TouchEvent | MouseEvent): void;
    render(): void;
}
export default PopupSetting;
//# sourceMappingURL=index.d.ts.map