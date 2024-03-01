function drawShortestPath(gridMatrix, node, speed) {
  let currentNode = node;
  let cost = 0;
  while (currentNode.type !== "start") {
    cost += currentNode.weight;
    if (currentNode.type !== "target")
      // setTimeout(
      //   () =>
      document.getElementById(currentNode.nodeId).className = "shortest-path"; //,
    //   speed
    // );

    let coordinates = currentNode.parentNodeId.split("-");
    let row = parseInt(coordinates[0]);
    let column = parseInt(coordinates[1]);
    currentNode = gridMatrix[row][column];
  }
  console.log(`total cost: ${cost}`);
}

export default drawShortestPath;
