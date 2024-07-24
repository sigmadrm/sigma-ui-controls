import { ids } from '../../constants';
import { forwardIcon, fullScreenIcon, muteIcon, pausedIcon, playIcon, replyIcon, volumeIcon } from '../../icons';
import generateStyles from '../../style';

export const generateHtmlHeadControllerString = (classes: ReturnType<typeof generateStyles>, videoName?: string) => {
  return `${
    videoName &&
    `<p class=${classes.headControllerTitle}>${videoName}
    </p>`
  }`;
};
export const generateHtmlBodyControllerString = (classes: ReturnType<typeof generateStyles>) => {
  return `<div class=${classes.bodyControllerButtonPrimary} id=${ids.smBodyControllerButtonPrimary}>${playIcon}</div>`;
};
export const generateHtmlFooterControllerString = (classes: ReturnType<typeof generateStyles>) => {
  return `<div class=${classes.seekBarController} id=${ids.smSeekBarController}></div>
  <div class=${classes.taskbarController} id=${ids.smTaskbarController}></div>`;
};

export const generateHtmlTaskbarControllerString = (classes: ReturnType<typeof generateStyles>) => {
  return `<div class=${classes.taskbarGroup}>
      <div class=${classes.taskbarGroupBtn}>${playIcon}</div>
     <div class=${classes.taskbarGroupBtn}>${pausedIcon}</div>
     <div class=${classes.taskbarGroupBtn}>${replyIcon}</div>
     <div class=${classes.taskbarGroupBtn}>${forwardIcon}</div>
     <div class=${classes.taskbarGroupBtn}>${volumeIcon}</div>
     <div class=${classes.taskbarGroupBtn}>${muteIcon}</div>
  </div>
  <div>
      <div class=${classes.taskbarGroupBtn}>${fullScreenIcon}</div>
  </div>`;
};
