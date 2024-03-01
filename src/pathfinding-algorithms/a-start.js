import dijkstra from "./dijkstra.js";

function manhattanDistance(nodeId, targetNodeId) {
  let [x, y] = nodeId.split("-");
  let [xTarget, yTarget] = targetNodeId.split("-");

  return Math.abs(x - xTarget) + Math.abs(y - yTarget);
}

function a_star(
  gridMatrix,
  startNode,
  targetId,
  nodesToAnimate,
  heuristicFunction = manhattanDistance
) {
  return dijkstra(gridMatrix, startNode, targetId, nodesToAnimate, heuristicFunction);
}

export default a_star;
