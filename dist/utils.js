function replaceAll(inputString, search, replacement) {
  let resultString = inputString;
  let index = resultString.indexOf(search);

  while (index !== -1) {
    resultString = resultString.substring(0, index) + replacement + resultString.substring(index + search.length);
    index = resultString.indexOf(search, index + replacement.length);
  }

  return resultString;
}

function log(info) {
  info = replaceAll(info, '\\', '');
  console.log(info);
  let logs = document.getElementById('logs');
  logs.innerHTML += '<li>' + info + '</li>';
  let listLogItems = logs.getElementsByTagName('li');
  if (listLogItems.length > 20) {
    logs.removeChild(listLogItems[0]);
  }
}

function toggleFullScreen(videoElement) {
  if (
    !document.fullscreenElement &&
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement &&
    !document.msFullscreenElement
  ) {
    if (videoElement.requestFullscreen) {
      videoElement.requestFullscreen();
    } else if (videoElement.mozRequestFullScreen) {
      videoElement.mozRequestFullScreen();
    } else if (videoElement.webkitRequestFullscreen) {
      videoElement.webkitRequestFullscreen();
    } else if (videoElement.msRequestFullscreen) {
      videoElement.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}
