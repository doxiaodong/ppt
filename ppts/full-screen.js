function fullScreen() {
  const html = document.getElementsByTagName('html')[0]

  if (html.requestFullscreen) {
    html.requestFullscreen()
  }
  if (html.webkitRequestFullscreen) {
    html.webkitRequestFullscreen()
  }
  if (html.webkitRequestFullScreen) {
    html.webkitRequestFullScreen()
  }
  if (html.mozRequestFullScreen) {
    html.mozRequestFullScreen()
  }
}

