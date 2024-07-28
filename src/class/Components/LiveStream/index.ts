import { IConstructorBaseProps } from '../../../type';

import BaseComponent from '../../BaseComponent';

interface IConstructorProps extends IConstructorBaseProps {}

class LiveStream extends BaseComponent {
  constructor(props: IConstructorProps) {
    super(props);
  }

  render() {
    if (this.containerElement) {
      this.containerElement.innerHTML = this.containerElement.innerHTML = `<spam>Trực tiếp</span>`;
    }
  }
  registerListener() {}
  unregisterListener() {}

  hide() {
    if (this.containerElement) {
      this.containerElement.className = `${this.classes.taskbarLiveStream}`;
    }
  }
  show() {
    if (this.containerElement) {
      this.containerElement.classList.add(this.classes.taskbarLiveStreamEnable);
    }
  }
}

export default LiveStream;
