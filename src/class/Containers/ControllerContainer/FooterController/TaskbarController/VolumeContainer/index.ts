import { EEVentName, IConstructorBaseProps } from '../../../../../../type';
import BaseComponent from '../../../../../BaseComponent';
import ButtonMute from '../../../../../Components/ButtonMute';
import ButtonVolume from '../../../../../Components/ButtonVolume';
import SelectVolumeRange from '../../../../../Components/SelectVolumeRange';

interface IConstructorProps extends IConstructorBaseProps {}

class VolumeContainer extends BaseComponent<IConstructorProps> {
  private buttonVolume: ButtonVolume | undefined;
  private buttonMute: ButtonMute | undefined;
  private selectVolumeRange: SelectVolumeRange | undefined;
  constructor(props: IConstructorProps) {
    const { classes, apiPlayer, ids } = props;
    super(props);

    this.buttonVolume = new ButtonVolume({
      id: ids.smButtonVolume,
      classes,
      apiPlayer,
      ids,
      handleButtonClick: this.handleButtonClick,
    });
    this.buttonMute = new ButtonMute({
      id: ids.smButtonMute,
      classes,
      apiPlayer,
      ids,
      handleButtonClick: this.handleButtonClick,
    });
    this.selectVolumeRange = new SelectVolumeRange({
      id: ids.smSelectVolumeRangeContainer,
      classes,
      apiPlayer,
      ids,
    });
  }
  handleButtonClick(event: MouseEvent) {
    const { apiPlayer } = this;
    event.preventDefault();
    event.stopPropagation();
    const volume = apiPlayer.getVolume();
    if (volume > 0) {
      apiPlayer.updateVolume(0);
      return;
    }
    apiPlayer.updateVolume(1);
  }
  handleEventVolumeChange() {
    const volume = this.apiPlayer.getVolume();
    if (volume <= 0) {
      this.buttonMute?.show();
      this.buttonVolume?.hide();
    } else {
      this.buttonMute?.hide();
      this.buttonVolume?.show();
    }
    this.selectVolumeRange?.update(volume);
  }
  render(): void {
    if (this.containerElement) {
      const { classes } = this;
      const htmlString = `<div class="${[this.classes.taskbarGroupBtn, this.classes.taskbarGroupBtnMobile].join(' ')}" id="${this.ids.smButtonVolume}"></div>
      <div class="${[this.classes.taskbarGroupBtn, this.classes.taskbarGroupBtnMobile].join(' ')}" id="${this.ids.smButtonMute}"></div>
      <div class=${classes.smSelectVolumeRangeContainer} id=${this.ids.smSelectVolumeRangeContainer}></div>`;
      this.containerElement.innerHTML = htmlString;
    }
  }
  registerListener(): void {
    this.apiPlayer.eventemitter.on(EEVentName.VOLUME_CHANGE, this.handleEventVolumeChange, this);
    if (this.containerElement) {
      this.containerElement.onclick = (e: MouseEvent) => {
        this.handelEventClick(e);
      };

      this.containerElement.onmouseover = (e: MouseEvent) => {
        this.handelEventMouseover(e);
      };
      this.containerElement.onmouseout = (e: MouseEvent) => {
        this.handelEventMouseout(e);
      };
    }
  }
  unregisterListener(): void {
    this.apiPlayer.eventemitter.off(EEVentName.VOLUME_CHANGE, this.handleEventVolumeChange, this);
    if (this.containerElement) {
      this.containerElement.onclick = (e: MouseEvent) => {};

      this.containerElement.onmouseover = (e: MouseEvent) => {};
      this.containerElement.onmouseout = (e: MouseEvent) => {};
    }
  }

  handelEventClick(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
  }
  handelEventMouseover(e: MouseEvent) {
    e.preventDefault();
    const selectVolumeRangeContainerEle = document.getElementById(this.ids.smSelectVolumeRangeContainer);
    if (selectVolumeRangeContainerEle) {
      selectVolumeRangeContainerEle.classList.add(this.classes.smSelectVolumeRangeContainerEnable);
    }
  }
  handelEventMouseout(e: MouseEvent) {
    e.stopPropagation();

    const selectVolumeRangeContainerEle = document.getElementById(this.ids.smSelectVolumeRangeContainer);
    if (selectVolumeRangeContainerEle) {
      selectVolumeRangeContainerEle.className = this.classes.smSelectVolumeRangeContainer;
    }
  }
}
export default VolumeContainer;
