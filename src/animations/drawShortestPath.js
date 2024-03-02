function drawShortestPath(gridMatrix, node) {
  let currentNode = node;
  let cost = 0;
  while (currentNode.type !== "start") {
    cost += currentNode.weight;
    if (currentNode.type !== "target")
      document.getElementById(currentNode.nodeId).className = "shortest-path";

    let coordinates = currentNode.parentNodeId.split("-");
    let row = parseInt(coordinates[0]);
    let column = parseInt(coordinates[1]);
    currentNode = gridMatrix[row][column];
  }
  console.log(`total cost: ${cost}`);
}

export default drawShortestPath;
