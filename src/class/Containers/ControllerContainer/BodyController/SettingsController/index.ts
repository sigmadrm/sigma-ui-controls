import { checkedIcon, chevronLeftIcon, chevronRightIcon, qualityIcon, playbackSpeedIcon } from './../../../../../icons';
import { ids } from '../../../../../constants';
import { EEVentName, IConstructorBaseProps } from '../../../../../type';
import BaseComponent from '../../../../BaseComponent';

const PLAYBACK_SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

type TTabName = 'default' | 'playbackSpeed' | 'quality';
type TSettingState = {
  playbackSpeed: number;
  quality: string;
  currentTab: TTabName;
  previousTab: TTabName;
  qualities: string[];
};
const initState: TSettingState = {
  playbackSpeed: 1,
  quality: 'Auto',
  currentTab: 'default',
  previousTab: 'default',
  qualities: ['Auto', 'SD', 'HD', 'FHD'],
};

export default class SettingsController extends BaseComponent<TSettingState> {
  constructor(props: IConstructorBaseProps) {
    super(props, initState);
  }

  generatePlaybackItemId(index: number) {
    return `${ids.smSettingPlaybackSpeedItemPrefix}-${index}`;
  }

  generateQualityItemId(index: number) {
    return `${ids.smSettingQualityItemPrefix}-${index}`;
  }

  registerListener() {
    const { apiPlayer, state } = this;
    const smPlaybackSpeedElement = document.getElementById(ids.smPlaybackSpeed);
    const smQualityElement = document.getElementById(ids.smQuality);
    const smSettingDetailGoBackIconElement = document.getElementById(ids.smSettingDetailGoBackIcon);
    const smSettingDetailTitleElement = document.getElementById(ids.smSettingDetailTitle);

    if (smPlaybackSpeedElement) {
      smPlaybackSpeedElement.onclick = (event) => this.goToPlaybackSpeedTab(event);
    }
    if (smQualityElement) {
      smQualityElement.onclick = (event) => this.goToQualityTab(event);
    }
    if (smSettingDetailGoBackIconElement) {
      smSettingDetailGoBackIconElement.onclick = (event) => this.goToTab('default');
    }
    if (smSettingDetailTitleElement) {
      smSettingDetailTitleElement.onclick = (event) => this.goToTab('default');
    }

    PLAYBACK_SPEEDS.forEach((pbsValue, index) => {
      const id = this.generatePlaybackItemId(index);
      const playbackSpeedValueElement = document.getElementById(id);
      if (playbackSpeedValueElement) {
        playbackSpeedValueElement.onclick = (event: MouseEvent) => this.changePlaybackSpeed(pbsValue);
      }
    });
    // TODO: listener quality change
    state?.qualities?.forEach((rValue, index) => {
      const id = this.generateQualityItemId(index);
      const qualitiesValueElement = document.getElementById(id);
      if (qualitiesValueElement) {
        qualitiesValueElement.onclick = (event: MouseEvent) => this.changeQuality(rValue);
      }
    });

    apiPlayer.addEventListener(EEVentName.ADAPTATION, this.handleQualityChange, this);
    apiPlayer.addEventListener(EEVentName.TRACKS_CHANGED, this.handleQualityChange, this);
    apiPlayer.addEventListener(EEVentName.ABR_STATUS_CHANGED, this.handleQualityChange, this);
    apiPlayer.addEventListener(EEVentName.VARIANT_CHANGED, this.handleQualityChange, this);
  }

  unregisterListener() {
    const { apiPlayer } = this;
    apiPlayer.removeEventListener(EEVentName.ADAPTATION, this.handleQualityChange, this);
    apiPlayer.removeEventListener(EEVentName.TRACKS_CHANGED, this.handleQualityChange, this);
    apiPlayer.removeEventListener(EEVentName.ABR_STATUS_CHANGED, this.handleQualityChange, this);
    apiPlayer.removeEventListener(EEVentName.VARIANT_CHANGED, this.handleQualityChange, this);
  }

  goToPlaybackSpeedTab(event: MouseEvent) {
    this.state = { ...this.state, currentTab: 'playbackSpeed' };
  }

  goToQualityTab(event: MouseEvent) {
    this.state = { ...this.state, currentTab: 'quality' };
  }

  goToTab(tabName: TTabName) {
    this.state = { ...this.state, currentTab: tabName };
  }

  changePlaybackSpeed(value: number) {
    this.state = { ...this.state, playbackSpeed: value };
    // TODO: handle change playbackSpeed
    // this.apiPlayer.
  }

  changeQuality(value: string) {
    this.state = { ...this.state, quality: value };
    // TODO: handle change playbackSpeed
    // this.apiPlayer.
  }

  handleQualityChange(data) {
    console.log('handleQualityChange', data);
    const tracks = this.apiPlayer.getVariantTracks();
    console.log('tracks ', tracks);
  }

  renderDefaultTab() {
    const { classes, state = initState } = this;
    const settingItems = [
      {
        title: 'Tốc độ phát',
        id: ids.smPlaybackSpeed,
        icon: playbackSpeedIcon,
        value: `<div class=${classes.settingItemValue}>
          <div>${state.playbackSpeed === 1 ? 'Bình thường' : state.playbackSpeed}</div>
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
    const { classes, state } = this;
    const header = `
    <div class=${classes.settingHeader}>
      <div class=${classes.settingItemIcon} id=${ids.smSettingDetailGoBackIcon}>${chevronLeftIcon}</div>
      <div class=${classes.settingItemTitle} id=${ids.smSettingDetailTitle}>Tốc độ phát</div>
    </div>`;

    const body = PLAYBACK_SPEEDS.map((pbsValue, index) => {
      const id = this.generatePlaybackItemId(index);
      const isActive = state.playbackSpeed === pbsValue;
      return `<div class="${`${classes.settingDetailItem} ${classes.settingItemDivider}`}" id=${id}>
        <div class=${classes.settingItemIcon}>${isActive ? checkedIcon : ''}</div>
        <div class=${isActive ? classes.settingTitleActive : classes.settingTitleNormal}>${pbsValue === 1 ? 'Bình thường' : `${pbsValue}x`}</div>
      </div>`;
    }).join('');

    return header + body;
  }

  renderQualityTab() {
    const { classes, state } = this;
    const header = `
    <div class=${classes.settingHeader}>
      <div class=${classes.settingItemIcon} id=${ids.smSettingDetailGoBackIcon}>${chevronLeftIcon}</div>
      <div class=${classes.settingItemTitle} id=${ids.smSettingDetailTitle}>Chất lượng</div>
    </div>`;

    const body = state.qualities
      .map((rValue, index) => {
        const id = this.generateQualityItemId(index);
        const isActive = state.quality === rValue;
        return `<div class="${`${classes.settingDetailItem} ${classes.settingItemDivider}`}" id=${id}>
        <div class=${classes.settingItemIcon}>${isActive ? checkedIcon : ''}</div>
        <div class=${isActive ? classes.settingTitleActive : classes.settingTitleNormal}>${rValue}</div>
      </div>`;
      })
      .join('');

    return header + body;
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
