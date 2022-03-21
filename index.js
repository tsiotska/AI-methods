const BAR = new BinaryAdaptiveResonance();

const inputData = [
  [1, 1, 1, 0, 0],
  [0, 1, 0, 1, 0],
  [1, 0, 0, 0, 1],
  [0, 1, 1, 1, 0],
  [0, 1, 1, 0, 0],
  [0, 1, 0, 1, 1],
  [1, 0, 0, 0, 1],
  [0, 1, 1, 1, 0],
  [1, 1, 0, 0, 1],
  [1, 1, 1, 0, 1],
  [1, 1, 0, 1, 0]
]
/*console.log('input data');
console.log(inputData);*/

inputData.forEach((featureVector) => {
  const tag = document.getElementById('feature-vectors').appendChild(document.createElement('p'))
  tag.innerText = featureVector
})

// clusters which was prepared on last `learn` call
const clusters = BAR.learn(inputData);
clusters.forEach(({vector, descendants}) => {
  const vectorTag = document.getElementById('proto-vectors').appendChild(document.createElement('p'))
  const descendantsTag = document.getElementById('proto-vectors').appendChild(document.createElement('p'))
  vectorTag.innerText = vector
  descendantsTag.innerText = "Descendants:" + " " + descendants
})
const recommendations = BAR.personalization()
console.log('recommendations');
console.log(recommendations);

const productsTag = document.getElementById('recommendations').appendChild(document.createElement('div'))
productsTag.classList.add('product-container')
for (let i = 0; i < recommendations[0].length; i++) {
  const productSingleTag = productsTag.appendChild(document.createElement('label'))
  productSingleTag.classList.add('product-label')
  let productNumber = i
  productSingleTag.innerText = "Product " + ++productNumber
}

recommendations.forEach((vector, index) => {
  const vectorTag = document.getElementById('recommendations').appendChild(document.createElement('div'))
  vectorTag.classList.add('recommendation-vector')
  const labelTag = vectorTag.appendChild(document.createElement('label'))
  labelTag.classList.add('recommendation-label')
  labelTag.innerText = ++index
  vector.forEach((item) => {
    const itemTag = vectorTag.appendChild(document.createElement('div'))
    itemTag.classList.add('recommendation-item')
    itemTag.innerText = item ? '+' : '-'
  })
})
/*console.log('clusters:');
console.log(clusters);*/

