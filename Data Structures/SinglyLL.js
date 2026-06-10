class Node {
  value;
  #next;
  constructor(value, next = null) {
    this.value = value;
    this.#next = next;
  }
}

class SinglyLinkedList {
  #head;
  constructor(head = null) {
    this.#head = head;
  }

  isEmpty() {
    return this.#head === null;
  }

  size() {
    if (this.isEmpty()) return 0;
    if (this.#head.next === null) return 1;

    let length = 0;
    let curr = this.#head;

    while (curr) {
      ++length;
      curr = curr.next;
    }

    return length;
  }

  clear() {
    this.#head = null;
  }

  front() {
    if (this.isEmpty()) throw new Error("Is empty.");
    return this.#head.value;
  }

  back() {
    if (this.isEmpty()) throw new Error("Is empty.");
    let curr = this.#head;
    while (curr.next) {
      curr = curr.next;
    }
    return curr.value;
  }

  at(index) {
    if (!Number.isInteger(index)) throw new Error("Index is not integer.");
    if (this.isEmpty()) throw new Error("Is empty.");
    if (index >= this.size()) throw new Error("Invalid index.");
    let curr = this.#head;
    while (index) {
      --index;
      curr = curr.next;
    }
    return curr.value;
  }

  pushFront(value) {
    if (this.isEmpty()) {
      this.#head = new Node(value);
      return;
    }
    let newNode = new Node(value);
    newNode.next = this.#head;
    this.#head = newNode;
  }

  pushBack(value) {
    if (this.isEmpty()) {
      this.#head = new Node(value);
      return;
    }
    if (this.#head.next === null) {
      this.#head.next = new Node(value);

      return;
    }
    let curr = this.#head;
    while (curr.next) {
      curr = curr.next;
    }
    curr.next = new Node(value);
  }

  popFront() {
    if (this.isEmpty()) throw new Error("Is empty.");
    let res = this.#head.value;
    this.#head = this.#head.next;
    return res;
  }

  popBack() {
    if (this.isEmpty()) throw new Error("Is empty.");
    if (this.#head.next === null) {
      let res = this.#head.value;
      this.#head = null;
      return res;
    }
    let curr = this.#head;
    while (curr.next.next) {
      curr = curr.next;
    }
    let res = curr.next.value;
    curr.next = null;
    return res;
  }

  toArray() {
    let res = new Array(this.size());
    let curr = this.#head;
    let i = 0;
    while (curr) {
      res[i++] = curr.value;
      curr = curr.next;
    }
    return res;
  }

  insert(index, value) {
    if (!Number.isInteger(index)) throw new Error("Index is not integer.");
    if (this.isEmpty()) throw new Error("Is empty.");
    if (index >= this.size()) throw new Error("Invalid index.");
    if (index === 0) {
      this.pushFront(value);
      return;
    }
    let curr = this.#head;
    while (index != 1 && curr) {
      curr = curr.next;
      --index;
    }
    let newNode = new Node(value);
    newNode.next = curr.next;
    curr.next = newNode;
  }

  erase(index) {
    if (!Number.isInteger(index)) throw new Error("Index is not integer.");
    if (this.isEmpty()) throw new Error("Is empty.");
    if (index >= this.size()) throw new Error("Invalid index.");
    if (index === 0) {
      this.popFront();
      return;
    }
    let curr = this.#head;
    while (index != 1 && curr) {
      curr = curr.next;
      --index;
    }
    curr.next = curr.next.next;
  }

  sort() {
    this.#head = this.#mergeSort(this.#head);
  }

  #mergeSort(head) {
    if (!head || !head.next) return head;
    let mid = this.#getMiddle(head);
    let rightHead = mid.next;
    mid.next = null;
    let left = this.#mergeSort(head);
    let right = this.#mergeSort(rightHead);
    return this.#merge(left, right);
  }

  #merge(left, right) {
    let dummy = new Node(0);
    let tail = dummy;
    while (left && right) {
      if (left.value <= right.value) {
        tail.next = left;
        left = left.next;
      } else {
        tail.next = right;
        right = right.next;
      }
      tail = tail.next;
    }
    tail.next = left || right;
    return dummy.next;
  }

  #getMiddle(head) {
    let slow = head;
    let fast = head.next;
    while (fast && fast.next) {
      fast = fast.next.next;
      slow = slow.next;
    }
    return slow;
  }
}
