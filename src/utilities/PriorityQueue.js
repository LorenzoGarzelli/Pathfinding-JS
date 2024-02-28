class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  isEmpty() {
    return this.size() === 0;
  }
  enqueue(element, priority) {
    const node = { element, priority };
    this.heap.push(node);
    this.#heapifyUp();
  }

  dequeue() {
    if (this.isEmpty()) return null;

    if (this.size() === 1) return this.heap.pop().element;

    const root = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.#heapifyDown();

    return root.element;
  }
  contains(element) {
    for (const node of this.heap) {
      if (node.element === element) {
        return node.element;
      }
    }
    return null;
  }
  remove(element) {
    const indexToRemove = this.heap.findIndex((node) => node.element === element);

    if (indexToRemove === -1) {
      return null; // Element not found
    }

    // Swap the element to be removed with the last element
    this.swap(indexToRemove, this.size() - 1);

    // Remove the last element (which is now the one to be removed)
    const removedElement = this.heap.pop();

    // Restore the heap property
    this.heapifyDown();
    this.heapifyUp();

    return removedElement.element;
  }
  #heapifyDown() {
    let currentIndex = 0;

    while (true) {
      const leftChildIndex = 2 * currentIndex + 1;
      const rightChildIndex = 2 * currentIndex + 2;

      let smallestChildIndex = currentIndex;

      if (
        leftChildIndex < this.size() &&
        this.heap[leftChildIndex].priority < this.heap[smallestChildIndex].priority
      ) {
        smallestChildIndex = leftChildIndex;
      }

      if (
        rightChildIndex < this.size() &&
        this.heap[rightChildIndex].priority < this.heap[smallestChildIndex].priority
      ) {
        smallestChildIndex = rightChildIndex;
      }
      if (smallestChildIndex !== currentIndex) {
        this.#swap(currentIndex, smallestChildIndex);
        currentIndex = smallestChildIndex;
      } else break;
    }
  }

  #heapifyUp() {
    let currentIndex = this.size() - 1;

    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      if (this.heap[currentIndex].priority < this.heap[parentIndex].priority) {
        this.#swap(currentIndex, parentIndex);
        currentIndex = parentIndex;
      } else break;
    }
  }
  #swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }
}

export default PriorityQueue;
