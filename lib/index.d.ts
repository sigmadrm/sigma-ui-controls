import { IConfigureUIPlayerProps } from './type';
import './index.css';
declare class SmUIControls {
    private apiPlayer;
    private isInit;
    private controllerContainer;
    private errorContainer;
    private loadingContainer;
    constructor(props: IConfigureUIPlayerProps);
    handleEventLoaded: (data: any) => void;
    handleEventError: (data: any) => void;
    handleEventPlay: (data: any) => void;
    handleEventPause: (data: any) => void;
    handleEventFullScreenChange: (data: any) => void;
    destroy(): void;
}
export default SmUIControls;
//# sourceMappingURL=index.d.ts.map