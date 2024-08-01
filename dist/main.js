/* eslint-disable no-undef */
const initPlayer = async () => {
  const video = document.getElementById('video');

  if (video) {
    const player = new shaka.Player(video);
    const uiPlayer = new SmUIControls({
      player,
      video,
      idVideoContainer: 'video-container',
      videoInfo: {
        name: 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      },
      style: {
        primaryColor: '#ff7a00',
        logo: 'https://videoguard-dev.spilot.io/assets/images/logo_brand.svg',
      },
    });
    player.addEventListener('error', (event) => {
      console.error('Error code', event.detail.code, 'object', event.detail);
    });
    uiPlayer.on('loaded', () => {
      console.log('Loaded');    
    },this);

    try {
      // Thêm URL của video bạn muốn phát
      await player.load('https://live-on-v2-akm.akamaized.net/manifest/test_live/master.m3u8');
      // await player.load('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
      console.log('The video has now been loaded!');
    } catch (e) {
      console.error('Error code', e.code, 'object', e);
    }
  }
};

function initApp() {
  // Install built-in polyfills to patch browser incompatibilities.
  shaka.polyfill.installAll();

  // Check to see if the browser supports the basic APIs Shaka needs.
  if (shaka.Player.isBrowserSupported()) {
    // Everything looks good!
    initPlayer();
  } else {
    // This browser does not have the minimum set of APIs we need.
    console.error('Browser not supported!');
  }

}
document.addEventListener('DOMContentLoaded', initApp);
