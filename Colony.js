const TIMEOUT = 500; // час між ітераціями (для повільнішого рисування графа)

class Colony {
  constructor(popSize, maxIterations, distances, alpha, beta, pho, ip, Q) {
    this.popSize = popSize;
    this.maxIterations = maxIterations;
    this.distances = distances;

    this.alpha = alpha;
    this.beta = beta;
    this.pho = pho;
    this.Q = Q;
    this.ip = ip;

    this.population = [];
    this.pheromones = [];
    this.bestLength = null;
    this.bestSolution = null;
    this.continue = false;

    this.onNewBest = null;
  }

  setOnNewBest(onNewBest) {
    this.onNewBest = onNewBest;
  }
  // Ініціалізація мурах та феромонів
  initialise() {
    this.population = [];
    this.pheromones = [];
    this.bestSolution = null;
    this.continue = true;

    for (let i = 0; i < this.popSize; i++) {
      this.population[i] = new Ant(this.alpha, this.beta, this.Q);
    }

    for (let x = 0; x < this.distances.length; x++) {
      this.pheromones[x] = [];
      for (let y = 0; y < this.distances.length; y++) {
        if (x !== y) {
          this.pheromones[x][y] = this.ip;
        } else this.pheromones[x][y] = 0;
      }
    }
  }

  // Запускає ітерацію обходження вершин всією колонією
  iterate() {
    let x = 0, that = this;
    start(x);

    function start(x) {
      setTimeout(function () {
        x++;
        that.sendOutAnts();
        that.updatePheromones();
        that.daemonActions(x);
        if (x < that.maxIterations && that.continue) {
          start(x);
        }
      }, TIMEOUT);
    }
  }

  // Виконання кожною мурахою обходження
  sendOutAnts() {
    for (let i = 0; i < this.popSize; i++) {
      this.population[i].doWalk(this.distances, this.pheromones);
    }
  }
  // Випаровування феромонів та виклик функції оновлення феромонів після проходження кожної мурахи
  updatePheromones() {
    this.evaporatePheromones();
    for (let i = 0; i < this.popSize; i++) {
      this.population[i].layPheromones(this.pheromones);
    }
  }
  // феромони зменшуються (випаровування)
  evaporatePheromones() {
    for (let x = 0; x < this.distances.length; x++) {
      for (let y = 0; y < this.distances.length; y++) {
        if (x !== y) {
          this.pheromones[x][y] = (1 - this.pho) * this.pheromones[x][y];
        }
      }
    }
  }
  // Оновлення найкращого результату (ітерація, порядок обходження вершин, шлях)
  daemonActions(x) {
    for (let i = 0; i < this.popSize; i++) {
      if (!this.bestSolution || this.population[i].walkLength < this.bestLength) {
        this.bestSolution = JSON.parse(JSON.stringify(this.population[i].visitedNodes));
        this.bestLength = JSON.parse(JSON.stringify(this.population[i].walkLength));
        if (this.onNewBest) {
          this.onNewBest(x, this.bestSolution, this.bestLength);
        }
      }
    }
  }
}
