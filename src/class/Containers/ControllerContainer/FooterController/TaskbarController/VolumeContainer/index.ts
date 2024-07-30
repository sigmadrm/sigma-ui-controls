import { ids } from '../../../../../../constants';
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
    const { classes, apiPlayer } = props;
    super(props);

    this.buttonVolume = new ButtonVolume({
      id: ids.smButtonVolume,
      classes,
      apiPlayer,
      handleButtonClick: this.handleButtonClick,
    });
    this.buttonMute = new ButtonMute({
      id: ids.smButtonMute,
      classes,
      apiPlayer,
      handleButtonClick: this.handleButtonClick,
    });
    this.selectVolumeRange = new SelectVolumeRange({
      id: ids.smSelectVolumeRange,
      classes,
      apiPlayer,
    });
    apiPlayer.eventemitter.on(EEVentName.VOLUME_CHANGE, () => {
      const volume = this.apiPlayer.getVolume();
      if (volume <= 0) {
        this.buttonMute?.show();
        this.buttonVolume?.hide();
      } else {
        this.buttonMute?.hide();
        this.buttonVolume?.show();
      }
      this.selectVolumeRange?.update(volume);
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

  render(): void {
    if (this.containerElement) {
      const { classes } = this;
      const htmlString = `<div class=${classes.taskbarGroupBtn} id=${ids.smButtonVolume}></div>
      <div class=${classes.taskbarGroupBtn} id=${ids.smButtonMute}></div>
        <div class=${classes.smSelectVolumeRangeContainer} id=${ids.smSelectVolumeRange}></div>`;
      this.containerElement.innerHTML = htmlString;
    }
  }
  registerListener(): void {
    if (this.containerElement) {
      this.containerElement.addEventListener('click', (e: MouseEvent) => {
        this.handelEventClick(e);
      });

      this.containerElement.addEventListener('mouseover', (e: MouseEvent) => {
        this.handelEventMouseover(e);
      });
      this.containerElement.addEventListener('mouseout', (e: MouseEvent) => {
        this.handelEventMouseout(e);
      });
    }
  }
  unregisterListener(): void {
    if (this.containerElement) {
      this.containerElement.removeEventListener('click', (e: MouseEvent) => {
        this.handelEventClick(e);
      });

      this.containerElement.removeEventListener('mouseover', (e: MouseEvent) => {
        this.handelEventMouseover(e);
      });
      this.containerElement.removeEventListener('mouseout', (e: MouseEvent) => {
        this.handelEventMouseout(e);
      });
    }
  }

  handelEventClick(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
  }
  handelEventMouseover(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (this.selectVolumeRange) {
      this.selectVolumeRange.show();
    }
  }
  handelEventMouseout(e: MouseEvent) {
    e.stopPropagation();
    if (this.selectVolumeRange) {
      this.selectVolumeRange.hide();
    }
    e.preventDefault();
  }
}
export default VolumeContainer;
