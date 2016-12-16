import ImageClassifierProxy from './ImageClassifierProxy'
import ImageClassifier1 from './ImageClassifier1'
import ImageClassifier2 from './ImageClassifier2'

export { ImageClassifierProxy }
export const DefaultImageClassifier = ImageClassifier2

window.DefaultImageClassifier = DefaultImageClassifier
window.ImageClassifier1 = ImageClassifier1
window.ImageClassifier2 = ImageClassifier2

// TODO create multiple models and train at the same time
// Model interface:
//   the model will be saved to models/<MODEL NAME>.json
//   Input : 320x240x1
//   Output: 4 classes
