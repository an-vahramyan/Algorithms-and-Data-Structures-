"use strict";

class Node {
  #next = null;

  constructor(value, next = null) {
    this.value = value;
    this.#next = next;
  }
  get next() {
    return this.#next;
  }
  set next(v) {
    this.#next = v;
  }
}

class CyclicSinglyLinkedList {
  #head = null;

  constructor(value = undefined) {
    if (value !== undefined) {
      const node = new Node(value);
      node.next = node;
      this.#head = node;
    }
  }

  get head() {
    return this.#head;
  }
  set head(v) {
    this.#head = v;
  }

  empty() {
    return this.#head === null;
  }

  size() {
    if (this.empty()) return 0;
    let len = 1;
    let curr = this.#head.next;
    while (curr !== this.#head) {
      len++;
      curr = curr.next;
    }
    return len;
  }

  clear() {
    this.#head = null;
  }

  front() {
    if (this.empty()) throw new Error("list is empty");
    return this.#head.value;
  }

  back() {
    if (this.empty()) throw new Error("list is empty");
    let curr = this.#head;
    while (curr.next !== this.#head) curr = curr.next;
    return curr.value;
  }

  #tail() {
    let curr = this.#head;
    while (curr.next !== this.#head) curr = curr.next;
    return curr;
  }

  at(index) {
    if (!Number.isInteger(index)) throw new Error("index is not integer");
    if (this.empty()) throw new Error("empty list");
    if (index < 0 || index >= this.size()) throw new Error("invalid index");
    let curr = this.#head;
    for (let i = 0; i < index; i++) curr = curr.next;
    return curr.value;
  }

  pushFront(value) {
    const node = new Node(value);
    if (this.empty()) {
      node.next = node;
      this.#head = node;
      return;
    }
    node.next = this.#head;
    this.#tail().next = node;
    this.#head = node;
  }

  pushBack(value) {
    const node = new Node(value);
    if (this.empty()) {
      node.next = node;
      this.#head = node;
      return;
    }
    const tail = this.#tail();
    node.next = this.#head;
    tail.next = node;
  }

  popFront() {
    if (this.empty()) throw new Error("list is empty");
    const val = this.#head.value;
    if (this.#head.next === this.#head) {
      // only one node
      this.#head = null;
    } else {
      this.#tail().next = this.#head.next;
      this.#head = this.#head.next;
    }
    return val;
  }

  popBack() {
    if (this.empty()) throw new Error("list is empty");
    if (this.#head.next === this.#head) {
      // only one node
      const val = this.#head.value;
      this.#head = null;
      return val;
    }
    // find the second-to-last node
    let curr = this.#head;
    while (curr.next.next !== this.#head) curr = curr.next;
    const val = curr.next.value;
    curr.next = this.#head;
    return val;
  }

  insert(index, value) {
    if (!Number.isInteger(index)) throw new Error("index is not integer");
    const size = this.size();
    if (index < 0 || index > size) throw new Error("invalid index");
    if (index === 0) return this.pushFront(value);
    if (index === size) return this.pushBack(value);
    let curr = this.#head;
    for (let i = 0; i < index - 1; i++) curr = curr.next;
    curr.next = new Node(value, curr.next);
  }

  erase(index) {
    if (!Number.isInteger(index)) throw new Error("index is not integer");
    if (this.empty()) throw new Error("list is empty");
    if (index < 0 || index >= this.size()) throw new Error("invalid index");
    if (index === 0) return this.popFront();
    let curr = this.#head;
    for (let i = 0; i < index - 1; i++) curr = curr.next;
    const val = curr.next.value;
    curr.next = curr.next.next;
    return val;
  }

  find(value) {
    if (this.empty()) return -1;
    let curr = this.#head;
    let index = 0;
    do {
      if (curr.value === value) return index;
      curr = curr.next;
      index++;
    } while (curr !== this.#head);
    return -1;
  }

  contains(value) {
    return this.find(value) !== -1;
  }

  toArray() {
    const result = [];
    if (this.empty()) return result;
    let curr = this.#head;
    do {
      result.push(curr.value);
      curr = curr.next;
    } while (curr !== this.#head);
    return result;
  }

  reverse() {
    if (this.empty() || this.#head.next === this.#head) return;
    let prev = this.#tail();
    let curr = this.#head;
    const newHead = prev;
    do {
      const next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    } while (curr !== this.#head);
    this.#head = newHead;
  }

  [Symbol.iterator]() {
    let curr = this.#head;
    const head = this.#head;
    let started = false;
    return {
      next() {
        if (!curr || (started && curr === head)) return { done: true };
        started = true;
        const value = curr.value;
        curr = curr.next;
        return { value, done: false };
      },
    };
  }

  *entries() {
    if (this.empty()) return;
    let curr = this.#head;
    let index = 0;
    do {
      yield [index++, curr.value];
      curr = curr.next;
    } while (curr !== this.#head);
  }
}
