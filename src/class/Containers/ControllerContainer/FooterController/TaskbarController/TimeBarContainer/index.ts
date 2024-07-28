import { ids } from '../../../../../../constants';
import { EEVentName, IConstructorBaseProps } from '../../../../../../type';
import BaseComponent from '../../../../../BaseComponent';
import ButtonMute from '../../../../../Components/ButtonMute';
import ButtonVolume from '../../../../../Components/ButtonVolume';
import CurrentTime from '../../../../../Components/CurrentTime';
import SelectVolumeRange from '../../../../../Components/SelectVolumeRange';
import TimeDuration from '../../../../../Components/TimeDuration';

interface IConstructorProps extends IConstructorBaseProps {}

class TimeBarContainer extends BaseComponent<IConstructorProps> {
  private currentTime: CurrentTime | undefined;
  private timeDuration: TimeDuration | undefined;

  constructor(props: IConstructorProps) {
    const { classes, apiPlayer } = props;
    super(props);

    this.currentTime = new CurrentTime({
      id: ids.smTimeCurrent,
      classes,
      apiPlayer,
    });
    this.timeDuration = new TimeDuration({
      id: ids.smTimeDuration,
      classes,
      apiPlayer,
    });

    apiPlayer.eventemitter.on(EEVentName.TIME_UPDATE, () => {
      if (this.currentTime) {
        this.currentTime.render();
      }
    });
    apiPlayer.eventemitter.on(EEVentName.LOADED_META_DATA, (e, data) => {
      if (this.timeDuration) {
        this.timeDuration.render();
      }
    });
  }

  render(): void {
    const { classes } = this;
    if (this.containerElement) {
      if (this.containerElement) {
        const htmlString = `<div class=${classes.taskbarTimeCurrent} id=${ids.smTimeCurrent}></div>
        <div class=${classes.taskbarTimeDuration} id=${ids.smTimeDuration}></div>`;
        this.containerElement.innerHTML = htmlString;
      }
    }
  }
  registerListener(): void {
    if (this.containerElement) {
      this.containerElement.addEventListener('click', (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
      });
    }
  }
  unregisterListener(): void {}
  hide() {
    if (this.containerElement) {
      this.containerElement.className = this.classes.taskbarTimeBarContainer;
    }
  }
  show() {
    if (this.containerElement) {
      this.containerElement.classList.add(this.classes.taskbarTimeBarContainerEnable);
    }
  }
}
export default TimeBarContainer;
