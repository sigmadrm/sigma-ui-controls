import { nanoid } from 'nanoid';
import generateStyles from './style';
import { IIds } from './type';

export const createElementFromHTML = (htmlString: string) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString.trim();
  return tempDiv.firstChild;
};

// export const generateHtmlContentContainerString = (
//   classes: ReturnType<typeof generateStyles>,
//   ids: {
//     smControllerContent: string;
//     smLoading: string;
//     smError: string;
//   },
// ) => {
//   return `
//     <div class=${classes.controllerContent}  id=${ids.smControllerContent}>
//     </div>
//     <div class=${classes.loadingContainer} id=${ids.smLoading}>
//     </div>
//     <div class=${classes.errorContainer} id=${ids.smError}>
//     </div>
//     `;
// };
export const generateHtmlContentControllerString = (classes: ReturnType<typeof generateStyles>) => {};

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
  };
};
