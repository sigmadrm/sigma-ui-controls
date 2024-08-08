import { IConstructorBaseProps } from '../../../type';
import BaseComponent from '../../BaseComponent';

interface IConstructorProps extends IConstructorBaseProps {}

class SelectVolumeRange extends BaseComponent {
  constructor(props: IConstructorProps) {
    super(props);
  }

  render() {
    const volume = this.apiPlayer.getVolume();
    if (this.containerElement) {
      this.containerElement.innerHTML = `<input id="${this.ids.smInputVolumeRange}"
       class="${this.classes.taskbarVolumeSlider}" type="range" min="0" max="1" step="0.01" 
       value="${volume}">
      `;
    }

    this.updateSliderHighlight(volume);
  }
  update(value: number) {
    const inputVolRangeEle = document.getElementById(this.ids.smInputVolumeRange) as HTMLInputElement;
    if (inputVolRangeEle) {
      inputVolRangeEle.value = value.toString();
      inputVolRangeEle && inputVolRangeEle.style.setProperty('--highlight-width', `${value * 100}%`);
    }
  }
  registerListener() {
    const inputVolRangeEle = document.getElementById(this.ids.smInputVolumeRange);
    if (inputVolRangeEle) {
      inputVolRangeEle.oninput = (event) => {
        const { value } = event.target as HTMLInputElement;
        this.apiPlayer.updateVolume(parseFloat(value));
        this.updateSliderHighlight(parseFloat(value));
      };
    }
  }

  updateSliderHighlight(volume: number) {
    const percentage = volume * 100;
    const inputVolRangeEle = document.getElementById(this.ids.smInputVolumeRange);
    inputVolRangeEle && inputVolRangeEle.style.setProperty('--highlight-width', `${percentage}%`);
  }

  unregisterListener() {
    const inputVolRangeEle = document.getElementById(this.ids.smInputVolumeRange);
    if (inputVolRangeEle) {
      inputVolRangeEle.oninput = (event) => {};
    }
  }

  hide = () => {};
  show = () => {};
}

export default SelectVolumeRange;
