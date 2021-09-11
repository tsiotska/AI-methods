console.log("Ant col opt")
let colony, graph

// Ініціалізація вхідних даних та початок ітерацій обходження графа колонією мурах
initInputData = () => {
  let ants = parseInt(getElement('ants').value, 10) || 20;
  let nodes = parseInt(getElement('nodes').value, 10) || 20;
  let maxDistance = parseInt(getElement('max-distance').value, 10) || 15;
  let iterations = parseInt(getElement('iterations').value, 10) || 100;
  let alpha = parseInt(getElement('alpha').value) || 1.0;
  let beta = parseInt(getElement('beta').value) || 2.0;
  let pho = parseInt(getElement('pho').value) || 0.1;
  let pheromones = parseInt(getElement('pheromones').value) || 1.0;
  let Q = parseInt(getElement('Q').value) || 1.0;
  generateGraph(nodes, maxDistance)

  colony = new Colony(ants, iterations, graph.adjacencyList, alpha, beta, pho, pheromones, Q);

  colony.initialise();
  colony.setOnNewBest(onNewBest);
  colony.iterate();
}

// Випадкова генерація графа та його відрисування
generateGraph = (nodesCount, maxDistance) => {
  graph = new Graph()
  const points = []
  for (let i = 0; i < nodesCount; i++) {
    points.push(randomPoint(maxDistance))
  }
  redrawCanvas(points)
}

// Перерисування графа
redrawCanvas = (points) => {
  graph.clearCanvas();
  graph.addPoints(points)
}

// Генерація випадкової вершини
randomPoint = (maxDistance) => {
  return {x: getRandomArbitrary(1, maxDistance), y: getRandomArbitrary(1, maxDistance)}
}

// Виводить найкращий знайдений результат (порядок ітерації, порядок номерів вершин та найкращий шлях)
// І перерисовує візуалізацію
onNewBest = (i, visitedNodes, length) => {
  const lineColor = 'red'
  redrawCanvas(graph.points)

  for (let i = 0; i < visitedNodes.length - 1; i++) {
    let currentNode = visitedNodes[i]
    let nextNode = visitedNodes[i + 1]
    graph.drawLine(graph.points[currentNode], graph.points[nextNode], lineColor)
  }

  getElement('best-iteration').innerHTML = i
  getElement('best-path').innerHTML = visitedNodes
  getElement('best-length').innerHTML = length
}

getRandomArbitrary = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

getElement = (className) => {
  return document.getElementsByClassName(className)[0]
}
// Натисненням на кнопку СТАРТ викликає обробник, ініціалізує дані та запускає ітерацію
document.getElementById('start').addEventListener('click', initInputData)
