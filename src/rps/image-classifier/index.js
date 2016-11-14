export ImageClassifierProxy from './ImageClassifierProxy'
import ImageClassifier2 from './ImageClassifier2'

// TODO create multiple models and train at the same time
// Model interface:
//   the model will be saved to models/<MODEL NAME>.json
//   Input : 320x240x1
//   Output: 4 classes

export var DefaultImageClassifier = ImageClassifier2
