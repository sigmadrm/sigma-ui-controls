import { settingIcon } from '../../../icons';
import { EEVentName, IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';

interface IConstructorProps extends IConstructorBaseProps {}
type TSettingIconButtonState = {
  visible: boolean;
};
class SettingIconButton extends BaseComponent<TSettingIconButtonState> {
  constructor(props: IConstructorProps) {
    super(props, { visible: false });
  }

  render() {
    const { classes } = this;
    const { visible } = this.state;
    if (this.containerElement) {
      this.containerElement.innerHTML = settingIcon;
      this.containerElement.style.display = 'block';
      this.containerElement.className = `${classes.taskbarGroupBtn} ${visible ? classes.taskbarIconActive : ''}`;
    }
  }
  registerListener() {
    if (this.containerElement) {
      this.containerElement.onclick = (event) => this.handleContainerClick(event);
    }
    this.apiPlayer.eventemitter.on(EEVentName.SETTING_PANEL_BLUR, this.handleSettingPanelBlur, this);
  }
  unregisterListener() {
    if (!this.containerElement) return;
    this.apiPlayer.eventemitter.on(EEVentName.SETTING_PANEL_BLUR, this.handleSettingPanelBlur, this);
  }

  handleSettingPanelBlur() {
    this.state = { ...this.state, visible: false };
  }

  handleContainerClick(event: MouseEvent) {
    const { apiPlayer } = this;
    event.preventDefault();
    event.stopPropagation();
    this.state = { ...this.state, visible: !this.state.visible };
    apiPlayer.eventemitter.trigger(EEVentName.SETTING_PANEL_VISIBLE, { visible: this.state.visible });
  }
}

export default SettingIconButton;
