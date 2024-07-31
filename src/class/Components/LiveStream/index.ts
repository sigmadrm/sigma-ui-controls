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
  registerListener() {
    if (!this.containerElement) return;
    this.containerElement.onclick = (event) => this.handleContainerClick(event);
  }
  unregisterListener() {
    if (!this.containerElement) return;
    this.containerElement.onclick = () => {};
  }
  handleContainerClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

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
