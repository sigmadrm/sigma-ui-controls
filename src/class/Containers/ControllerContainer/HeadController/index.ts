import BaseComponent from '../../../BaseComponent';
import { IConstructorBaseProps } from '../../../../type';
import SettingIconButtonMB from '../../../Components/Mobile/SettingIconButtonMB';

interface IConstructorProps extends IConstructorBaseProps {}

class HeadController extends BaseComponent {
  private settingIconButton: SettingIconButtonMB | undefined;
  constructor(props: IConstructorProps) {
    const { classes, apiPlayer, ids } = props;
    super(props);
    this.settingIconButton = new SettingIconButtonMB({
      id: ids.smSettingIconButtonMobile,
      classes,
      apiPlayer,
      ids,
    });
  }

  render() {
    if (this.containerElement) {
      const htmlString = `<div></div>
      <div class="${this.classes.smSettingIconButtonMB}" id="${this.ids.smSettingIconButtonMobile}"></div>`;
      this.containerElement.innerHTML = htmlString;
    }
  }
  registerListener() {
    if (this.containerElement) {
      this.containerElement.onclick = (event) => this.handelEventClick(event);
    }
  }
  unregisterListener(): void {
    if (this.containerElement) {
      this.containerElement.onclick = (event) => {};
    }
  }
  handelEventClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  hidden() {
    if (this.containerElement) {
      this.containerElement.className = this.classes.headController;
    }
  }
  show() {
    if (this.containerElement) {
      this.containerElement.classList.add(this.classes.headControllerEnable);
    }
  }
}

export default HeadController;
