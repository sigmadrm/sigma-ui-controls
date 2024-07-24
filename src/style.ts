import { css } from '@emotion/css';
import { TGenerateStylesProps } from './type';
import { primaryColorDef } from './constants';
const generateStyles = (props?: TGenerateStylesProps) => {
  const { primaryColor = primaryColorDef, logo } = props || {};
  return {
    container: css`
      background: transparent;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 9999;
      overflow: hidden;
    `,
    //
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
    contentHead: css`
      background: transparent;
      width: 100%;
      height: 5%;
      min-height: 50px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      box-sizing: border-box;
      padding: 8px;
      overflow: hidden;
    `,
    contentHeadTitle: css`
      width: 80%;
      font-size: 1.3rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `,
    contentBody: css`
      width: 100%;
      flex: 1;
      background: transparent;
      box-sizing: border-box;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    `,
    contentBodyBtnPlay: css`
      box-shadow: 0px 0px 8px 8px rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(25px);
      border-radius: 50%;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: white;
    `,
    contentFooter: css`
      width: 100%;
      height: 5%;
      min-height: 50px;
      background: green;
      box-sizing: border-box;
    `,
    loading: css`
      background: rgb(119 119 119 / 50%);
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 9999;
      overflow: hidden;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    `,
    loadingDisable: css`
      display: none;
    `,
    error: css`
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
    errorEnable: css`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    `,
  };
};
export default generateStyles;
