import BaseComponent from '../../../BaseComponent';
import { IConfigureUIPlayerProps, IConstructorBaseProps } from '../../../../type';

interface IConstructorProps extends IConstructorBaseProps {
  videoInfo: IConfigureUIPlayerProps['videoInfo'];
}

class HeadController extends BaseComponent {
  private videoInfo: IConfigureUIPlayerProps['videoInfo'];

  constructor(props: IConstructorProps) {
    const { videoInfo, ...baseProps } = props;
    super(baseProps as IConstructorBaseProps);
    this.videoInfo = videoInfo;
  }

  render() {
    if (this.containerElement) {
      const videoName = this.videoInfo?.name ?? '';
      const { classes } = this;
      const htmlString = `${videoName && `<p class=${classes.headControllerTitle}>${videoName}</p>`}`;
      this.containerElement.innerHTML = htmlString;
    }
  }
}

export default HeadController;
