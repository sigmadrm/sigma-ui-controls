import { IConstructorBaseProps } from '../../../../../type';
import BaseComponent from '../../../../BaseComponent';
type TTabName = 'default' | 'playbackSpeed' | 'quality';
type TSettingState = {
    playbackSpeed: number;
    quality: string;
    currentTab: TTabName;
    previousTab: TTabName;
    qualities: string[];
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
    changePlaybackSpeed(value: number): void;
    changeQuality(value: string): void;
    renderDefaultTab(): string;
    renderPlaybackSpeedTab(): string;
    renderQualityTab(): string;
    renderSettingContent(): string;
    render(): void;
}
export {};
//# sourceMappingURL=index.d.ts.map