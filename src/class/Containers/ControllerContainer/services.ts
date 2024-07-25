import { ids } from '../../../constants';
import { forwardIcon, muteIcon, pausedIcon, playIcon, replyIcon, volumeIcon } from '../../../icons';
import generateStyles from '../../../style';

export const generateHtmlTaskbarControllerString = (classes: ReturnType<typeof generateStyles>) => {
  return `<div class=${classes.taskbarGroup}>
      <div class=${classes.taskbarGroupBtn} id=${ids.smButtonPlaySecondary}></div>
     <div class=${classes.taskbarGroupBtn} id=${ids.smButtonPauseSecondary}></div>
     <div class=${classes.taskbarGroupBtn} id=${ids.smButtonReply}></div>
     <div class=${classes.taskbarGroupBtn} id=${ids.smButtonForward}></div>
     <div class=${classes.taskbarGroupBtn}>${volumeIcon}</div>
     <div class=${classes.taskbarGroupBtn}>${muteIcon}</div>
  </div>
  <div class=${classes.taskbarGroup}>
      <div class=${classes.taskbarGroupBtn} id=${ids.smButtonFullScreen}></div>
      <div class=${classes.taskbarGroupBtn} id=${ids.smButtonExitFullScreen}></div>
  </div>`;
};
