import { IConstructorBaseProps, TClasses } from '../../type';
import SmApiPlayer from '../SmApiPlayer';

export default class BaseComponent<T = {}> {
  protected id: string;
  protected apiPlayer: SmApiPlayer;
  protected classes: TClasses;
  protected containerElement: HTMLElement | null = null;
  private _state?: T;
  private initiated: boolean = false;

  protected get state(): T {
    return (this._state || {}) as T;
  }
  protected set state(value: T | undefined) {
    this._state = value;
    if (this.initiated) {
      this.unregisterListener();
    }
    this.render();
    this.registerListener();
    this.initiated = true;
  }

  constructor(props: IConstructorBaseProps, initState?: T) {
    const { id, classes, apiPlayer } = props;
    this.id = id;
    this.apiPlayer = apiPlayer;
    this.classes = classes;
    this.containerElement = document.getElementById(id);
    this.state = initState;
  }

  registerListener() {
    // Ex:
    // this.apiPlayer.eventemitter.on(EEVentName.LOADED, this.handleLoaded);
  }

  unregisterListener() {
    // Ex:
    // this.apiPlayer.eventemitter.off(EEVentName.LOADED, this.handleLoaded);
  }

  render() {
    // Ex:
    // if (this.containerElement) {
    //   this.containerElement.innerHTML = `<div></div>`;
    // }
  }

  destroy(): void {
    this.unregisterListener();
    this.containerElement = null;
  }
}
