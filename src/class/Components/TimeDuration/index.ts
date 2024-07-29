import { IConstructorBaseProps } from '../../../type';
import { formatTime } from '../../../utils';
import BaseComponent from '../../BaseComponent';

interface IConstructorProps extends IConstructorBaseProps {}

class TimeDuration extends BaseComponent {
  constructor(props: IConstructorProps) {
    super(props);
  }

  render() {
    const timeDuration = this.apiPlayer.getDuration();

    if (this.containerElement) {
      this.containerElement.innerHTML = `/ <spam>${formatTime(timeDuration)}</span>`;
    }
  }
  registerListener() {}
  unregisterListener() {}

  hide() {}
  show() {}
}

export default TimeDuration;
