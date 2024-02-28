function getNeighbors(nodeId, gridMatrix) {
  let coordinates = nodeId.split('-');
  let row = parseInt(coordinates[0]);
  let column = parseInt(coordinates[1]);
  const neighbors = [];

  let node;

  //? left neighbor
  if ((node = gridMatrix[row][column - 1]) && node.type != 'wall')
    neighbors.push(gridMatrix[row][column - 1]);

  //? top neighbor
  if (
    gridMatrix[row - 1] &&
    (node = gridMatrix[row - 1][column]) &&
    node.type != 'wall'
  )
    neighbors.push(gridMatrix[row - 1][column]);

  //? right neighbor
  if ((node = gridMatrix[row][column + 1]) && node.type != 'wall')
    neighbors.push(gridMatrix[row][column + 1]);

  //? down neighbor
  if (
    gridMatrix[row + 1] &&
    (node = gridMatrix[row + 1][column]) &&
    node.type != 'wall'
  )
    neighbors.push(gridMatrix[row + 1][column]);

  return neighbors;
}

export default getNeighbors;
