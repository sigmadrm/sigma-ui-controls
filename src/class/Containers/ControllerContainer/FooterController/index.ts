import { ids } from '../../../../constants';
import generateStyles from '../../../../style';
import { IApiPlayer, IConstructorBaseProps } from '../../../../type';
import { generateHtmlFooterControllerString } from '../services';
import SeekBarController from './SeekBarController';
import TaskbarController from './TaskbarController';

interface IConstructorProps extends IConstructorBaseProps {
  apiPlayer: IApiPlayer;
}

class FooterController {
  private id: string;
  private classes: ReturnType<typeof generateStyles>;
  private seekBarController: SeekBarController | undefined;
  private taskbarController: TaskbarController | undefined;

  containerEle: HTMLElement | undefined | null;
  constructor(props: IConstructorProps) {
    const { id, classes, apiPlayer } = props;
    this.id = id;
    this.classes = classes;
    const ele = document.getElementById(id);
    this.containerEle = ele;
    const htmlString = generateHtmlFooterControllerString(classes);
    if (ele) {
      ele.innerHTML = htmlString;
    }

    this.seekBarController = new SeekBarController({
      id: ids.smSeekBarController,
      classes,
      apiPlayer,
    });
    this.taskbarController = new TaskbarController({
      id: ids.smTaskbarController,
      classes,
      apiPlayer,
    });
  }
}

export default FooterController;
