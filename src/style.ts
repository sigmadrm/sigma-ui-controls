import { css } from '@emotion/css';
import { TGenerateStylesProps } from './type';
import { primaryColorDef } from './constants';
const generateStyles = (props?: TGenerateStylesProps) => {
  const { primaryColor = primaryColorDef, logo } = props || {};
  return {
    container: css`
      border: 1px solid ${primaryColor};
      background: transparent;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 9999;
      overflow: hidden;
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
      height: 16%;
      min-height: 50px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      box-sizing: border-box;
      padding: 8px 32px;
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
      background: transparent;
      width: 100%;
      flex: 1;
      box-sizing: border-box;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    `,
    buttonPlayPrimary: css`
      box-shadow: 0px 0px 8px 8px rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(25px);
      border-radius: 50%;
      width: 50px;
      height: 50px;
      cursor: pointer;
      color: white;
      display: none;
    `,
    buttonPlayPrimaryEnable: css`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      &:hover {
        box-shadow: 0px 0px 8px 8px rgba(0, 0, 0, 0.3);
      }
    `,
    footerController: css`
      background: linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
      width: 100%;
      // height: 20%;
      // min-height: 50px;
      padding: 12px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      overflow: hidden;
    `,
    seekBarController: css`
      background: green;
      width: 100%;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
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
      gap: 12px;
    `,
    taskbarGroupBtn: css`
      box-sizing: border-box;
      width: 40px;
      height: 40px;
      display: none;
      padding: 4px;
    `,
    taskbarGroupBtnEnable: css`
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    `,
    loadingContainer: css`
      background: rgb(119 119 119 / 50%);
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 9999;
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
      z-index: 9999;
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
