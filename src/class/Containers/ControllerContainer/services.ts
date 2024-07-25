import { ids } from '../../../constants';
import generateStyles from '../../../style';

export const generateHtmlTaskbarControllerString = (classes: ReturnType<typeof generateStyles>) => {
  return `<div class=${classes.taskbarGroup}>
      <div class=${classes.taskbarGroupBtn} id=${ids.smButtonPlaySecondary}></div>
     <div class=${classes.taskbarGroupBtn} id=${ids.smButtonPauseSecondary}></div>
     <div class=${classes.taskbarGroupBtn} id=${ids.smButtonVolume}></div>
     <div class=${classes.taskbarGroupBtn} id=${ids.smButtonMute}></div>
  </div>
  <div class=${classes.taskbarGroup}>
      <div class=${classes.taskbarGroupBtn} id=${ids.smButtonFullScreen}></div>
      <div class=${classes.taskbarGroupBtn} id=${ids.smButtonExitFullScreen}></div>
  </div>`;
};
