import getNeighbors from "../getNeighbors.js";
import PriorityQueue from "../utilities/PriorityQueue.js";

function dijkstra(
  gridMatrix,
  startNode,
  targetId,
  nodesToAnimate,
  heuristicFunction
) {
  const visited = new Map();
  const frontier = new PriorityQueue();
  let currentNode;

  startNode.distance = 0;
  startNode.heuristicDistance = heuristicFunction
    ? heuristicFunction(startNode.nodeId, targetId)
    : 0;

  frontier.enqueue(startNode, startNode.distance + startNode.heuristicDistance);
  // add start Node
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
        if (heuristicFunction)
          neighbor.heuristicDistance = heuristicFunction(neighbor.nodeId, targetId);
        frontier.enqueue(neighbor, neighbor.distance + neighbor.heuristicDistance);
      }

      // if the new calculated distance is shorter than the previous know distance
      else if (
        (node = frontier.contains(neighbor)) &&
        node.distance > neighbor.distance
      ) {
        frontier.remove(node);
        frontier.enqueue(neighbor, neighbor.distance + node.heuristicDistance);
      }
    }
  }
}

export default dijkstra;
