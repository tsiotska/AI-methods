class BinaryAdaptiveResonance {
  constructor() {
    this.featureVectors = [];
    this.prototypes = [];
    this.recommendations = []
    this.d = 5;
    this.p = 0.4;
    this.b = 0.2;
  }

  learn(featureVectors) {
    this.featureVectors = featureVectors
    featureVectors.forEach((featureVector, featureVectorIndex) => {
      this.clusterify(featureVector, featureVectorIndex)
    });
    return this.prototypes;
  }

  clusterify(featureVector, featureVectorIndex) {
    if (!this.prototypes.length) {
      // Додаємо прототип з першого вектора ознак
      this.prototypes.push({vector: featureVector, descendants: [featureVectorIndex]})
    } else {
      this.verifyFeatureVector(featureVector, featureVectorIndex)
    }
  }

  verifyFeatureVector(featureVector, featureVectorIndex) {
    let descendants = [featureVectorIndex]
    for (let index = 0; index < this.prototypes.length; index++) {
      const prototypeVector = this.prototypes[index].vector
      if (this.verifyProximity(prototypeVector, featureVector) && this.verifyQuantity(prototypeVector, featureVector)) {
        descendants = descendants.concat(this.prototypes[index].descendants)
        this.prototypes[index] = {
          vector: Vector.multiply(prototypeVector, featureVector),
          descendants: descendants
        }
        break;
        // Якщо для даного вектора ознак не знайдено вектор прототип
      } else if (index === this.prototypes.length - 1) {
        this.prototypes.push({vector: featureVector, descendants: descendants})
        break;
      }
    }
  }

  verifyProximity(prototype, featureVector) {
    const A = Vector.evaluate(Vector.multiply(prototype, featureVector)) / (this.b + Vector.evaluate(prototype))
    const B = Vector.evaluate(featureVector) / (this.b + this.d)
    return A > B
  }

  verifyQuantity(prototype, featureVector) {
    const A = Vector.evaluate(Vector.multiply(prototype, featureVector)) / Vector.evaluate(featureVector)
    return A >= this.p
  }

  personalization() {
    for (let index = 0; index < this.featureVectors.length; index++) {
      const expProto = this.prototypes.find(({descendants}) => descendants.includes(index))
      const cluster = []
      // формуємо групу векторів ознак, що стосуються одного прототипу
      expProto.descendants.forEach((featureVectorIndex) => {
        cluster.push(this.featureVectors[featureVectorIndex])
      })
      const sum = Vector.sum(cluster)
      this.selectRecommendation(sum, this.featureVectors[index])
    }
    return this.recommendations
  }

  selectRecommendation(sumVector, featureVector) {
    // якщо вектор ознак вже має елемент то в сумі встановлюємо нуль
    let recommendations = sumVector.map((value, index) => {
      return featureVector[index] === 0 ? value : 0
    })
    // maxValue не може бути нулем
    const maxValue = Math.max(...recommendations) || 1
    // перетворюємо найбільше значення в true, а решту в false
    this.recommendations.push(recommendations.map((value) => value === maxValue))
  }
}
