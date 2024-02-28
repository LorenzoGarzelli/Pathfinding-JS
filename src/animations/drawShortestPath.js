function drawShortestPath(gridMatrix, node, speed) {
  if (node.type == "start") return;

  if (node.type != "target")
    setTimeout(
      () => (document.getElementById(node.nodeId).className = "shortest-path"),
      speed
    );

  let coordinates = node.parentNodeId.split("-");
  let row = parseInt(coordinates[0]);
  let column = parseInt(coordinates[1]);
  return drawShortestPath(gridMatrix, gridMatrix[row][column]);
}

export default drawShortestPath;
