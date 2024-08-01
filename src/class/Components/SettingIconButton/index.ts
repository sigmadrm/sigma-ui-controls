import { settingIcon } from '../../../icons';
import { EEVentName, ESettingPanelDataState, IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';

interface IConstructorProps extends IConstructorBaseProps {}
type TSettingIconButtonState = {
  active: boolean;
};
class SettingIconButton extends BaseComponent<TSettingIconButtonState> {
  constructor(props: IConstructorProps) {
    super(props, { active: false });
    this.handleSettingPanelVisible = this.handleSettingPanelVisible.bind(this);
  }

  render() {
    const { classes } = this;
    const { active } = this.state;
    if (this.containerElement) {
      this.containerElement.innerHTML = settingIcon;
      this.containerElement.style.display = 'block';
      this.containerElement.style.setProperty('--animate-duration', '1s');
      if (active) {
        this.containerElement.className = `${classes.taskbarGroupBtn} ${classes.taskbarIconActive}`;
      } else {
        this.containerElement.className = `${classes.taskbarGroupBtn} ${classes.taskbarIconInactive}`;
      }
    }
  }
  registerListener() {
    if (!this.containerElement) return;
    this.containerElement.onclick = (event) => this.handleContainerClick(event);
    this.apiPlayer.eventemitter.on(EEVentName.SETTING_PANEL_VISIBLE, this.handleSettingPanelVisible, this);
  }
  unregisterListener() {
    if (!this.containerElement) return;
    this.containerElement.onclick = () => {};
    this.apiPlayer.eventemitter.off(EEVentName.SETTING_PANEL_VISIBLE, this.handleSettingPanelVisible, this);
  }

  handleSettingPanelVisible(event, data) {
    const { visible } = data;
    this.state = { ...this.state, active: visible };
  }

  handleContainerClick(event: MouseEvent) {
    const { apiPlayer } = this;
    event.preventDefault();
    event.stopPropagation();
    const visible = !this.state.active;
    this.containerElement?.setAttribute(
      'data-state',
      visible ? ESettingPanelDataState.OPENED : ESettingPanelDataState.CLOSED,
    );
    apiPlayer.eventemitter.trigger(EEVentName.SETTING_PANEL_VISIBLE, { visible });
  }
}

export default SettingIconButton;
