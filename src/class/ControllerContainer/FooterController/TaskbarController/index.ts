import generateStyles from '../../../../style';
import { IConstructorBaseProps } from '../../../../type';
import { generateHtmlTaskbarControllerString } from '../../services';

interface IConstructorProps extends IConstructorBaseProps {}

class TaskbarController {
  private id: string;
  private classes: ReturnType<typeof generateStyles>;

  containerEle: HTMLElement | undefined | null;
  constructor(props: IConstructorProps) {
    const { id, classes } = props;
    this.id = id;
    this.classes = classes;

    const ele = document.getElementById(id);
    this.containerEle = ele;
    const htmlString = generateHtmlTaskbarControllerString(classes);
    if (ele) {
      ele.innerHTML = htmlString;
    }
  }
}

export default TaskbarController;
