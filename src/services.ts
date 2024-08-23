import { UAParser } from 'ua-parser-js';

import { nanoid } from 'nanoid';
import { EDeviceType, IDeviceInfo, IIds } from './type';

export const createElementFromHTML = (htmlString: string) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString.trim();
  return tempDiv.firstChild;
};

export const generateIIds = (): IIds => {
  return {
    smControllerContainer: nanoid(4),
    smControllerContent: nanoid(4),
    smLoading: nanoid(4),
    smError: nanoid(4),
    smHeadController: nanoid(4),
    smBodyController: nanoid(4),
    smButtonPlayPrimary: nanoid(4),
    smSettingsContainer: nanoid(4),
    smSettingsContainerMask: nanoid(4),
    smSettingDetailTitle: nanoid(4),
    smSettingDetailGoBackIcon: nanoid(4),
    smSettingPlaybackSpeedItemPrefix: nanoid(4),
    smSettingQualityItemPrefix: nanoid(4),
    smFooterController: nanoid(4),
    smTaskbarController: nanoid(4),
    smSeekBarController: nanoid(4),
    smButtonFullScreen: nanoid(4),
    smButtonPlaySecondary: nanoid(4),
    smButtonPauseSecondary: nanoid(4),
    smButtonForward: nanoid(4),
    smButtonExitFullScreen: nanoid(4),
    smButtonVolume: nanoid(4),
    smButtonMute: nanoid(4),
    smSelectVolumeRangeContainer: nanoid(4),
    smSelectVolumeRange: nanoid(4),
    smInputVolumeRange: nanoid(4),
    smVolumeContainer: nanoid(4),
    smPlaybackSpeed: nanoid(4),
    smQuality: nanoid(4),
    smSettingIconButton: nanoid(4),
    smTimeBarContainer: nanoid(4),
    smTaskbarLiveStream: nanoid(4),
    smTimeCurrent: nanoid(4),
    smTimeDuration: nanoid(4),
    smProgressBar: nanoid(4),
    smProgressThumb: nanoid(4),
    smProgressBarContainer: nanoid(4),
    smProgressBuffer: nanoid(4),
    smButtonReplaySecondary: nanoid(4),
    smButtonReplayPrimary: nanoid(4),
    smSettingIconButtonMobile: nanoid(4),
    smButtonPausePrimary: nanoid(4),
    smScrubbingForward: nanoid(4),
    smScrubbingForwardRippleRight: nanoid(4),
    smScrubbingForwardIcon: nanoid(4),
    smScrubbingForwardText: nanoid(4),
    smScrubbingRewind: nanoid(4),
    smScrubbingRewindRippleLeft: nanoid(4),
    smScrubbingRewindIcon: nanoid(4),
    smScrubbingRewindText: nanoid(4),
    smPopupSettings: nanoid(4),
    smPopupSettingQuality: nanoid(4),
    smPopupSettingPlaybackSpeed: nanoid(4),
    smPopupSettingItemHeader: nanoid(4),
    smPopupSettingsContent: nanoid(4),
  };
};

export const detectDevice = (): IDeviceInfo => {
  const deviceInfo: IDeviceInfo = {
    type: EDeviceType.DESKTOP,
    os: { name: '', version: '' },
  };
  try {
    const parser = new UAParser();
    const result = parser.getResult();
    const deviceType = result.device.type;
    const os = parser.getOS();

    if (os) {
      deviceInfo.os = os;
    }
    if (deviceType) {
      if (deviceType.toLowerCase() === EDeviceType.MOBILE) {
        deviceInfo.type = EDeviceType.MOBILE;
      } else if (deviceType.toLowerCase() === EDeviceType.TABLET) {
        deviceInfo.type = EDeviceType.TABLET;
      } else {
        deviceInfo.type = EDeviceType.DESKTOP;
      }
    }
    return deviceInfo;
  } catch (error) {
    return deviceInfo;
  }
};
export const detectDeviceMobile = (deviceType: EDeviceType): boolean => {
  return deviceType === EDeviceType.MOBILE;
};

export const detectDeviceDesktop = (deviceType: EDeviceType): boolean => {
  return !(deviceType === EDeviceType.TABLET || deviceType === EDeviceType.MOBILE);
};
export const isIOS = (value: string): boolean => {
  try {
    return value.toLowerCase() === 'ios';
  } catch (error) {
    return false;
  }
};
export const checkHasTouch = (): boolean => {
  return 'ontouchstart' in self || navigator.maxTouchPoints > 0;
};
