import { IApiPlayer, IConstructorBaseProps, TClasses } from '../../type';
export default class BaseComponent<T = {}> {
    protected id: string;
    protected apiPlayer: IApiPlayer;
    protected classes: TClasses;
    protected containerElement: HTMLElement | null;
    private _state?;
    protected get state(): T;
    protected set state(value: T | undefined);
    constructor(props: IConstructorBaseProps, initState?: T);
    registerListener(): void;
    unregisterListener(): void;
    render(): void;
    destroy(): void;
}
//# sourceMappingURL=index.d.ts.map