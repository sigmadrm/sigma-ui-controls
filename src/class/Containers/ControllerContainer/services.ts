import { ids } from '../../../constants';
import { forwardIcon, muteIcon, pausedIcon, playIcon, replyIcon, volumeIcon } from '../../../icons';
import generateStyles from '../../../style';

export const generateHtmlTaskbarControllerString = (classes: ReturnType<typeof generateStyles>) => {
  return `<div class=${classes.taskbarGroup}>
      <div class=${classes.taskbarGroupBtn}  id=${ids.smButtonPlaySecondary}>${playIcon}</div>
     <div class=${classes.taskbarGroupBtn}>${pausedIcon}</div>
     <div class=${classes.taskbarGroupBtn}>${replyIcon}</div>
     <div class=${classes.taskbarGroupBtn}>${forwardIcon}</div>
     <div class=${classes.taskbarGroupBtn}>${volumeIcon}</div>
     <div class=${classes.taskbarGroupBtn}>${muteIcon}</div>
  </div>
  <div>
      <div class=${classes.taskbarGroupBtn} id=${ids.smButtonFullScreen}></div>
  </div>`;
};
