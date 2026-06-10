"use strict";
//cyclic doubly linked list
class Node {
  value;
  prev;
  next;
  constructor(value, next, prev) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}
class CyclicDoublyLinkedList {
  #head;
  #tail;
  constructor(value) {
    if (value !== undefined) {
      let node = new Node(value);
      node.next = node;
      node.prev = node;

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
  //basic state methods
  empty() {
    return this.#head === null;
  }
  size() {
    if (this.empty()) {
      return 0;
    }
    let curr = this.#head.next;
    let len = 1;
    while (curr !== this.#head) {
      len++;
      curr = curr.next;
    }
    return len;
  }
  clear() {
    this.#head = null;
    this.#tail = null;
  }
  //element access
  pushFront(value) {
    let node = new Node(value);

    if (this.empty()) {
      node.next = node;
      node.prev = node;
      this.#head = node;
      this.#tail = node;
      return;
    }
    node.next = this.#head;
    node.prev = this.#tail;

    this.#head.prev = node;
    this.#tail.next = node;

    this.#head = node;
  }
  pushBack(value) {
    let node = new Node(value);
    if (this.empty()) {
      node.next = node;
      node.prev = node;
      this.#head = node;
      this.#tail = node;
      return;
    }
    node.prev = this.#tail;
    node.next = this.#head;

    this.#tail.next = node;
    this.#head.prev = node;

    this.#tail = node;
  }
  popFront() {
    if (this.empty()) {
      throw new Error("Empty list");
    }

    let res = this.#head.value;

    if (this.#head === this.#tail) {
      this.#head = null;
      this.#tail = null;
      return res;
    }
    let newHead = this.#head.next;

    this.#tail.next = newHead;
    newHead.prev = this.#tail;

    this.#head = newHead;

    return res;
  }
  popBack() {
    if (this.empty()) {
      throw new Error("Empty list");
    }

    let res = this.#tail.value;

    if (this.#tail === this.#head) {
      this.#head = null;
      this.#tail = null;
      return;
    }

    let newTail = this.#tail.prev;

    this.#head.prev = newTail;
    newTail.next = this.#head;

    this.#tail = newTail;

    return res;
  }
  insert(index, value) {
    if (!Number.isInteger(index) || index < 0 || index >= this.size()) {
      throw new Error("invalid index");
    }
    let node = new Node(value);
    if (this.empty()) {
      node.next = node;
      node.prev = node;

      this.#head = node;
      this.#tail = node;
    }
    if (index === 0) {
      node.next = this.#head;
      node.prev = this.#tail;

      this.#head.prev = node;
      this.#tail.nect = node;

      this.#head = node;

      return;
    }
    if (index === this.size()) {
      this.pushBack(value);
      return;
    }

    let curr = this.#head;
    for (let i = 0; i < index - 1; ++i) {
      curr = curr.next;
    }

    let next = curr.next;

    curr.next = node;
    curr.prev = curr;
    node.next = next;
    next.prev = node;
  }
  erase(index) {
    if (!Number.isInteger(index) || index < 0 || index >= this.size()) {
      throw new Error("invalid index");
    }
    if (this.empty()) {
      throw new Error("empty list");
    }
    if (index === 0) {
      return this.popFront();
    }
    if (index === this.size() - 1) {
      return this.popBack();
    }
    let curr = this.#head;
    for (let i = 0; i < index; ++i) {
      curr = curr.next;
    }
    let removed = curr.value;
    let prev = curr.prev;
    let next = curr.next;

    prev.next = next;
    next.prev = prev;

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
    do {
      if (curr.value === value) {
        return idx;
      }
      curr = curr.next;
      idx++;
    } while (curr !== this.#head);
    return -1;
  }
  contains(value) {
    if (this.empty()) {
      throw new Error("empty list");
    }
    let curr = this.#head;
    do {
      if (curr.value === value) {
        return true;
      }
      curr = curr.next;
    } while (curr !== this.#head);
    return false;
  }
  //Utilities
  toArray() {
    if (this.empty()) {
      throw new Error("empty list");
    }
    let arr = new Array(this.size());
    let curr = this.#head;
    let i = 0;
    do {
      arr[i] = curr.value;
      curr = curr.next;
      i++;
    } while (curr !== this.#head);
    return arr;
  }
  reverse() {
    if (this.empty()) {
      return;
    }
    let curr = this.#head;
    do {
      let tmp = curr.next;
      curr.next = curr.prev;
      curr.prev = tmp;

      curr = tmp;
    } while (curr !== this.#head);
    let tmp = this.#head;
    this.#head = this.#tail;
    this.#tail = tmp;
  }
  //iteration
  [Symbol.iterator]() {
    let curr = this.#head;
    let first = true;
    return {
      next: () => {
        if (this.empty()) {
          return { done: true };
        }
        if (!first && curr === this.#head) {
          return { done: true };
        }
        first = false;
        const value = curr.value;
        curr = curr.next;

        return { value, done: false };
      },
    };
  }
  *reverseIterator() {
    let curr = this.#tail;
    do {
      yield curr.value;
      curr = curr.prev;
    } while (curr !== this.#tail);
  }
  *entries() {
    if (this.empty()) {
      ReadableStreamDefaultController;
    }
    let idx = 0;
    let curr = this.#head;
    do {
      yield [idx++, curr.value];
      curr = curr.next;
    } while (curr !== this.#head);
  }
}
