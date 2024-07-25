import { IConstructorBaseProps } from '../../../../../type';
import { generateHtmlTaskbarControllerString } from '../../services';

import FullScreenButton from '../../../../Components/FullScreenButton';

import generateStyles from '../../../../../style';
import { ids } from '../../../../../constants';

interface IConstructorProps extends IConstructorBaseProps {}

class TaskbarController {
  private id: string;
  private classes: ReturnType<typeof generateStyles>;
  private fullScreenButton: FullScreenButton | undefined;

  containerEle: HTMLElement | undefined | null;
  constructor(props: IConstructorProps) {
    const { id, classes, apiPlayer } = props;
    this.id = id;
    this.classes = classes;

    const ele = document.getElementById(id);
    this.containerEle = ele;
    const htmlString = generateHtmlTaskbarControllerString(classes);
    if (ele) {
      ele.innerHTML = htmlString;
    }

    this.fullScreenButton = new FullScreenButton({
      id: ids.smFullScreenButton,
      classes,
      apiPlayer,
    });
  }
}

export default TaskbarController;
