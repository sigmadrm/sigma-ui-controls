import { IConstructorBaseProps, Track } from '../../../../../type';
import BaseComponent from '../../../../BaseComponent';
type TTabName = 'default' | 'playbackRate' | 'quality';
type TSettingState = {
    visible: boolean;
    playbackRate: number;
    currentTab: TTabName;
    previousTab: TTabName;
    tracks: Track[];
    activeTrack: Track;
};
export default class SettingsController extends BaseComponent<TSettingState> {
    constructor(props: IConstructorBaseProps);
    generatePlaybackItemId(index: number): string;
    generateQualityItemId(index: number): string;
    registerListener(): void;
    unregisterListener(): void;
    goToPlaybackSpeedTab(event: MouseEvent): void;
    goToQualityTab(event: MouseEvent): void;
    goToTab(tabName: TTabName): void;
    changeQuality(track: Track): void;
    handleQualityChange(event: any, data: any): void;
    changePlaybackRate(value: number): void;
    handleRateChange(event: any, data: any): void;
    handleSettingPanelVisible(event: any, data: any): void;
    handleSettingContainerClickOut(event: any): void;
    renderDefaultTab(): string;
    renderPlaybackSpeedTab(): string;
    getQualityLabel(track: Track, tracks: Track[]): string;
    renderQualityTab(): string;
    renderSettingContent(): string;
    render(): void;
}
export {};
//# sourceMappingURL=index.d.ts.map