import Node from "./Node.js";
import startAnimation from "./animations/startAnimation.js";
import a_star from "./pathfinding-algorithms/a-start.js";
import bfs from "./pathfinding-algorithms/bfs.js";
import dfs from "./pathfinding-algorithms/dfs.js";
import dijkstra from "./pathfinding-algorithms/dijkstra.js";

class Board {
  width;
  height;
  start = "";
  target = "";
  gridMatrix = [];
  nodesToAnimate = [];
  hasEnded = false;

  current_algorithm = "";

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

    document
      .getElementById("generate-maze-button")
      .addEventListener("click", this.#generateMazeButtonClickHandler.bind(this));

    window.mouseDown = false;
    window.onmousedown = () => (window.mouseDown = true);
    window.onmouseup = () => (window.mouseDown = false);
  }

  #generateMazeButtonClickHandler() {
    this.#resetAll();

    const probability = 0.3;

    let nodesElements = document.querySelectorAll("td");
    for (const nodeElement of nodesElements) {
      if (nodeElement.className == "start" || nodeElement.className == "target")
        continue;

      let node = this.getNodeById(nodeElement.id);
      if (Math.random() <= probability) {
        nodeElement.className = "wall";
        node.type = "wall";
      }
    }
  }
  #addWallOnClickHandler(event) {
    if (!window.mouseDown) return;
    let nodeId = event.srcElement.id;
    if (nodeId == this.start || nodeId == this.target) return;
    this.getNodeById(nodeId).type = "wall";

    event.srcElement.className = "wall";
  }

  #pickAlgorithmHandler(event) {
    this.current_algorithm = event.srcElement.id;
    this.#showAlgorithmInfo();
    document.getElementById("start-button").style.cursor = "pointer";
  }
  #showAlgorithmInfo() {
    let content = "";
    switch (this.current_algorithm) {
      case "dfs":
        content = " Dfs algorithm doesn't guarantees the optimal path";
        break;
      case "bfs":
        content = " Bfs algorithm guarantees the optimal path";
        break;

      case "dijkstra":
        content = " dijkstra algorithm guarantees the optimal path";
        break;

      case "a-star":
        content = " A* algorithm guarantees the optimal path";
        break;
    }
    document.querySelector(".banner-content").textContent = content;
  }

  #startButtonClickHandler(_event) {
    if (this.current_algorithm == "") return;

    if (this.hasEnded) {
      this.#resetPath();
    }

    this.startPathFinding();
  }
  #resetButtonClickHandler(_event) {
    this.#resetAll();
  }
  #resetPath() {
    this.#resetAll(true);
  }
  #resetAll(except_wall = false) {
    this.hasEnded = false;

    let nodesElements = document.querySelectorAll("td");
    for (const nodeElement of nodesElements) {
      let node = this.getNodeById(nodeElement.id);
      node.parentNodeId = undefined;
      node.distance = Infinity;
      node.heuristicDistance = 0;
      if (
        nodeElement.className == "start" ||
        nodeElement.className == "target" ||
        (nodeElement.className == "wall" && except_wall)
      )
        continue;

      nodeElement.className = "unvisited";
      node.type = "unvisited";
    }
  }

  startPathFinding() {
    let startNode = this.getNodeById(this.start);
    this.nodesToAnimate = [];

    if (this.current_algorithm == "dfs")
      dfs(this.gridMatrix, startNode, this.target, this.nodesToAnimate);
    else if (this.current_algorithm == "bfs")
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
