class Vector {
  static evaluate(data) {
    return data.reduce((acc, value) => acc += value)
  }

  static multiply(vectorA, vectorB) {
    return vectorA.map((value, i) => value * vectorB[i])
  }

  static sum(vectors) {
    return vectors.reduce((sumVector, nextVector) => sumVector.map((elem, i) => elem += nextVector[i]))
  }
}
