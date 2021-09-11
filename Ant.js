class Ant {
  constructor(alpha, beta, Q) {
    this.alpha = alpha;
    this.beta = beta;
    this.Q = Q || 1;
    this.baseNode = 0;
    this.visitedNodes = [];
    this.walkLength = null;
  }

  // Виконує обходження вершин мурахою на ітерації
  doWalk(distances, pheromones) {
    this.visitedNodes = [this.baseNode];
    this.walkLength = null;
    for(let i = 1; i < distances.length; i++) {
      this.visitedNodes.push(this.chooseNext(this.visitedNodes[i-1], distances, pheromones));
    }
    this.visitedNodes.push(this.visitedNodes[0]);
    this.walkLength = this.calculateWalkLength(distances);
  }

  // Алгоритм за яким мураха обирає наступну вершину
  chooseNext(currentNode, distances, pheromones) {
    let sumall = 0;
    let unvisited = [];
    for(let i = 0; i < distances.length; i++) {
      if (this.visitedNodes.indexOf(i) === -1) {
        unvisited.push(i);
      }
    }

    for(let i = 0; i < pheromones.length; i++) {
      if (i !== currentNode && unvisited.indexOf(i) !== -1) {
        sumall += Math.pow(pheromones[currentNode][i], this.alpha) * Math.pow((1/distances[currentNode][i]), this.beta);
      }
    }

    let probs = [];
    let summul = 0;
    for(let i = 0; i < distances[currentNode].length; i++) {
      if (i !== currentNode && unvisited.indexOf(i) !== -1) {
        let mul = Math.pow(pheromones[currentNode][i], this.alpha) * Math.pow((1/distances[currentNode][i]), this.beta);
        probs.push(mul/sumall);
        summul += mul;
      }
    }

    let rnd = Math.random();
    let x = 0;
    let tally = probs[x];
    while (rnd > tally && x < probs.length - 1) {
      tally += probs[++x];
    }

    return unvisited[x];
  }

  // Розрахунок пройденого шляху
  calculateWalkLength(distances) {
    let lenght = 0;
    for(let i = 1; i < this.visitedNodes.length; i++) {
      lenght += distances[this.visitedNodes[i-1]][this.visitedNodes[i]];
    }
    return lenght;
  }

  // Чим більше мураха проходить шляху тим менше залишає феромона
  layPheromones(pheromones) {
    for(let i = 1; i < this.visitedNodes.length; i++) {
      pheromones[this.visitedNodes[i-1]][this.visitedNodes[i]] += (1/this.walkLength) * this.Q;
      pheromones[this.visitedNodes[i]][this.visitedNodes[i-1]] += (1/this.walkLength) * this.Q;
    }
  }
}
