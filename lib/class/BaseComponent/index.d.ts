import { IApiPlayer, IConstructorBaseProps, TClasses } from '../../type';
export default class BaseComponent {
    protected id: string;
    protected apiPlayer: IApiPlayer;
    protected classes: TClasses;
    protected containerElement: HTMLElement | null;
    constructor(props: IConstructorBaseProps);
    registerListener(): void;
    unregisterListener(): void;
    render(): void;
    destroy(): void;
}
//# sourceMappingURL=index.d.ts.map