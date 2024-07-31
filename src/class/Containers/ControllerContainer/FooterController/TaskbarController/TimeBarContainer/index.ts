import { ids } from '../../../../../../constants';
import { EEVentName, IConstructorBaseProps } from '../../../../../../type';
import BaseComponent from '../../../../../BaseComponent';
import CurrentTime from '../../../../../Components/CurrentTime';
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
      this.containerElement.onclick = (e: MouseEvent) => {
        this.handleEventClick(e);
      };
    }
    this.apiPlayer.eventemitter.on(EEVentName.TIME_UPDATE, this.handleEventTimeUpdate, this);
    this.apiPlayer.eventemitter.on(EEVentName.LOADED_META_DATA, this.handleEventLoadMetaData, this);
  }
  unregisterListener(): void {
    if (this.containerElement) {
      this.containerElement.onclick = (e: MouseEvent) => {};
    }
    this.apiPlayer.eventemitter.off(EEVentName.TIME_UPDATE, this.handleEventTimeUpdate, this);
    this.apiPlayer.eventemitter.off(EEVentName.LOADED_META_DATA, this.handleEventLoadMetaData, this);
  }
  handleEventClick(event: MouseEvent) {
    if (this.currentTime) {
      this.currentTime.render();
    }
    event.preventDefault();
    event.stopPropagation();
  }
  handleEventTimeUpdate() {
    if (this.currentTime) {
      this.currentTime.render();
    }
  }
  handleEventLoadMetaData() {
    if (this.timeDuration) {
      this.timeDuration.render();
    }
  }
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
