import getNeighbors from "../getNeighbors.js";
import PriorityQueue from "../utilities/PriorityQueue.js";

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
  const visited = new Map();
  const frontier = new PriorityQueue();
  let currentNode;

  startNode.distance = 0;
  startNode.heuristicDistance = heuristicFunction(startNode.nodeId, targetId);

  frontier.enqueue(startNode, startNode.distance + startNode.heuristicDistance);

  while ((currentNode = frontier.dequeue())) {
    if (currentNode.nodeId == targetId) {
      return nodesToAnimate.push(currentNode);
    }

    visited.set(currentNode.nodeId);
    if (currentNode.nodeId != startNode.nodeId && currentNode.nodeId != targetId) {
      nodesToAnimate.push(currentNode);
    }

    let neighbors = getNeighbors(currentNode.nodeId, gridMatrix);

    let node;
    for (const neighbor of neighbors) {
      if (!neighbor.parentNodeId) neighbor.parentNodeId = currentNode.nodeId;

      if (!visited.has(neighbor.nodeId) && !frontier.contains(neighbor)) {
        neighbor.distance = currentNode.distance + neighbor.weight;
        neighbor.heuristicDistance = heuristicFunction(neighbor.nodeId, targetId);

        frontier.enqueue(neighbor, neighbor.distance + neighbor.heuristicDistance);
      }

      // if the new calculated distance is shorter than the previous know distance
      else if (
        (node = frontier.contains(neighbor)) &&
        node.distance + node.heuristicDistance >
          neighbor.distance + neighbor.heuristicDistance
      ) {
        frontier.remove(node);
        frontier.enqueue(neighbor, neighbor.distance + node.heuristicDistance);
      }
    }
  }
}

export default a_star;
