import { IConfigureUIPlayerProps, IConstructorBaseProps } from '../../../../type';
import { generateHtmlHeadControllerString } from '../services';

import generateStyles from '../../../../style';

interface IConstructorProps extends IConstructorBaseProps {
  videoInfo: IConfigureUIPlayerProps['videoInfo'];
}

class HeadController {
  private id: string;
  private classes: ReturnType<typeof generateStyles>;
  private videoInfo: IConfigureUIPlayerProps['videoInfo'];

  containerEle: HTMLElement | undefined | null;
  constructor(props: IConstructorProps) {
    const { id, classes, videoInfo } = props;
    this.id = id;
    this.classes = classes;
    this.videoInfo = videoInfo;
    const ele = document.getElementById(id);
    this.containerEle = ele;
    const htmlString = generateHtmlHeadControllerString(classes, videoInfo?.name);
    if (ele) {
      ele.innerHTML = htmlString;
    }
  }
}

export default HeadController;
