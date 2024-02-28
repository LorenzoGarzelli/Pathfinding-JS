import Node from "./Node.js";
import startAnimation from "./animations/startAnimation.js";
import a_star from "./pathfinding-algorithms/a-start.js";
import bfs from "./pathfinding-algorithms/bfs.js";
import dijkstra from "./pathfinding-algorithms/dijkstra.js";

class Board {
  width;
  height;
  start = "";
  target = "";
  gridMatrix = [];
  nodesToAnimate = [];
  hasEnded = false;

  current_algorithm = "bfs"; //TODO think on default value

  constructor(width, height) {
    this.#init(width, height);

    this.#setupEventListeners();
  }
  #init(width, height) {
    this.width = width;
    this.height = height;
    this.#createGridTable(width, height);
  }

  #createGridTable(width, height) {
    const tableElement = document.querySelector(".table");

    const tbodyElement = document.createElement("tbody");
    for (let row = 0; row < height; row++) {
      let trElement = document.createElement("tr");
      trElement.id = `row-${row}`;

      let rowNodes = [];
      for (let column = 0; column < width; column++) {
        let tdElement = document.createElement("td");

        let nodeId = `${row}-${column}`;
        let nodeType = "unvisited";

        if (row == Math.floor(height / 4) && column == Math.floor(width / 4)) {
          nodeType = "start";
          this.start = nodeId;
        }

        if (row == Math.floor(height / 4) && column == Math.floor((4 * width) / 5)) {
          nodeType = "target";
          this.target = nodeId;
        }

        tdElement.id = nodeId;
        tdElement.className = nodeType;
        trElement.appendChild(tdElement);

        rowNodes.push(new Node(nodeId, nodeType));
      }
      this.gridMatrix.push(rowNodes);

      tbodyElement.appendChild(trElement);
    }
    tableElement.appendChild(tbodyElement);
  }
  #setupEventListeners() {
    document
      .querySelector("tbody")
      .addEventListener("mouseover", this.#addWallOnClickHandler.bind(this));

    document
      .querySelector(".dropdown-content")
      .addEventListener("click", this.#pickAlgorithmHandler.bind(this));

    document
      .getElementById("start-button")
      .addEventListener("click", this.#startButtonClickHandler.bind(this));

    document
      .getElementById("reset-button")
      .addEventListener("click", this.#resetButtonClickHandler.bind(this));

    window.mouseDown = false;
    window.onmousedown = () => (window.mouseDown = true);
    window.onmouseup = () => (window.mouseDown = false);
  }

  #addWallOnClickHandler(event) {
    if (!window.mouseDown) return;
    let nodeId = event.srcElement.id;
    if (nodeId == this.start || nodeId == this.target) return;
    this.getNodeById(nodeId).type = "wall";

    event.srcElement.className = "wall";
  }

  #pickAlgorithmHandler(event) {
    console.log(event.srcElement.id);
    this.current_algorithm = event.srcElement.id;
  }

  #startButtonClickHandler(_event) {
    if (this.hasEnded) {
      this.#resetAll();
    }

    this.startPathFinding();
  }
  #resetButtonClickHandler(_event) {
    this.#resetAll();
  }
  #resetAll() {
    this.hasEnded = false;

    let nodesElements = document.querySelectorAll("td");
    for (const nodeElement of nodesElements) {
      let node = this.getNodeById(nodeElement.id);
      node.parentNodeId = undefined;
      node.distance = Infinity;
      node.heuristicDistance = 0;
      if (nodeElement.className == "start" || nodeElement.className == "target")
        continue;

      nodeElement.className = "unvisited";
      node.type = "unvisited";
    }
  }

  startPathFinding() {
    let startNode = this.getNodeById(this.start);
    this.nodesToAnimate = [];

    if (this.current_algorithm == "bfs")
      bfs(this.gridMatrix, startNode, this.target, this.nodesToAnimate);
    else if (this.current_algorithm == "a-star")
      a_star(this.gridMatrix, startNode, this.target, this.nodesToAnimate);
    else if (this.current_algorithm == "dijkstra")
      dijkstra(this.gridMatrix, startNode, this.target, this.nodesToAnimate);

    startAnimation(this.gridMatrix, this.nodesToAnimate, this.target);
    this.hasEnded = true;
  }
  getNodeById(nodeId) {
    let [row, column] = nodeId.split("-");
    return this.gridMatrix[row][column];
  }
}

export default Board;
