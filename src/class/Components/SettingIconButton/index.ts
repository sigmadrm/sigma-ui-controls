import { settingIcon } from '../../../icons';
import { EEVentName, ESettingPanelDataState, IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';

interface IConstructorProps extends IConstructorBaseProps {}
type TSettingIconButtonState = {
  visible: boolean;
};
class SettingIconButton extends BaseComponent<TSettingIconButtonState> {
  constructor(props: IConstructorProps) {
    super(props, { visible: false });
    this.handleSettingPanelVisible = this.handleSettingPanelVisible.bind(this);
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
    this.state = { ...this.state, visible };
  }

  handleContainerClick(event: MouseEvent) {
    const { apiPlayer } = this;
    event.preventDefault();
    event.stopPropagation();
    const visible = !this.state.visible;
    this.containerElement?.setAttribute(
      'data-state',
      visible ? ESettingPanelDataState.OPENED : ESettingPanelDataState.CLOSED,
    );
    apiPlayer.eventemitter.trigger(EEVentName.SETTING_PANEL_VISIBLE, { visible });
  }
}

export default SettingIconButton;
