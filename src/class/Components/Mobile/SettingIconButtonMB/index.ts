import { settingIcon } from '../../../../icons';
import { EEVentName, IConstructorBaseProps } from '../../../../type';
import BaseComponent from '../../../BaseComponent';

interface IConstructorProps extends IConstructorBaseProps {}
type TSettingIconButtonMBState = {
  active: boolean;
};
class SettingIconButtonMB extends BaseComponent<TSettingIconButtonMBState> {
  constructor(props: IConstructorProps) {
    super(props, { active: false });
  }

  render() {
    if (this.containerElement) {
      this.containerElement.innerHTML = settingIcon;
    }
  }
  registerListener(): void {
    if (this.containerElement) {
      this.containerElement.ontouchend = (event: TouchEvent) => this.handleEventTouchEnd(event);
      this.containerElement.onmouseup = (event: MouseEvent) => this.handleEventMouseup(event);
    }
  }
  unregisterListener(): void {
    if (this.containerElement) {
      this.containerElement.ontouchstart = () => {};
      this.containerElement.onmouseup = () => {};
    }
  }
  handleEventTouchEnd(event: TouchEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.apiPlayer.eventemitter.trigger(EEVentName.POPUP_SETTING, { open: true });
  }
  handleEventMouseup(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.apiPlayer.eventemitter.trigger(EEVentName.POPUP_SETTING, { open: true });
  }
}

export default SettingIconButtonMB;
