import { WIDTH, HEIGHT } from '.'

export default function capture(video, canvas) {
  let ctx = canvas.getContext('2d')
  ctx.drawImage(video, 0, 0)

  let imagePixels = ctx.getImageData(0, 0, WIDTH, HEIGHT)
  let image = []
  for (var i=0; i<WIDTH; i++) {
    image[i] = []
    for (var j=0; j<HEIGHT; j++) {
      var pixelIndex = (i * 4) * HEIGHT + j * 4
      // http://www.ajaxblender.com/howto-convert-image-to-grayscale-using-javascript.html
      var grayScale = (imagePixels.data[pixelIndex] + imagePixels.data[pixelIndex + 1] + imagePixels.data[pixelIndex + 2])/3
      image[i].push(grayScale)
    }
  }

  return image
}
