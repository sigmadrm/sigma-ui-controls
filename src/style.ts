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
      height: 80px;
      position: absolute;
      bottom: -80px;
      right: 0;
      left: 0;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      overflow: hidden;
      transition: 0.3s ease-in-out;
      padding: 8px 12px;
      overflow: hidden;
    `,
    footerControllerEnable: css`
      min-height: 80px;
      bottom: 0px;
      transition: 0.3s ease-in-out;
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
      border-radius: 8px 0px 0px 8px;
    `,
    progressThumb: css`
      position: absolute;
      left: calc(var(--highlight-left-progress-thumb) - 8px);
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
      rotate: 45deg;
      transition: rotate 1s;
    `,
    taskbarIconInactive: css`
      rotate: 0;
      transition: rotate 1s;
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
      width: 0px;
      height: 0px;
      overflow: hidden;
      transition: 0.2s ease-in-out;
    `,
    smSelectVolumeRangeContainerEnable: css`
      width: 100px;
      height: 6px;
      overflow: visible;
      transition: 0.2s ease-in-out;
      // animation: scaleUpHorizontalLeft 0.1s ease-in-out forwards;
    `,
    taskbarVolumeSlider: css`
      margin-left: 2px;
      height: 6px;
      width: 100%;
      -webkit-appearance: none;
      appearance: none;
      cursor: pointer;
      outline: none;
      border-radius: 15px;
      background: linear-gradient(
        to right,
        white var(--highlight-width),
        rgba(255, 255, 255, 0.24) var(--highlight-width)
      );
      ::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        /* creating a custom design */
        height: 16px;
        width: 16px;
        background-color: white;
        border-radius: 50%;
        border: none;
      }
      ::-moz-range-thumb {
        height: 16px;
        width: 16px;
        background-color: white;
        border-radius: 50%;
        border: none;
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
      .sm-loading-ss {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 0;
        margin: 0;
      }

      .sm-loading-ss .sm-ss-loading {
        display: inline-block;
        position: absolute;
        margin: auto;
        text-align: center;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
      }

      .sm-loading-ss .sm-ss-loading .sm-ss-container {
        width: 200px;
        height: 100px;
        overflow: hidden;
      }

      .sm-loading-ss .sm-ss-loading .sm-ss-circle {
        position: absolute;
        width: 100%;
        height: 200%;
        border-radius: 50%;
        overflow: hidden;
      }

      .sm-loading-ss .sm-ss-loading .sm-ss-top {
        -webkit-transform-origin: 50% 100%;
        transform-origin: 50% 100%;
      }

      .sm-loading-ss .sm-ss-loading .sm-ss-top .sm-ss-circle {
        box-shadow: inset 0 0 0 10px ${primaryColor};
      }

      .sm-loading-ss .sm-ss-loading .sm-ss-bottom {
        -webkit-transform-origin: 50% 0;
        transform-origin: 50% 0;
      }

      .sm-loading-ss .sm-ss-loading .sm-ss-bottom .sm-ss-circle {
        box-shadow: inset 0 0 0 10px ${primaryColor};
        top: -100px !important;
      }

      .sm-loading-ss .sm-ss-loading .sm-ss-large .sm-ss-container {
        width: 96px;
        height: 48px;
        margin-left: -48px;
      }

      .sm-loading-ss .sm-ss-loading .sm-ss-large .sm-ss-top .sm-ss-circle {
        box-shadow: inset 0 0 0 6px ${primaryColor};
      }

      .sm-loading-ss .sm-ss-loading .sm-ss-large .sm-ss-bottom .sm-ss-circle {
        box-shadow: inset 0 0 0 6px ${primaryColor};
        top: -48px !important;
      }

      .sm-loading-ss .sm-ss-loading .sm-ss-small .sm-ss-container {
        width: 24px;
        height: 12px;
        margin-left: -12px;
      }

      .sm-loading-ss .sm-ss-loading .sm-ss-small .sm-ss-top .sm-ss-circle {
        box-shadow: inset 0 0 0 2px ${primaryColor};
      }

      .sm-loading-ss .sm-ss-loading .sm-ss-small .sm-ss-bottom .sm-ss-circle {
        box-shadow: inset 0 0 0 2px ${primaryColor};
        top: -12px !important;
      }

      .sm-loading-ss .sm-ss-medium .sm-ss-container {
        width: 48px;
        height: 24px;
        margin-left: -12px;
      }

      .sm-loading-ss .sm-ss-medium .sm-ss-top .sm-ss-circle {
        box-shadow: inset 0 0 0 3px ${primaryColor};
      }

      .sm-loading-ss .sm-ss-medium .sm-ss-bottom .sm-ss-circle {
        box-shadow: inset 0 0 0 3px ${primaryColor};
        top: -24px !important;
      }

      .sm-loading-ss .sm-ss-loading .sm-ss-bottom,
      .sm-loading-ss .sm-ss-loading .sm-ss-top {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        -webkit-animation: 0.8s linear infinite ssrotate;
        animation: 0.8s linear infinite ssrotate;
      }
    `,
    loadingContainerEnable: css`
      display: flex !important;
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
