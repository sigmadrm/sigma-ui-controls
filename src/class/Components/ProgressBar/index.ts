import { ids } from '../../../constants';
import { IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';

interface IConstructorProps extends IConstructorBaseProps {}

class ProgressBar extends BaseComponent {
  constructor(props: IConstructorProps) {
    super(props);
  }

  render() {
    if (this.containerElement) {
      this.containerElement.innerHTML = `<div class="progress-container">
            <div class="progress-bar" id="${ids.smProgressBar}"></div>
            <div class="progress-thumb" id="${ids.smProgressThumb}"></div>
        </div>
      `;
    }
  }
}

export default ProgressBar;
