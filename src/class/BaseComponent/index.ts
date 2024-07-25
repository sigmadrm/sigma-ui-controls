import { IApiPlayer, IConstructorBaseProps, TClasses } from '../../type';

export default class BaseComponent {
  protected id: string;
  protected apiPlayer: IApiPlayer;
  protected classes: TClasses;
  protected containerElement: HTMLElement | null = null;

  constructor(props: IConstructorBaseProps) {
    const { id, classes, apiPlayer } = props;
    this.id = id;
    this.apiPlayer = apiPlayer;
    this.classes = classes;
    this.containerElement = document.getElementById(id);
    this.render();
    this.registerListener();
  }

  registerListener() {
    // Ex: this.apiPlayer.addEventListener("loaded", (data: any) => { });
  }

  unregisterListener() {
    // Ex: this.apiPlayer.removeEventListener("loaded");
  }

  render() {
    console.log('Render componet cha');
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
