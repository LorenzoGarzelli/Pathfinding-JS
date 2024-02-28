import getNeighbors from "../getNeighbors.js";

function bfs(gridMatrix, startNode, targetId, nodesToAnimate) {
  const visited = new Map();
  const frontier = [];
  let currentNode;

  frontier.push(startNode);
  while ((currentNode = frontier.shift())) {
    if (visited.has(currentNode.nodeId)) continue;

    visited.set(currentNode.nodeId); // add node to visited set
    if (currentNode.nodeId != startNode.nodeId && currentNode.nodeId != targetId) {
      nodesToAnimate.push(currentNode);
    }

    let neighbors = getNeighbors(currentNode.nodeId, gridMatrix);

    for (const neighbor of neighbors) {
      if (!neighbor.parentNodeId) neighbor.parentNodeId = currentNode.nodeId;
      if (neighbor.nodeId == targetId) return nodesToAnimate.push(neighbor);
      frontier.push(neighbor);
    }
  }
}

export default bfs;
