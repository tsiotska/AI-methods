class Graph {
  constructor() {
    this.canvas = document.querySelector('#canvas');
    this.adjacencyList = [];
    this.points = []
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(source, destination, weight) {
    if (!this.adjacencyList[source]) {
      this.addVertex(source);
    }
    if (!this.adjacencyList[destination]) {
      this.addVertex(destination);
    }
    this.adjacencyList[source][destination] = weight;
    this.adjacencyList[destination][source] = weight;
  }

  addPoints(points) {
    this.points = points
    const lineColor = 'blue'
    for (let i = 0; i < points.length; i++) {
      this.drawPoint(points[i])
      for (let j = i; j < points.length; j++) {
        if (i === j) {
          this.addEdge(i, j, 0)
        } else {
          let distance = Math.sqrt(
            Math.pow(points[i].x - points[j].x, 2) + Math.pow(points[i].y - points[j].y, 2)
          )
          this.addEdge(i, j, distance)
          this.drawLine(points[i], points[j], lineColor)
        }
      }
    }
  }

  drawPoint(point) {
    const ctx = this.canvas.getContext('2d');
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI, true);
    ctx.stroke();
  }

  drawLine(pointA, pointB, color) {
    const ctx = this.canvas.getContext('2d');
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pointA.x, pointA.y);
    ctx.lineTo(pointB.x, pointB.y);
    ctx.stroke();
  }

  clearCanvas() {
    const ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}
