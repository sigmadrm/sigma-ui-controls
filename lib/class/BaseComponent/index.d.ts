import { IConstructorBaseProps, TClasses } from '../../type';
import SmApiPlayer from '../SmApiPlayer';
export default class BaseComponent<T = {}> {
    protected id: string;
    protected apiPlayer: SmApiPlayer;
    protected classes: TClasses;
    protected containerElement: HTMLElement | null;
    private _state?;
    protected initiated: boolean;
    protected get state(): T;
    protected set state(value: T | undefined);
    constructor(props: IConstructorBaseProps, initState?: T);
    registerListener(): void;
    unregisterListener(): void;
    render(): void;
    destroy(): void;
}
//# sourceMappingURL=index.d.ts.map