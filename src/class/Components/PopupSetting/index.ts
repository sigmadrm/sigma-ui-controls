import { autoTrack, PLAYBACK_SPEEDS } from '../../../constants';
import { checkedIcon, chevronLeftIcon, chevronRightIcon, playbackSpeedIcon, qualityIcon } from '../../../icons';
import { detectDeviceDesktop } from '../../../services';
import { EEVentName, EOrientation, IConstructorBaseProps, Track, TTabName } from '../../../type';
import BaseComponent from '../../BaseComponent';

type TSettingState = {
  visible: boolean;
  playbackRate: number;
  currentTab: TTabName;
  previousTab: TTabName;
  tracks: Track[];
  activeTrack: Track;
};
const initState: TSettingState = {
  visible: false,
  playbackRate: 1,
  currentTab: 'default',
  previousTab: 'default',
  tracks: [autoTrack],
  activeTrack: autoTrack,
};
class PopupSetting extends BaseComponent {
  private popupSettingContent: PopupSettingContent | undefined;
  constructor(props: IConstructorBaseProps) {
    const { classes, apiPlayer, ids } = props;
    super(props);
    this.popupSettingContent = new PopupSettingContent({
      id: ids.smPopupSettingsContent,
      classes,
      apiPlayer,
      ids,
    });
  }

  registerListener() {
    const { apiPlayer } = this;
    apiPlayer.eventemitter.on(EEVentName.POPUP_SETTING, this.handleEvtPopupSetting, this);
    if (this.containerElement) {
      this.containerElement.onmouseup = (event: MouseEvent) => this.handleEvtClickContainer(event);
      this.containerElement.ontouchend = (event: TouchEvent) => this.handleEvtClickContainer(event);
    }
  }
  unregisterListener() {
    const { apiPlayer } = this;
    apiPlayer.eventemitter.off(EEVentName.POPUP_SETTING, this.handleEvtPopupSetting, this);
    if (this.containerElement) {
      this.containerElement.onmouseup = () => {};
      this.containerElement.ontouchend = () => {};
    }
  }
  handleEvtPopupSetting(event, data) {
    if (data.open) {
      this.containerElement?.classList.add(this.classes.popupSettingsEnable);
      document.body.classList.add('no-scroll');
    } else {
      this.containerElement?.classList.remove(this.classes.popupSettingsEnable);
      document.body.classList.remove('no-scroll');
    }
  }
  handleEvtClickContainer(event: TouchEvent | MouseEvent) {
    this.apiPlayer.eventemitter.trigger(EEVentName.POPUP_SETTING, { open: false });
  }
  render() {
    const { classes } = this;
    if (this.containerElement) {
      this.containerElement.innerHTML = `<div class="${classes.popupSettingsContent}" id="${this.ids.smPopupSettingsContent}"></div>`;
    }
  }
}
class PopupSettingContent extends BaseComponent<TSettingState> {
  private orientation: EOrientation = EOrientation.HORIZONTAL;
  constructor(props: IConstructorBaseProps) {
    super(props, initState);
  }

  generatePlaybackItemId(index: number) {
    return `${this.ids.smSettingPlaybackSpeedItemPrefix}-${index}`;
  }

  generateQualityItemId(index: number) {
    return `${this.ids.smSettingQualityItemPrefix}-${index}`;
  }

  registerListener() {
    const { apiPlayer, state } = this;
    const smPlaybackSpeedElement = document.getElementById(this.ids.smPopupSettingPlaybackSpeed);
    const smQualityElement = document.getElementById(this.ids.smPopupSettingQuality);
    const smPopupSettingItemHeader = document.getElementById(this.ids.smPopupSettingItemHeader);
    const smPopupSettingItemContent = document.getElementById(this.ids.smPopupSettingsContent);

    if (smPopupSettingItemContent) {
      smPopupSettingItemContent.onmouseup = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
      };
      smPopupSettingItemContent.ontouchend = (event: TouchEvent) => {
        event.preventDefault();
        event.stopPropagation();
      };
    }
    if (smPlaybackSpeedElement) {
      smPlaybackSpeedElement.ontouchend = (event: TouchEvent) => this.goToPlaybackSpeedTab(event);
      smPlaybackSpeedElement.onmouseup = (event: MouseEvent) => this.goToPlaybackSpeedTab(event);
    }
    if (smQualityElement) {
      smQualityElement.ontouchend = (event: TouchEvent) => this.goToQualityTab(event);
      smQualityElement.onmouseup = (event: MouseEvent) => this.goToQualityTab(event);
    }
    if (smPopupSettingItemHeader) {
      smPopupSettingItemHeader.ontouchend = (event: TouchEvent) => this.goToTab('default');
      smPopupSettingItemHeader.onmouseup = (event: MouseEvent) => this.goToTab('default');
    }
    PLAYBACK_SPEEDS.forEach((pbrValue, index) => {
      const id = this.generatePlaybackItemId(index);
      const playbackSpeedValueElement = document.getElementById(id);
      if (playbackSpeedValueElement) {
        // Khi người dùng nhả chuột
        playbackSpeedValueElement.onmouseup = (event: MouseEvent) => this.changePlaybackRate(pbrValue);

        // Khi người dùng nhấc ngón tay
        playbackSpeedValueElement.ontouchend = (event: TouchEvent) => this.changePlaybackRate(pbrValue);

        // Khi người dùng di chuyển ngón tay
        playbackSpeedValueElement.ontouchmove = (event: TouchEvent) => {
          // Vô hiệu hóa sự kiện onmouseup và ontouchend để ngăn chặn việc thay đổi tốc độ phát lại
          playbackSpeedValueElement.onmouseup = null;
          playbackSpeedValueElement.ontouchend = null;
        };
      }
    });
    state?.tracks?.forEach((track, index) => {
      const id = this.generateQualityItemId(index);
      const qualitiesValueElement = document.getElementById(id);
      if (qualitiesValueElement) {
        // Khi người dùng nhả chuột
        qualitiesValueElement.onmouseup = (event: MouseEvent) => this.changeQuality(track);

        // Khi người dùng nhấc ngón tay
        qualitiesValueElement.ontouchend = (event: TouchEvent) => this.changeQuality(track);

        // Khi người dùng di chuyển ngón tay
        qualitiesValueElement.ontouchmove = (event: TouchEvent) => {
          // Vô hiệu hóa sự kiện onmouseup và ontouchend để ngăn chặn việc thay đổi tốc độ phát lại
          qualitiesValueElement.onmouseup = (event: MouseEvent) => {};
          qualitiesValueElement.ontouchend = (event: TouchEvent) => {};
        };
      }
    });

    apiPlayer.eventemitter.on(EEVentName.TRACKS_CHANGED, this.handleQualityChange, this);
    apiPlayer.eventemitter.on(EEVentName.RATE_CHANGE, this.handleRateChange, this);
    apiPlayer.eventemitter.on(EEVentName.POPUP_SETTING, this.handleEvtPopupSetting, this);
    this.apiPlayer.eventemitter.on(EEVentName.FULL_SCREEN_CHANGE, this.handleEvtFullScreenChange, this);
  }

  unregisterListener() {
    const { apiPlayer } = this;

    apiPlayer.eventemitter.off(EEVentName.TRACKS_CHANGED, this.handleQualityChange, this);
    apiPlayer.eventemitter.off(EEVentName.RATE_CHANGE, this.handleRateChange, this);
    apiPlayer.eventemitter.off(EEVentName.POPUP_SETTING, this.handleEvtPopupSetting, this);
    this.apiPlayer.eventemitter.off(EEVentName.FULL_SCREEN_CHANGE, this.handleEvtFullScreenChange, this);
  }

  goToPlaybackSpeedTab(event: MouseEvent | TouchEvent) {
    this.state = { ...this.state, currentTab: 'playbackRate' };
  }

  goToQualityTab(event: MouseEvent | TouchEvent) {
    this.state = { ...this.state, currentTab: 'quality' };
  }

  goToTab(tabName: TTabName) {
    this.state = { ...this.state, currentTab: tabName };
  }

  changeQuality(track: Track) {
    this.apiPlayer.selectVariantTrack(track);
    this.apiPlayer.eventemitter.trigger(EEVentName.POPUP_SETTING, { open: false });
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
  handleEvtFullScreenChange() {
    if (detectDeviceDesktop(this.apiPlayer.deviceType)) {
      this.orientation = EOrientation.HORIZONTAL;
      this.containerElement?.classList.remove(this.classes.popupSettingsContentVertical);
    } else {
      const width = self.innerWidth;
      const height = self.innerHeight;
      if (this.apiPlayer.isFullScreen()) {
        if (width < height) {
          this.containerElement?.classList.add(this.classes.popupSettingsContentVertical);
        }
      } else {
        if (width < height) {
          this.containerElement?.classList.remove(this.classes.popupSettingsContentVertical);
        }
      }
    }
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

  renderDefaultTab() {
    const { classes, state } = this;
    const settingItems = [
      {
        title: 'Tốc độ phát',
        id: this.ids.smPopupSettingPlaybackSpeed,
        icon: playbackSpeedIcon,
        value: `<div class=${classes.popupSettingsItemValue}>
          <div>${state.playbackRate === 1 ? 'Bình thường' : state.playbackRate}</div>
          <div class=${classes.popupSettingsItemIconSecondary}>${chevronRightIcon}</div>
        </div>`,
      },
      {
        title: 'Chất lượng',
        id: this.ids.smPopupSettingQuality,
        icon: qualityIcon,
        value: `<div class=${classes.popupSettingsItemValue}>
          <div>${this.getQualityLabel(this.state.activeTrack, state.tracks)}</div>
          <div class=${classes.popupSettingsItemIconSecondary}>${chevronRightIcon}</div>
        </div>`,
      },
    ];

    return settingItems
      .map(({ title, id, icon, value }) => {
        return `<div class=${classes.popupSettingsItem} id=${id}>
        <div class=${classes.popupSettingsItemIcon}>${icon}</div>
        <div class=${classes.popupSettingsItemTitle}>${title}</div>
        <div class=${classes.popupSettingsItemIconValue}>${value}</div>
      </div>`;
      })
      .join('');
  }

  renderPlaybackSpeedTab() {
    const { classes, state } = this;
    const header = `
    <div class=${classes.popupSettingItemHeader} id=${this.ids.smPopupSettingItemHeader} >
      <div class=${classes.popupSettingItemHeaderIcon}>${chevronLeftIcon}</div>
      <div class=${classes.popupSettingItemHeaderTitle}>Tốc độ phát</div>
    </div>`;

    const body = PLAYBACK_SPEEDS.map((pbrValue, index) => {
      const id = this.generatePlaybackItemId(index);
      const isActive = state.playbackRate === pbrValue;
      return `<div class="${classes.popupSettingDetailItem}" id=${id}>
        <div class=${classes.popupSettingDetailItemIcon}>${isActive ? checkedIcon : ''}</div>
        <div class=${isActive ? classes.popupSettingDetailItemTitleActive : classes.popupSettingDetailItemTitleNormal}>${pbrValue === 1 ? 'Bình thường' : `${pbrValue}`}</div>
      </div>`;
    }).join('');

    return (
      header +
      `<div class="${classes.popupSettingDetailContainer}">
        ${body}
      </div>`
    );
  }

  getQualityLabel(track: Track, tracks: Track[], ignoreSelectedTrack: boolean = false) {
    if (track.id === -1) {
      // eslint-disable-next-line no-restricted-properties
      const selectedTrack = tracks.find((track) => track.active);
      let selectedTrackLabel = '';
      if (selectedTrack && selectedTrack !== track && !ignoreSelectedTrack) {
        selectedTrackLabel = this.getQualityLabel(selectedTrack, tracks);
      }
      return selectedTrackLabel ? `Tự động (${selectedTrackLabel})` : 'Tự động';
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
      return otherTrack != track && otherTrack.id !== -1 && otherTrack.height == track.height;
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
    <div class=${classes.popupSettingItemHeader} id=${this.ids.smPopupSettingItemHeader}>
      <div class=${classes.popupSettingItemHeaderIcon}>${chevronLeftIcon}</div>
      <div class=${classes.popupSettingItemHeaderTitle}>Chất lượng</div>
    </div>`;

    const body = tracks
      .map((track, index) => {
        const id = this.generateQualityItemId(index);
        const isActive = track === state.activeTrack;
        const label = this.getQualityLabel(track, tracks, true);

        return `<div class="${classes.popupSettingDetailItem}" id=${id}>
        <div class=${classes.popupSettingDetailItemIcon}>${isActive ? checkedIcon : ''}</div>
        <div class=${isActive ? classes.popupSettingDetailItemTitleActive : classes.popupSettingDetailItemTitleNormal}>${label}</div>
      </div>`;
      })
      .join('');

    return (
      header +
      `<div class=${classes.popupSettingDetailContainer}>
        ${body}
        </div>`
    );
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
  handleEvtPopupSetting(event, data) {
    if (data.open) {
      this.state = { ...this.state, currentTab: 'default' };
    }
  }
  render() {
    const { classes } = this;
    if (this.containerElement) {
      this.containerElement.innerHTML = `
        <div class="${classes.popupSettingsHeader}"></div>
        ${this.renderSettingContent()}
     `;
    }
  }
}
export default PopupSetting;
