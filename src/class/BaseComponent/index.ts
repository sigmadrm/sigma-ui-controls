import { IApiPlayer, IConstructorBaseProps, TClasses } from '../../type';

export default class BaseComponent<T = {}> {
  protected id: string;
  protected apiPlayer: IApiPlayer;
  protected classes: TClasses;
  protected containerElement: HTMLElement | null = null;
  private _state?: T;

  protected get state(): T {
    return this._state as T;
  }
  protected set state(value: T | undefined) {
    this._state = value;
    this.unregisterListener();
    this.render();
    this.registerListener();
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
    // Ex: this.apiPlayer.addEventListener("loaded", (data: any) => { });
  }

  unregisterListener() {
    // Ex: this.apiPlayer.removeEventListener("loaded");
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
