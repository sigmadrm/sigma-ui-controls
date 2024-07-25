import { chevronRightIcon, qualityIcon } from './../../../../../icons';
import { ids } from '../../../../../constants';
import { playbackSpeedIcon } from '../../../../../icons';
import { IConstructorBaseProps } from '../../../../../type';
import BaseComponent from '../../../../BaseComponent';

type TSettingState = {
  playbackSpeed: number;
  quality: string;
  currentTab: 'default' | 'playbackSpeed' | 'quality';
};
const defaultState: TSettingState = { playbackSpeed: 1, quality: 'Auto', currentTab: 'default' };

export default class SettingsController extends BaseComponent {
  private _state: TSettingState;
  constructor(props: IConstructorBaseProps) {
    super(props);
    this._state = defaultState;
  }

  registerListener() {
    document
      .getElementById(ids.smPlaybackSpeed)
      ?.addEventListener('click', (event) => this.goToPlaybackSpeedTab(event));
    document.getElementById(ids.smQuality)?.addEventListener('click', (event) => this.goToQualityTab(event));
  }

  unregisterListener() {
    // emitter.off()
    // Ex: this.apiPlayer.removeEventListener("loaded");
  }

  set state(value: TSettingState) {
    this._state = value;
    this.render();
  }

  get state(): TSettingState {
    return this._state;
  }

  goToPlaybackSpeedTab(event: MouseEvent) {
    this.state = { ...this.state, currentTab: 'playbackSpeed' };
  }

  goToQualityTab(event: MouseEvent) {
    console.log('goToQualityTab');
    this.state = { ...this.state, currentTab: 'quality' };
  }

  renderDefaultTab() {
    const { classes, state = defaultState } = this;
    const settingItems = [
      {
        title: 'Tốc độ phát',
        id: ids.smPlaybackSpeed,
        icon: playbackSpeedIcon,
        value: `<div class=${classes.settingItemValue}>
          <div>${state.playbackSpeed === 1 ? 'Normal' : state.playbackSpeed}</div>
          <div class=${classes.settingItemIconSecondary}>${chevronRightIcon}</div>
        </div>`,
      },
      {
        title: 'Chất lượng',
        id: ids.smQuality,
        icon: qualityIcon,
        value: `<div class=${classes.settingItemValue}>
          <div>${state.quality}</div>
          <div class=${classes.settingItemIconSecondary}>${chevronRightIcon}</div>
        </div>`,
      },
    ];

    return settingItems
      .map(({ title, id, icon, value }) => {
        return `<div class=${classes.settingItem} id=${id}>
        <div class=${classes.settingItemIcon}>${icon}</div>
        <div class=${classes.settingItemTitle}>${title}</div>
        <div class=${classes.settingItemValue}>${value}</div>
      </div>`;
      })
      .join('');
  }

  renderPlaybackSpeedTab() {
    return 'renderPlaybackSpeedTab';
  }

  renderQualityTab() {
    return 'renderQualityTab';
  }

  renderSettingContent() {
    switch (this.state?.currentTab) {
      case 'playbackSpeed':
        return this.renderPlaybackSpeedTab();
      case 'quality':
        return this.renderQualityTab();
      default:
        return this.renderDefaultTab();
    }
  }

  render() {
    const { classes } = this;

    if (this.containerElement) {
      this.containerElement.innerHTML = `<div class=${classes.settingsContent}>
        ${this.renderSettingContent()}
      </div>`;
    }
  }
}
