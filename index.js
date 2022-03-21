// import trainingText from './text.js'

document.getElementById('#main-text').innerHTML = trainingText;
console.log("Building ------------------------------------------");
const markov = new MarkovTextGenerator(2);
markov.setTrainingText(trainingText.replace("\n", " "));


for (let i = 0; i < 5; i++) {
  const generatedText = markov.generateText(15);
  console.log("\nGenerated:", generatedText);
  let textElement = document.getElementById('#generated').appendChild(document.createElement('p'))
  textElement.innerHTML = generatedText;
}
