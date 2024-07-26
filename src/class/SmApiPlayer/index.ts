import { EEVentName } from '../../type';
import SmEventEmitter from '../SmEventEmitter/SmEventEmitter';

export default class SmApiPlayer {
  method: {
    play: () => void;
    pause: () => void;
    isPlay: () => boolean;
    isFullScreen: () => boolean;
    enterFullScreen: () => void;
    exitFullScreen: () => void;
    updateVolume: (value: number) => void;
  };
  eventemitter: SmEventEmitter;
  addEventListener: (evtName: EEVentName, clb: (data: any) => any) => void;
  removeEventListener: (evtName: EEVentName, clb: (data: any) => any) => void;
  constructor(props: SmApiPlayer) {
    this.method = props.method;
    this.eventemitter = props.eventemitter;
    this.addEventListener = props.addEventListener;
    this.removeEventListener = props.removeEventListener;
  }
  // public setAddEventListener(value: (evtName: EEVentName, clb: (data: any) => any) => void) {
  //   this.addEventListener = value;
  // }
  // public setRemoveEventListener(value: (evtName: EEVentName, clb: (data: any) => any) => void) {
  //   this.removeEventListener = value;
  // }
}
