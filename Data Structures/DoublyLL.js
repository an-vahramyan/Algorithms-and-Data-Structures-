"use strict";
class Node {
  value;
  prev;
  next;
  constructor(value, next = null, prev = null) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}
class DoublyLinkedList {
  #head;
  #tail;
  constructor(value) {
    if (value !== undefined) {
      let node = new Node(value);
      this.#head = node;
      this.#tail = node;
    } else {
      this.#head = null;
      this.#tail = null;
    }
  }
  get head() {
    return this.#head;
  }
  get tail() {
    return this.#tail;
  }
  //Basic State Methods
  empty() {
    return this.#head === null;
  }
  size() {
    let curr = this.#head;
    let len = 0;
    while (curr) {
      ++len;
      curr = curr.next;
    }
    return len;
  }
  clear() {
    this.#head = null;
    this.#tail = null;
  }
  //Element access
  front() {
    if (this.empty()) {
      throw new Error("empty list");
    }
    return this.#head.value;
  }
  back() {
    if (this.empty()) {
      throw new Error("empty list");
    }
    return this.#tail.value;
  }
  at(index) {
    if (this.empty()) {
      throw new Error("empty list");
    }
    if (!Number.isInteger(index) || index < 0 || index >= this.size()) {
      throw new Error("invalid index");
    }

    let curr = this.#head;

    for (let i = 0; i < index; ++i) {
      if (!curr) break;
      curr = curr.next;
    }
    if (!curr) {
      throw new Error("index out of bounds");
    }

    return curr.value;
  }
  //Modifiers
  pushFront(value) {
    let newN = new Node(value);
    if (this.empty()) {
      this.#head = newN;
      this.#tail = newN;
      return;
    }

    newN.next = this.#head;
    // newN.prev = null;
    this.#head.prev = newN;
    this.#head = newN;
  }
  pushBack(value) {
    let newN = new Node(value);
    if (this.empty()) {
      this.#tail = newN;
      this.#head = newN;
      return;
    }

    this.#tail.next = newN;
    newN.prev = this.#tail;
    // newN.next = null;
    this.#tail = newN;
  }
  popFront() {
    if (this.empty()) {
      throw new Error("empty list");
    }
    let res = this.#head.value;

    if (this.#head === this.#tail) {
      this.#head = null;
      this.#tail = null;
    } else {
      this.#head = this.#head.next;
      this.#head.prev = null;
    }
    return res;
  }
  popBack() {
    if (this.empty()) {
      throw new Error("empty list");
    }
    let res = this.#tail.value;

    this.#tail = this.#tail.prev;
    if (this.#tail === this.#head) {
      this.#head = null;
      this.#tail = null;
    } else {
      this.#tail = this.#tail.prev;
      this.#tail.next = null;
    }
    return res;
  }
  insert(index, value) {
    if (!Number.isInteger(index) || index < 0 || index > this.size()) {
      throw new Error("invalid index");
    }
    if (index === 0) {
      this.pushFront(value);
      return;
    } else if (index === this.size()) {
      this.pushBack(value);
      return;
    }
    let curr = this.#head;
    for (let i = 0; i < index; ++i) {
      curr = curr.next;
    }
    let newN = new Node(value);

    newN.prev = curr.prev;
    curr.next = curr;

    curr.prev.next = newN;
    curr.prev = newN;
  }
  erase(index) {
    if (!Number.isInteger(index) || index < 0 || index >= this.size()) {
      throw new Error("invalid index");
    }
    if (index === 0) {
      return this.popFront();
    }
    if ((index = this.size() - 1)) {
      return this.popBack();
    }
    let curr = this.#head;
    for (let i = 0; i < index; ++i) {
      curr = curr.next;
    }
    let removed = curr.value;
    curr.prev.next = curr.next;
    curr.next.prev = curr.prev;
    curr.next = null;
    curr.prev = null;
    return removed;
  }
  //search operations
  find(value) {
    if (this.empty()) {
      throw new Error("empty list");
    }
    let curr = this.#head;
    let idx = 0;
    while (curr !== null) {
      if (curr.value === value) {
        return idx;
      }
      curr = curr.next;
      idx++;
    }
    return -1;
  }
  contains(value) {
    if (this.empty()) {
      throw new Error("empty list");
    }
    let curr = this.#head;

    while (curr !== null) {
      if (curr.value === value) {
        return true;
      }
      curr = curr.next;
    }
    return false;
  }
  //Utilities
  toArray() {
    if (this.empty()) {
      return [];
    }
    let res = new Array(this.size());
    let curr = this.#head;
    let i = 0;
    while (curr !== null) {
      res[i++] = curr.value;
      curr = curr.next;
    }
    return res;
  }
  reverse() {
    if (this.empty()) {
      throw new Error("empty list");
    }
    let curr = this.#head;
    let tmp = null;
    while (curr !== null) {
      tmp = curr.prev;
      curr.prev = curr.next;
      curr.next = tmp;
      curr = curr.prev;
    }
    if (tmp !== null) {
      this.#tail = this.#head;
      this.#head = tmp.prev;
    }
  }
  [Symbol.iterator]() {
    let curr = this.#head;
    return {
      next: () => {
        if (curr !== null) {
          const resV = curr.value;
          curr = curr.next;
          return { value: curr.vresV, done: false };
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  }
  *reverseIterator() {
    let curr = this.#tail;
    while (curr !== null) {
      yield curr.value;
      curr = curr.prev;
    }
  }
  *entries() {
    let index = 0;
    let curr = this.#head;
    while (curr !== null) {
      yield [index++, curr.value];
      curr = curr.next;
    }
  }
}
