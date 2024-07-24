import { loadingIcon, playIcon } from './icons';
import { ETypePlayer, ids, typePlayerDef, versionDef } from './constants';
import generateStyles from './style';
import { IConfigureUIPlayerProps, IGenerateHtmlContentStringPros } from './type';
import './index.css';

const generateApiPlayer = (
  player: any,
  video: HTMLVideoElement | null | undefined,
  typePlayer: ETypePlayer,
  version?: string,
) => {
  const apiPlayer: { [key: string]: any } = {
    play: () => video?.play(),
    pause: () => video?.pause(),
  };
  if (typePlayer === ETypePlayer.SHAKA) {
    apiPlayer.play = () => video?.play();

    if (version) {
      //check version
    }
  }
  return apiPlayer;
};

const classes = generateStyles();

const generateHtmlContentString = (props?: IGenerateHtmlContentStringPros) => {
  const { videoName } = props || {};
  return `
  <div class=${classes.controllerContent}  id=${ids.smControllerContent}>
    <div class=${classes.contentHead} id=${ids.smContentHead}>
    ${
      videoName &&
      `<p class=${classes.contentHeadTitle}>${videoName}
      </p>`
    }
      </div>
    <div class=${classes.contentBody} id=${ids.smContentBody}>
      <div class=${classes.contentBodyBtnPlay} id=${ids.smContentBodyBtnPlay}>${playIcon}</div>
    </div>
    <div class=${classes.contentFooter} id=${ids.smContentFooter}>footer</div>
  </div>
  <div class=${classes.loading} id=${ids.smLoading}>
    ${loadingIcon}
  </div>
  <div class=${classes.error} id=${ids.smError}>
    error
  </div>
  `;
};
class SmUIControls {
  private apiPlayer: { [key: string]: any } = {
    play: () => Promise<void> || undefined,
    pause: () => Promise<void> || undefined,
  };
  private isInit: boolean = false;

  constructor(props: IConfigureUIPlayerProps) {
    const {
      player,
      video,
      idVideoContainer,
      typePlayer = typePlayerDef,
      version = versionDef,
      videoInfo,
      style,
    } = props;

    const htmlContentString = generateHtmlContentString({
      videoName: videoInfo?.name,
    });
    const apiPlayer = generateApiPlayer(player, video, typePlayer, version);
    this.apiPlayer = apiPlayer;
    const VideoContainerElement = document.getElementById(idVideoContainer);

    if (!this.isInit) {
      this.isInit = true;
      if (VideoContainerElement) {
        VideoContainerElement.style.position = 'relative';
        const smControllerContainerEle = document.createElement('div');
        smControllerContainerEle.className = classes.container;
        smControllerContainerEle.id = ids.smControllerContainer;
        smControllerContainerEle.innerHTML = htmlContentString;
        VideoContainerElement.appendChild(smControllerContainerEle);
        const bodyBtnPlayEle = document.getElementById(ids.smContentBodyBtnPlay);
        bodyBtnPlayEle?.addEventListener('click', () => {
          apiPlayer.play();
        });
        const loadingContainerEle = document.getElementById(ids.smLoading);
        const contentControllerEle = document.getElementById(ids.smControllerContent);
        const errorEle = document.getElementById(ids.smError);
        //xử lý khi loaded sãn sàng play
        player.addEventListener('loaded', (event: any) => {
          console.log('loaded', classes.controllerContentEnable);
          loadingContainerEle?.classList.add(classes.loadingDisable);
          contentControllerEle?.classList.add(classes.controllerContentEnable);
        });
        // xử lý khi có lỗi
        player.addEventListener('error', (event: any) => {
          console.log('error', classes.controllerContentEnable, event);
          loadingContainerEle?.classList.add(classes.loadingDisable);
          contentControllerEle?.classList.remove(classes.controllerContentEnable);
          errorEle?.classList.add(classes.errorEnable);
        });
      }
    }
  }

  static get version(): string {
    // @ts-ignore
    return __VERSION__;
  }

  destroy() {
    this.apiPlayer = {};
    this.isInit = false;
  }
}

export default SmUIControls;
