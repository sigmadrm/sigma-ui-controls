import { css } from '@emotion/css';
import { TGenerateStylesProps } from './type';
import { primaryColorDef } from './constants';
const generateStyles = (props?: TGenerateStylesProps) => {
  const { primaryColor = primaryColorDef, logo } = props || {};
  return {
    container: css`
      font-family: 'Be Vietnam Pro';
      background: black;
      color: white;
      -webkit-user-select: none; /* Safari */
      -moz-user-select: none; /* Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none;
      background: transparent;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      overflow: hidden;
      color: white;
      ::-webkit-scrollbar,
      *::-webkit-scrollbar {
        width: 6px;
      }
      ::-webkit-scrollbar-track,
      *::-webkit-scrollbar-track {
        border-radius: 8px;
        background-color: transparent;
        border: 1px solid transparent;
      }

      ::-webkit-scrollbar-thumb,
      *::-webkit-scrollbar-thumb {
        border-radius: 8px;
        background-color: #616161;
      }
    `,
    controllerContent: css`
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      background: transparent;
      display: none;
    `,
    controllerContentEnable: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    `,
    headController: css`
      background: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
      width: 100%;
      // height: 16%;
      // min-height: 50px;
      min-height: 60px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      box-sizing: border-box;
      padding: 8px 12px;
      overflow: hidden;
      animation-name: fadeInDown;
    `,
    headControllerTitle: css`
      width: 80%;
      font-size: 1.3rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `,
    bodyController: css`
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      background: transparent;
      width: 100%;
      flex: 1;
      box-sizing: border-box;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    `,
    settingsContainer: css`
      position: absolute;
      bottom: 80px; // bottomHeight
      right: 12px;
      border-radius: 8px;
      background-color: rgba(0, 0, 0, 0.64);
      backdrop-filter: blur(25px);
      display: flex;
      flex-direction: column;
      gap: 0px;
      max-height: calc(86% - 80px);
      overflow: hidden;
      outline: none;
      border: none;
      box-shadow: none;
    `,
    settingsContainerMask: css`
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: transparent;
      pointer-events: none;
    `,
    settingsContent: css`
      min-width: 300px;
      max-width: 320px;
      overflow-y: auto;
    `,
    settingHeader: css`
      box-sizing: border-box;
      height: 48px;
      display: flex;
      padding: 8px 12px;
      align-items: center;
      gap: 12px;
      align-self: stretch;
      background-color: rgba(255, 255, 255, 0.04);
    `,
    settingItem: css`
      height: 48px;
      box-sizing: border-box;
      display: flex;
      padding: 8px 12px;
      align-items: center;
      gap: 12px;

      &:hover {
        background-color: rgba(255, 255, 255, 0.08);
        cursor: pointer;
      }
    `,
    settingDetailItem: css`
      height: 40px;
      box-sizing: border-box;
      display: flex;
      padding: 8px 12px;
      align-items: center;
      gap: 12px;

      &:hover {
        background-color: rgba(255, 255, 255, 0.08);
        cursor: pointer;
      }
    `,
    settingItemDivider: css`
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    `,
    settingTitleActive: css`
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 20px;
    `,
    settingTitleNormal: css`
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
    `,
    settingItemIcon: css`
      width: 24px;
      height: 24px;
      cursor: pointer;
    `,
    settingItemIconSecondary: css`
      width: 20px;
      height: 20px;
      color: rgba(255, 255, 255, 0.64);
    `,
    settingItemTitle: css`
      flex: 1;
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 20px;
      cursor: pointer;
    `,
    settingItemValue: css`
      display: flex;
      align-items: center;
      gap: 8px;
      white-space: nowrap;
      word-wrap: normal;
      text-overflow: ellipsis;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
    `,
    buttonPrimary: css`
      color: white;

      background: rgba(0, 0, 0, 0.48);
      backdrop-filter: blur(25px);
      border-radius: 50%;
      width: 56px;
      height: 56px;
      cursor: pointer;
      color: white;
      display: none;
      padding: 8px;
      box-sizing: border-box;
      cursor: pointer;
    `,
    buttonPrimaryEnable: css`
      animation: zoomIn;
      animation-duration: 0.2s;
      display: block;
      // display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      // &:hover {
      //   box-shadow: 0px 0px 8px 8px rgba(0, 0, 0, 0.3);
      // }
    `,
    footerController: css`
      background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
      width: 100%;
      // height: 20%;
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      min-height: 80px;
      padding: 8px 12px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      overflow: hidden;
    `,
    seekBarController: css`
      width: 100%;
      height: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
    `,
    progressContainer: css`
      height: 8px;
      width: 100%;
      position: relative;
      background-color: rgba(255, 255, 255, 0.24);
      border-radius: 8px;
      margin-top: 10px;
      cursor: pointer;
    `,
    progressBuffer: css`
      position: absolute;
      width: var(--highlight-width-progress-buffer);
      height: 100%;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 8px;
      z-index: 1;
    `,
    progressBar: css`
      position: absolute;
      width: var(--highlight-width-progress-bar);
      height: 100%;
      background-color: ${primaryColor};
      opacity: 1;
      z-index: 1;
      border-radius: 5px;
    `,
    progressThumb: css`
      position: absolute;
      left: var(--highlight-left-progress-thumb);
      margin-left: -4px;
      height: 16px;
      width: 16px;
      background-color: ${primaryColor};
      opacity: 1;
      border-radius: 50%;
      top: -3.5px;
      cursor: pointer;
      z-index: 1;
    `,

    taskbarController: css`
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    `,
    taskbarGroup: css`
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
    `,
    taskbarGroupBtn: css`
      width: 40px;
      height: 40px;
      padding: 2px;
      box-sizing: border-box;
      display: none;
      border-radius: 50%;
      cursor: pointer;
      // &:hover {
      //   box-shadow: 0px 0px 8px 8px rgba(255, 255, 255, 0.1);
      //   background: rgba(255, 255, 255, 0.1);
      // }
    `,
    taskbarIconActive: css`
      color: ${primaryColorDef};
    `,
    taskbarGroupBtnEnable: css`
      display: flex;
      display: block;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    `,
    taskbarVolumeContainer: css`
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0px;
    `,
    taskbarTimeBarContainer: css`
      display: none;
    `,
    taskbarTimeBarContainerEnable: css`
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0px;
      font-size: 12px;
      gap: 4px;
    `,
    taskbarLiveStream: css`
      display: none;
    `,
    liveStreamDot: css`
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: red;
      margin-right: 4px;
      box-shadow: 0px 0px 4px 4px rgba(255, 0, 0, 0.2);
    `,
    taskbarLiveStreamEnable: css`
      display: none;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0px;
      font-size: 12px;
      gap: 4px;
    `,
    taskbarTimeCurrent: css``,
    taskbarTimeDuration: css``,
    smSelectVolumeRangeContainer: css`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding-left: 8px;
    `,
    taskbarVolumeSliderEnable: css`
      cursor: pointer;
      height: 40px;
      display: block !important;
      width: 100%;
      animation: scaleUpHorizontalLeft 0.1s ease-in-out forwards;
    `,
    taskbarVolumeSlider: css`
      height: 40px;
      display: none;
      width: 0px;
      animation: scaleDownHorizontalLeft 0.1s ease-in-out forwards;
      -webkit-appearance: none;
      height: 6px;
      border-radius: 16px;
      background: #ddd;
      outline: none;
      opacity: 0.7;
      transition: opacity 0.2s;
      position: relative;
      overflow: visible;

      ::-webkit-slider-runnable-track {
        width: 100%;
        border-radius: 18px;
        height: 6px;
        cursor: pointer;
        background: #ddd;
      }

      ::-moz-range-track {
        width: 100%;
        height: 6px;
        cursor: pointer;
        background: #ddd;
      }

      ::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 16px;
        height: 16px;
        margin-top: -4px;
        border-radius: 50%;
        background: ${primaryColor};
        cursor: pointer;
        box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5);
        position: relative;
        z-index: 2;
      }

      ::-moz-range-thumb {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: ${primaryColor};
        cursor: pointer;
        box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5);
        position: relative;
        z-index: 2;
      }

      ::before {
        content: '';
        height: 100%;
        width: var(--highlight-width);
        background: ${primaryColor};
        position: absolute;
        left: 0;
        border-radius: 18px;
        top: 0;
        z-index: 1;
      }

      :hover {
        opacity: 1;
      }
    `,
    loadingContainer: css`
      background: rgb(119 119 119 / 50%);
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      overflow: hidden;
      display: none;
    `,
    loadingContainerEnable: css`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    `,
    errorContainer: css`
      background: rgb(119 119 119 / 50%);
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 1;
      overflow: hidden;
      display: none;
    `,
    errorContainerEnable: css`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 40px;
    `,
    errorIconWrap: css`
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
    `,
    flexColumnStartCenter: css`
      display: column;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
    `,
  };
};
export default generateStyles;
