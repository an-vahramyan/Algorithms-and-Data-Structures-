import { DynamicArray } from "./DynamicArray.js";
class CircularQueue {
  #data;
  #front;
  #back;
  #size;
  constructor(capacity = 8) {
    if (capacity <= 0) {
      throw new TypeError("Capacity must be positive number");
    }
    if (!Number.isInteger(capacity)) {
      throw new TypeError("capacity must be integer number");
    }
    this.#data = new DynamicArray(capacity);

    this.#front = 0;
    this.#back = 0;
    this.#size = 0;
  }

  /* ================= Basic State ================= */

  size() {
    return this.#size;
  }

  capacity() {
    return this.#data.capacity();
  }

  isEmpty() {
    return this.#size === 0;
  }

  clear() {
    this.#back = 0;
    this.#front = 0;
    this.#size = 0;
  }

  /* ================= Core Queue Operations ================= */

  enqueue(value) {
    if (this.#data.capacity() === this.#size) {
      let newArr = new DynamicArray(this.capacity() * 2);
      for (let i = 0; i < this.#size; ++i) {
        newArr[i] = this.#data[(this.#front + i) % this.#data.capacity()];
      }
      this.#data = newArr;
      this.#front = 0;
      this.#back = this.#size;
    }
    this.#data[this.#back] = value;
    this.#back = (this.#back + 1) % this.#data.capacity();
    this.#size++;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error("queue is empty!");
    }
    let frontValue = this.#data[this.#front];
    this.#front = (this.#front + 1) % this.capacity();

    this.#size--;
    return frontValue;
  }

  front() {
    if (this.isEmpty()) {
      throw new Error("empty queue!");
    }
    return this.#data[this.#front];
  }

  back() {
    if (this.isEmpty()) {
      throw new Error("empty queue!");
    }
    return this.#data[
      (this.#back - 1 + this.#data.capacity) % this.#data.capacity()
    ];
  }

  /* ================= Internal Resize ================= */

  #grow() {
    // Must create larger storage
    let oldCap = this.#data.capacity;
    let newArr = new DynamicArray(oldCap * 2);
    for (let i = 0; i < this.#size; ++i) {
      newArr[i] = this.#data[(this.#front + i) % oldCap];
    }
    this.#data = newArr;
    this.#front = 0;
    this.#back = this.#size;
  }

  /* ================= Utilities ================= */

  toArray() {
    let newArr = new Array(this.#size);
    for (let i = 0; i < this.#size; ++i) {
      newArr[i] = this.#data[(this.#front + i) % this.#data.capacity()];
    }
    return newArr;
  }

  toString() {
    // let newStr = "";
    let parts = [];
    for (let i = 0; i < this.#size; ++i) {
      // newStr += this.#data[(this.#front + i) % this.#data.capacity()];
      parts.push(this.#data[this.#front + i] % this.#data.capacity());
    }
    // return newStr;
    return parts.join("");
  }

  [Symbol.iterator]() {
    let i = 0;

    return {
      next: () => {
        if (i < this.#size) {
          const value = this.#data[(this.#front + i) % this.#data.capacity()];
          i++;
          return {
            value,
            done: false,
          };
        } else {
          return { done: true };
        }
      },
    };
  }
}
