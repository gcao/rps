export default function toDataURI(data, width, height) {
  let image     = []
  let canvas    = document.createElement('canvas')
  canvas.width  = width
  canvas.height = height

  for (var i=0; i<width; i++) {
    for (var j=0; j<height; j++) {
      let pixelIndex = (i * 4) * height + j * 4
      image[pixelIndex] = image[pixelIndex + 1] = image[pixelIndex + 2] = data[i][j] * 255
      image[pixelIndex + 3] = 255
    }
  }

  canvas.getContext('2d').drawImage(image, 0, 0)

  return canvas.toDataURL('image/png')
}
