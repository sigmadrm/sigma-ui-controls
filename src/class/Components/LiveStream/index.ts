import { IConstructorBaseProps } from '../../../type';

import BaseComponent from '../../BaseComponent';

interface IConstructorProps extends IConstructorBaseProps {}

class LiveStream extends BaseComponent {
  constructor(props: IConstructorProps) {
    super(props);
  }

  render() {
    const { classes } = this;
    if (this.containerElement) {
      this.containerElement.innerHTML =
        this.containerElement.innerHTML = `<div class="${classes.liveStreamDot}"></div><spam>Trực tiếp</span>`;
    }
  }
  registerListener(): void {
    if (this.containerElement) {
      this.containerElement.addEventListener('click', (e: MouseEvent) => {
        console.log('run');
        e.preventDefault();
        e.stopPropagation();
      });
    }
  }
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
