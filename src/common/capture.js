import { WIDTH, HEIGHT } from '.'

export default function capture(video, canvas) {
  let ctx = canvas.getContext('2d')
  // http://stackoverflow.com/a/24260982
  ctx.scale(-1, 1)
  ctx.drawImage(video, 0, 0, -1 * WIDTH, HEIGHT)

  let imagePixels = ctx.getImageData(0, 0, WIDTH, HEIGHT)
  let image = []
  for (var i=0; i<WIDTH; i++) {
    image[i] = []
    for (var j=0; j<HEIGHT; j++) {
      var pixelIndex = (i * 4) * HEIGHT + j * 4
      // http://www.ajaxblender.com/howto-convert-image-to-grayscale-using-javascript.html
      var grayScale = (imagePixels.data[pixelIndex] + imagePixels.data[pixelIndex + 1] + imagePixels.data[pixelIndex + 2])/3
      image[i].push(grayScale)
      imagePixels.data[pixelIndex] = imagePixels.data[pixelIndex + 1] = imagePixels.data[pixelIndex + 2] = grayScale
    }
  }

  ctx.putImageData(imagePixels, 0, 0)

  return image
}
