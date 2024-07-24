import { IConfigureUIPlayerProps } from './type';
import './index.css';
declare class SmUIControls {
    private apiPlayer;
    private isLoaded;
    constructor(props: IConfigureUIPlayerProps);
    static get version(): string;
    destroy(): void;
}
export default SmUIControls;
//# sourceMappingURL=index.d.ts.map