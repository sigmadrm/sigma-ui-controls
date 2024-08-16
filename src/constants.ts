import { Track } from './type';

export const versionDef = '4.10.0';

export enum ETypePlayer {
  SHAKA = 'SHAKA',
  VIDEOSJS = 'VIDEOSJS',
}
export const typePlayerDef = ETypePlayer.SHAKA;
export const primaryColorDef = '#F58220';
export const PLAYBACK_SPEEDS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
export const autoTrack: Track = { id: -1, label: 'Auto', bandwidth: 0, active: true };
