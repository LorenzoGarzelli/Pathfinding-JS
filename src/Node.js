class Node {
  parentNodeId;
  nodeId;
  type; // start, target, unvisited, visited, wall
  weight = 1;
  distance = Infinity;
  heuristicDistance = 0;
  constructor(nodeId, type) {
    this.nodeId = nodeId;
    this.type = type;
  }
}

export default Node;
