/* eslint-disable no-restricted-globals */
import { checkedIcon, chevronLeftIcon, chevronRightIcon, qualityIcon, playbackSpeedIcon } from './../../../../../icons';
import { ids } from '../../../../../constants';
import { EEVentName, IConstructorBaseProps, Track } from '../../../../../type';
import BaseComponent from '../../../../BaseComponent';

const PLAYBACK_SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

type TTabName = 'default' | 'playbackRate' | 'quality';
type TSettingState = {
  visible: boolean;
  playbackRate: number;
  currentTab: TTabName;
  previousTab: TTabName;
  tracks: Track[];
  activeTrack: Track;
};
const autoTrack: Track = { id: -1, label: 'Auto', bandwidth: 0 };
const initState: TSettingState = {
  visible: false,
  playbackRate: 1,
  currentTab: 'default',
  previousTab: 'default',
  tracks: [autoTrack],
  activeTrack: autoTrack,
};

export default class SettingsController extends BaseComponent<TSettingState> {
  constructor(props: IConstructorBaseProps) {
    super(props, initState);
    this.handleSettingContainerClickOut = this.handleSettingContainerClickOut.bind(this);
    this.handleQualityChange = this.handleQualityChange.bind(this);
    this.handleRateChange = this.handleRateChange.bind(this);
    this.handleSettingPanelVisible = this.handleSettingPanelVisible.bind(this);
  }

  generatePlaybackItemId(index: number) {
    return `${ids.smSettingPlaybackSpeedItemPrefix}-${index}`;
  }

  generateQualityItemId(index: number) {
    return `${ids.smSettingQualityItemPrefix}-${index}`;
  }

  registerListener() {
    const { apiPlayer, state, containerElement } = this;
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
    PLAYBACK_SPEEDS.forEach((pbrValue, index) => {
      const id = this.generatePlaybackItemId(index);
      const playbackSpeedValueElement = document.getElementById(id);
      if (playbackSpeedValueElement) {
        playbackSpeedValueElement.onclick = (event: MouseEvent) => this.changePlaybackRate(pbrValue);
      }
    });
    state?.tracks?.forEach((track, index) => {
      const id = this.generateQualityItemId(index);
      const qualitiesValueElement = document.getElementById(id);
      if (qualitiesValueElement) {
        qualitiesValueElement.onclick = (event: MouseEvent) => this.changeQuality(track);
      }
    });
    apiPlayer.eventemitter.on(EEVentName.TRACKS_CHANGED, this.handleQualityChange, this);
    apiPlayer.eventemitter.on(EEVentName.RATE_CHANGE, this.handleRateChange, this);
    apiPlayer.eventemitter.on(EEVentName.SETTING_PANEL_VISIBLE, this.handleSettingPanelVisible, this);
    if (containerElement) {
      containerElement.onclick = (e) => {
        e.stopPropagation();
      };
      window.addEventListener('click', this.handleSettingContainerClickOut);
    }
  }

  unregisterListener() {
    const { apiPlayer } = this;
    apiPlayer.eventemitter.off(EEVentName.TRACKS_CHANGED, this.handleQualityChange, this);
    apiPlayer.eventemitter.off(EEVentName.RATE_CHANGE, this.handleRateChange, this);
    apiPlayer.eventemitter.off(EEVentName.SETTING_PANEL_VISIBLE, this.handleSettingPanelVisible, this);
    if (this.containerElement) {
      window.removeEventListener('click', this.handleSettingContainerClickOut);
    }
  }

  goToPlaybackSpeedTab(event: MouseEvent) {
    this.state = { ...this.state, currentTab: 'playbackRate' };
  }

  goToQualityTab(event: MouseEvent) {
    this.state = { ...this.state, currentTab: 'quality' };
  }

  goToTab(tabName: TTabName) {
    this.state = { ...this.state, currentTab: tabName };
  }

  changeQuality(track: Track) {
    this.apiPlayer.selectVariantTrack(track);
    this.apiPlayer.eventemitter.trigger(EEVentName.SETTING_PANEL_VISIBLE, { visible: false });
  }

  handleQualityChange(event, data) {
    const { tracks } = data;
    const isAuto = tracks[tracks.length - 1].active;
    let activeTrack = tracks[tracks.length - 1];
    if (!isAuto) {
      for (let index = 0; index < tracks.length - 1; index += 1) {
        const track: Track = tracks[index];
        if (track.active) {
          activeTrack = track;
          break;
        }
      }
    }

    this.state = { ...this.state, tracks, activeTrack };
  }

  changePlaybackRate(value: number) {
    this.apiPlayer.playbackRate = value;
    this.goToTab('default');
  }

  handleRateChange(event, data) {
    const { playbackRate } = data;
    // playbackRate = 0 is loading...
    if (playbackRate > 0) {
      this.state = { ...this.state, playbackRate };
    }
  }

  handleSettingPanelVisible(event, data) {
    const { visible } = data;
    this.state = { ...this.state, visible, currentTab: 'default' };
  }

  handleSettingContainerClickOut(event) {
    if (this.containerElement?.style.display === 'flex' && event.target !== this.containerElement) {
      this.state = { ...this.state, visible: false };
      this.apiPlayer.eventemitter.trigger(EEVentName.SETTING_PANEL_VISIBLE, { visible: false });
    }
  }

  renderDefaultTab() {
    const { classes, state } = this;
    const settingItems = [
      {
        title: 'Tốc độ phát',
        id: ids.smPlaybackSpeed,
        icon: playbackSpeedIcon,
        value: `<div class=${classes.settingItemValue}>
          <div>${state.playbackRate === 1 ? 'Bình thường' : state.playbackRate}</div>
          <div class=${classes.settingItemIconSecondary}>${chevronRightIcon}</div>
        </div>`,
      },
      {
        title: 'Chất lượng',
        id: ids.smQuality,
        icon: qualityIcon,
        value: `<div class=${classes.settingItemValue}>
          <div>${this.getQualityLabel(this.state.activeTrack, this.state.tracks)}</div>
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

    const body = PLAYBACK_SPEEDS.map((pbrValue, index) => {
      const id = this.generatePlaybackItemId(index);
      const isActive = state.playbackRate === pbrValue;
      return `<div class="${`${classes.settingDetailItem} ${classes.settingItemDivider}`}" id=${id}>
        <div class=${classes.settingItemIcon}>${isActive ? checkedIcon : ''}</div>
        <div class=${isActive ? classes.settingTitleActive : classes.settingTitleNormal}>${pbrValue === 1 ? 'Bình thường' : `${pbrValue}`}</div>
      </div>`;
    }).join('');

    return header + body;
  }

  getQualityLabel(track: Track, tracks: Track[]) {
    if (track.id === -1) {
      return 'Tự dộng';
    }
    const trackHeight = track.height || 0;
    const trackWidth = track.width || 0;
    let height = trackHeight;
    const aspectRatio = trackWidth / trackHeight;
    if (aspectRatio > 16 / 9) {
      height = Math.round((trackWidth * 9) / 16);
    }
    let text = height + 'p';
    if (height == 2160) {
      text = '4K';
    }
    const frameRate = track.frameRate;
    if (frameRate && (frameRate >= 50 || frameRate <= 20)) {
      text += Math.round(track.frameRate || 0);
    }
    if (track.hdr == 'PQ' || track.hdr == 'HLG') {
      text += ' (HDR)';
    }
    if (track.videoLayout == 'CH-STEREO') {
      text += ' (3D)';
    }
    const hasDuplicateResolution = tracks.some((otherTrack) => {
      return otherTrack != track && otherTrack.height == track.height;
    });
    if (hasDuplicateResolution) {
      const bandwidth = track.videoBandwidth || track.bandwidth;
      text += ' (' + Math.round(bandwidth / 1000) + ' kbits/s)';
    }
    return text;
  }

  renderQualityTab() {
    const { classes, state } = this;
    const { tracks } = state;

    const header = `
    <div class=${classes.settingHeader}>
      <div class=${classes.settingItemIcon} id=${ids.smSettingDetailGoBackIcon}>${chevronLeftIcon}</div>
      <div class=${classes.settingItemTitle} id=${ids.smSettingDetailTitle}>Chất lượng</div>
    </div>`;

    const body = tracks
      .map((track, index) => {
        const id = this.generateQualityItemId(index);
        const isActive = track === state.activeTrack;
        const label = this.getQualityLabel(track, tracks);

        return `<div class="${`${classes.settingDetailItem} ${classes.settingItemDivider}`}" id=${id}>
        <div class=${classes.settingItemIcon}>${isActive ? checkedIcon : ''}</div>
        <div class=${isActive ? classes.settingTitleActive : classes.settingTitleNormal}>${label}</div>
      </div>`;
      })
      .join('');

    return header + body;
  }

  renderSettingContent() {
    switch (this.state?.currentTab) {
      case 'playbackRate':
        return this.renderPlaybackSpeedTab();
      case 'quality':
        return this.renderQualityTab();
      default:
        return this.renderDefaultTab();
    }
  }

  render() {
    const {
      classes,
      state: { visible },
    } = this;

    if (this.containerElement) {
      this.containerElement.innerHTML = `<div class=${classes.settingsContent}>
        ${this.renderSettingContent()}
      </div>`;
      this.containerElement.style.display = visible ? 'flex' : 'none';
    }
  }
}
