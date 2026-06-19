import { Deque } from "./Deque.js";
class Queue {
  #data;
  // #size;

  constructor(length = 2) {
    this.#data = new Deque(length);
    // this.#size = size;
  }

  enqueue(value) {
    this.#data.push_back(value);
  }

  dequeue() {
    return this.#data.pop_front();
  }

  front() {
    return this.#data.front();
  }

  back() {
    return this.#data.back();
  }

  size() {
    return this.#data.size();
  }

  isEmpty() {
    return this.#data.size() === 0;
  }

  clear() {
    this.#data.clear();
  }

  toArray() {
    this.#data.toArray();
  }

  [Symbol.iterator]() {
    return this.#data[Symbol.iterator]();
  }
}
