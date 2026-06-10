"use strict";
class DArray {
  // Private fields
  #size = 0;
  #capacity = 0;
  #arr = null;
  // Public fields
  CAP_EXPONENT = 2;

  constructor(initialCapacity) {
    if (!Number.isInteger(initialCapacity) || initialCapacity <= 0) {
      throw new TypeError("capacity must be positiv number");
    }
    this.#arr = new Uint32Array(initialCapacity);
    this.#capacity = initialCapacity;
  }

  resize(newCapacity, fill = 0) {
    let newArr = new Uint32Array(newCapacity);
    let limit = Math.min(this.#size, newCapacity);
    for (let i = 0; i < limit; ++i) {
      newArr[i] = this.#arr[i];
    }
    for (let i = limit; i < newCapacity; ++i) {
      newArr[i] = fill;
    }
    this.#capacity = newCapacity;
    this.#arr = newArr;
  }
  push_back(elem) {
    if (this.#size === this.#capacity) {
      let newcap = this.#capacity <= 0 ? 1 : this.#capacity * this.CAP_EXPONENT;
      this.resize(newcap);
    }
    this.#arr[this.#size++] = elem;
  }
  pop_back() {
    if (this.empty()) {
      throw new Error("empty array!");
    }
    let res = this.#arr[--this.#size];
    return res;
  }
  empty() {
    return this.#size === 0;
  }
  at(index) {
    if (!Number.isInteger(index)) {
      throw new Error("Index must be an integer");
    }
    if (index < 0 || index >= this.#size) {
      throw new Error("Index out of range");
    }
    return this.#arr[index];
  }
  erase(index) {
    if (index < 0 || index >= this.#size) {
      throw new Error("Index out of range");
    }
    for (let i = index; i < this.#size - 1; ++i) {
      this.#arr[i] = this.#arr[i + 1];
    }
    --this.#size;
  }
  clear() {
    this.#size = 0;
  }
  setValue(i, value) {
    if (!Number.isInteger(i)) {
      throw new Error("index must be an integer");
    }
    if (i < 0 || i >= this.#size) {
      throw new Error("index out of range");
    }
    if (!Number.isInteger(value)) {
      throw new Error("value must be an integer");
    }
    this.#arr[i] = value;
  }
  front() {
    if (this.empty()) {
      return undefined;
    }
    return this.#arr[0];
  }
  back() {
    if (this.empty()) {
      return undefined;
    }
    return this.#arr[this.#size - 1];
  }
  capacity() {
    return this.#capacity;
  }
  toArray() {
    let newArr = new Array(this.#size);
    for (let i = 0; i < this.#size; ++i) {
      newArr[i] = this.#arr[i];
    }
    return newArr;
  }
  swap(i, j) {
    if (i < 0 || i >= this.#size) {
      throw new RangeError("i out of range");
    }
    if (j < 0 || j >= this.#size) {
      throw new RangeError("j out of range");
    }
    [this.#arr[i], this.#arr[j]] = [this.#arr[j], this.#arr[i]];
  }
  [Symbol.iterator]() {
    let i = 0;
    return {
      next: () => {
        if (i < this.#size) {
          return { value: this.#arr[i++], done: false };
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  }
  reserve(n) {
    if (n > this.#capacity) {
      let newArr = new Uint32Array(n);
      for (let i = 0; i < this.#size; ++i) {
        newArr[i] = this.#arr[i];
      }
      this.#arr = newArr;
      this.#capacity = n;
    }
  }
  insert(pos, value) {
    if (!Number.isInteger(pos)) {
      throw new Error("position must be an integer");
    }
    if (pos < 0 || pos > this.#size) {
      throw new Error("out of bounds");
    }
    if (this.#capacity === this.#size) {
      let newcap = this.#capacity <= 0 ? 1 : this.#capacity * this.CAP_EXPONENT;
      this.resize(newcap);
    }
    if (!Number.isInteger(value)) {
      throw new Error("value must be an integer");
    }
    for (let i = this.#size; i > pos; --i) {
      this.#arr[i] = this.#arr[i - 1];
    }
    this.#arr[pos] = value;
    ++this.#size;
  }
  *entries() {
    for (let i = 0; i < this.#size; ++i) {
      yield [i, this.#arr[i]];
    }
  }
  shrinkToFit() {
    this.resize(this.#size);
  }
  values() {
    let i = 0;
    return {
      next: () => {
        if (i < this.#size) {
          return { value: this.#arr[i++], done: false };
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  }
  *keys() {
    for (let i = 0; i < this.#size; ++i) {
      yield i;
    }
  }
  forEach(callback, thisArg) {
    if (typeof callback !== "function") {
      throw new TypeError("callback not a function");
    }
    for (let i = 0; i < this.#size; ++i) {
      callback.call(thisArg, this.at(i), i, this);
    }
  }
  map(callback, thisArg) {
    if (typeof callback !== "function") {
      throw new TypeError("callback not a function");
    }
    const res = new DArray(this.#size || 1);
    for (let i = 0; i < this.#size; ++i) {
      res.push_back(callback.call(thisArg, this.at(i), i, this));
    }
    return res;
  }
  filter(callback, thisArg) {
    if (typeof callback !== "function") {
      throw new TypeError("callback not a function");
    }
    const res = new DArray(this.#size);
    for (let i = 0; i < this.#size; ++i) {
      let value = this.at(i);
      if (callback.call(thisArg, value, i, this)) {
        res.push_back(value);
      }
    }
    return res;
  }
  reduce(callback, initialValue) {
    if (typeof callback !== "function") {
      throw new TypeError("callback not a function");
    }
    let acc;
    let startIdx = 0;
    if (initialValue === undefined) {
      acc = initialValue;
    } else {
      if (this.empty()) {
        throw new TypeError("Array is empty");
      }
    }
    acc = this.at(0);
    i = 1;
    for (let i = startIdx; i < this.#size; ++i) {
      acc = callback.call(acc, this.at(i), i, this);
    }
    return acc;
  }
  some(callback, thisArg) {
    if (typeof callback !== "function") {
      throw new TypeError("callback not a function");
    }
    for (let i = 0; i < this.#size; ++i) {
      if (callback.call(thisArg, this.at(i), i, this)) {
        return true;
      }
    }
    return false;
  }
  every(callback, thisArg) {
    if (typeof callback !== "function") {
      throw new TypeError("callback not a function");
    }
    for (let i = 0; i < this.#size; ++i) {
      if (!callback.call(thisArg, this.at(i), i, this)) {
        return false;
      }
    }
    return true;
  }
  find(callback, thisArg) {
    if (typeof callback !== "function") {
      throw new TypeError("callback not a function");
    }
    for (let i = 0; i < this.#size; ++i) {
      const value = this.at(i);
      if (callback.call(thisArg, value, i, this)) {
        return value;
      }
    }
    return undefined;
  }
  findIndex(callback, thisArg) {
    if (typeof callback !== "function") {
      throw new TypeError("callback not a function");
    }

    for (let i = 0; i < this.#size; ++i) {
      const value = this.at(i);
      if (callback.call(thisArg, value, i, this)) {
        return i;
      }
    }
    return -1;
  }

  includes(value) {
    for (let i = 0; i < this.#size; ++i) {
      if (value === this.at(i)) {
        return true;
      }
    }
    return false;
  }
}
