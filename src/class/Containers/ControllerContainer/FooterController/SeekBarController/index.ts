import BaseComponent from '../../../../BaseComponent';
import { IConstructorBaseProps } from '../../../../../type';

interface IConstructorProps extends IConstructorBaseProps {}

class SeekBarController extends BaseComponent {
  constructor(props: IConstructorProps) {
    super(props);
  }

  render() {
    if (this.containerElement) {
      const htmlString = `<div>SeekBarController</div>`;
      this.containerElement.innerHTML = htmlString;
    }
  }
}

export default SeekBarController;
