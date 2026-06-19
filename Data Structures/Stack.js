import { Deque } from "./Deque.js";

class Stack {
  #data;
  // #size;

  constructor(initialCapacity) {
    this.#data = new Deque(initialCapacity);
  }

  push(value) {
    this.#data.push_back(value);
  }

  pop() {
    return this.#data.pop_back();
  }

  peek() {
    return this.#data.back();
  }

  size() {
    return this.#data.size();
  }

  isEmpty() {
    return this.#data.isEmpty();
  }

  clear() {
    this.#data.clear();
  }

  toArray() {
    return this.#data.toArray();
  }

  [Symbol.iterator]() {
    return this.#data[Symbol.iterator]();
  }
}
