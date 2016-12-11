export default function capture(video, canvas) {
  if (!video || !canvas) {
    return
  }

  let data = null

  let ctx = canvas.getContext('2d')
  ctx.drawImage(video, 0, 0)

  let imagePixels = ctx.getImageData(0, 0, 320, 240)
  data = []
  for (var i=0; i<320; i++) {
    data[i] = []
    for (var j=0; j<240; j++) {
      var pixelIndex = (i * 4) * 240 + j * 4
      // http://www.ajaxblender.com/howto-convert-image-to-grayscale-using-javascript.html
      var grayScale = (imagePixels.data[pixelIndex] + imagePixels.data[pixelIndex + 1] + imagePixels.data[pixelIndex + 2])/3
      data[i].push(grayScale)
    }
  }

  return data
}
