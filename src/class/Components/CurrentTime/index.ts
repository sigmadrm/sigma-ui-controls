import { IConstructorBaseProps } from '../../../type';
import { formatTime } from '../../../utils';
import BaseComponent from '../../BaseComponent';

interface IConstructorProps extends IConstructorBaseProps {}

class CurrentTime extends BaseComponent {
  constructor(props: IConstructorProps) {
    super(props);
  }

  render() {
    if (this.containerElement) {
      const timerCurrentTime = this.apiPlayer.getCurrentTime();
      this.containerElement.innerHTML =
        timerCurrentTime && !Number.isNaN(timerCurrentTime) ? `<spam>${formatTime(timerCurrentTime)}</span> ` : '00:00';
    }
  }
  registerListener() {}
  unregisterListener() {}

  hide() {}
  show() {}
}

export default CurrentTime;
