/* eslint-disable no-undef */
const initPlayer = async () => {
  const video1 = document.getElementById('video1');
  const video2 = document.getElementById('video2');
  if (video1) {
    const player1 = new shaka.Player(video1);
    const uiPlayer1 = new SmUIControls({
      player: player1,
      video:video1,
      idVideoContainer: 'video-container1',
      videoInfo: {
        name: 'Video1',
      },
      style: {
        primaryColor: '#ff7a00',
        logo: 'https://videoguard-dev.spilot.io/assets/images/logo_brand.svg',
      },
    });
   
    player1.addEventListener('error', (event) => {
      console.error('Error code1', event.detail.code, 'object', event.detail);
    });
    uiPlayer1.on('loaded', () => {
      console.log('Loaded video1');    
    },this);

    try {
      // Thêm URL của video bạn muốn phát
      // await player.load('https://live-on-v2-akm.akamaized.net/manifest/test_live/master.m3u8');
      await player1.load('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
      console.log('The video1 has now been loaded!');
    } catch (e) {
      console.error('Error code1', e.code, 'object', e);
    }
  }
  if (video2) {
    const player2 = new shaka.Player(video2);
  
    const uiPlayer2 = new SmUIControls({
      player: player2,
      video:video2,
      idVideoContainer: 'video-container2',
      videoInfo: {
        name: 'Video2',
      },
      style: {
        primaryColor: '#ff7a00',
        logo: 'https://videoguard-dev.spilot.io/assets/images/logo_brand.svg',
      },
    });
    player2.addEventListener('error', (event) => {
      console.error('Error code2', event.detail.code, 'object', event.detail);
    });
    uiPlayer2.on('loaded', () => {
      console.log('Loaded video2');    
    },this);

    try {
      // Thêm URL của video bạn muốn phát
      await player2.load('https://live-on-v2-akm.akamaized.net/manifest/test_live/master.m3u8');
      console.log('The video2 has now been loaded!');
    } catch (e) {
      console.error('Error code2', e.code, 'object', e);
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
