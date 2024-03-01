import drawShortestPath from "./drawShortestPath.js";

function startAnimation(gridMatrix, nodes, target) {
  let speed = 400;
  for (let node of nodes) {
    if (node.nodeId == target) {
      setTimeout(() => drawShortestPath(gridMatrix, node, speed * 2), speed * 2);
      continue;
      // for (const shortestNode of nodes) {
      //   setTimeout(
      //     () => drawShortestPath(gridMatrix, shortestNode, speed * 2),
      //     speed * 2
      //   );
      // }
    }
    if (node.type == "wall") continue;

    setTimeout(
      () => (document.getElementById(node.nodeId).className = "visited"),
      speed
    );
  }
}

export default startAnimation;
