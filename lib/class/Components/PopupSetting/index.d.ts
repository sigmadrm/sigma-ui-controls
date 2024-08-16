import { IConstructorBaseProps, Track, TTabName } from '../../../type';
import BaseComponent from '../../BaseComponent';
type TSettingState = {
    visible: boolean;
    playbackRate: number;
    currentTab: TTabName;
    previousTab: TTabName;
    tracks: Track[];
    activeTrack: Track;
};
declare class PopupSetting extends BaseComponent<TSettingState> {
    constructor(props: IConstructorBaseProps);
    generatePlaybackItemId(index: number): string;
    generateQualityItemId(index: number): string;
    registerListener(): void;
    unregisterListener(): void;
    goToPlaybackSpeedTab(event: MouseEvent | TouchEvent): void;
    goToQualityTab(event: MouseEvent | TouchEvent): void;
    goToTab(tabName: TTabName): void;
    changeQuality(track: Track): void;
    handleQualityChange(event: any, data: any): void;
    changePlaybackRate(value: number): void;
    handleRateChange(event: any, data: any): void;
    handleEvtPopupSetting(event: any, data: any): void;
    handleEvtClickContainer(event: TouchEvent | MouseEvent): void;
    renderDefaultTab(): string;
    renderPlaybackSpeedTab(): string;
    getQualityLabel(track: Track, tracks: Track[], ignoreSelectedTrack?: boolean): string;
    renderQualityTab(): string;
    renderSettingContent(): string;
    render(): void;
}
export default PopupSetting;
//# sourceMappingURL=index.d.ts.map