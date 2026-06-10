class DynamicArray {
  #arr;
  #size;
  #capacity;
  #GROWTH;
  #fill;
  constructor(capacity = 8, fill = 0) {
    if (!Number.isInteger(capacity)) {
      throw new Error("Capacity must be an intager");
    }
    if (capacity <= 0) {
      throw new Error("capacity must be positive number");
    }
    if (!Number.isInteger(fill)) {
      throw new Error("Fill must be an intager");
    }
    this.#capacity = capacity;
    this.#size = 0;
    this.#GROWTH = 2;
    this.#fill = fill;
    this.#arr = new Int32Array(capacity);
  }
  size() {
    return this.#size;
  }
  capacity() {
    return this.#capacity;
  }
  isEmpty() {
    return this.#size === 0;
  }
  clear() {
    this.#arr.fill(this.#fill);
    this.#size = 0;
  }
  at(index) {
    if (!Number.isInteger(index)) {
      throw new Error("index must be an integer");
    }
    if (index < 0 || index >= this.#size) {
      throw new Error("Index Error: Out of range");
    }
    return this.#arr[index];
  }
  insert(index, value) {
    if (!Number.isInteger(index)) {
      throw new Error("index must be an integer");
    }
    if (index < 0 || index >= this.#size) {
      throw new Error("Index Error: Out of range");
    }
    if (!Number.isInteger(value)) {
      throw new Error("Value must be an integer");
    }
    if (this.#capacity === this.#size) {
      let newCap = this.#capacity * this.#GROWTH;
      this.#resize(newCap);
    }
    for (let i = this.#size; i >= index; --i) {
      this.#arr[i] = this.#arr[i - 1];
    }
    this.#arr[index] = value;
    ++this.#size;
  }
  #resize(newCap) {
    if (newCap <= 0) throw new Error("new Cap must be >= 0");
    if (!Number.isInteger(newCap))
      throw new Error("new Cap must be an integer");
    if (newCap < this.#size) this.#size = newCap;
    let newArr = new Int32Array(newCap).fill(this.#fill);
    for (let i = 0; i < this.#size; ++i) {
      newArr[i] = this.#arr[i];
    }
    this.#capacity = newCap;
    this.#arr = newArr;
  }
  set(index, value) {
    if (!Number.isInteger(index)) {
      throw new Error("index must be an integer");
    }
    if (index < 0 || index >= this.#size) {
      throw new Error("Index Error: Out of range");
    }

    if (!Number.isInteger(value)) {
      throw new Error("Value must be an integer");
    }
    this.#arr[index] = value;
  }
  front() {
    if (this.isEmpty()) return -1;
    return this.#arr[0];
  }
  back() {
    if (this.isEmpty()) return -1;
    return this.#arr[this.#size - 1];
  }

  pushBack(value) {
    if (!Number.isInteger(value)) {
      throw new Error("index must be an integer");
    }
    if (this.#size === this.#capacity) {
      let newCap = this.#capacity * this.#GROWTH;
      this.#resize(newCap);
    }
    this.#arr[this.#size++] = value;
  }
  popBack() {
    if (this.isEmpty()) {
      throw new Error("empty array!");
    }
    let res = this.#arr[--this.#size];
    this.#arr[this.#size] = this.#fill;
    return res;
  }
  toArray() {
    let newArr = new Array(this.#size);
    for (let i = 0; i < this.#size; ++i) {
      newArr[i] = this.#arr[i];
    }
    return newArr;
  }
  toString() {
    return this.toArray();
  }
  *entries() {
    for (let i = 0; i < this.#size; ++i) {
      yield [i, this.#arr[i]];
    }
  }
  swap(i, j) {
    if (this.at(i) || this.at(j));
    [this.#arr[i], this.#arr[j]] = [this.#arr[j], this.#arr[i]];
  }
  reverse() {
    let i = 0;
    let j = this.#size - 1;
    while (i < j) {
      this.swap(i++, j--);
    }
  }
  sort(compareFn) {
    if (this.isEmpty()) {
      throw new Error("Empty Array!");
    }
    const partitionLast = (low, high) => {
      let pivot = this.#arr[high];
      let i = low - 1;
      for (let j = low; j < high; ++j) {
        if (compareFn(this.#arr[j], pivot) < 0) {
          this.swap(++i, j);
        }
      }
      this.swap(i + 1, high);
      return i + 1;
    };
    const quickSortLast = (low, high) => {
      if (low < high) {
        let pivotIndex = partitionLast(low, high);
        quickSortLast(low, pivotIndex - 1);
        quickSortLast(pivotIndex + 1, high);
      }
    };
    quickSortLast(0, this.#size - 1);
  }

  [Symbol.iterator]() {
    let i = 0;
    if (this.isEmpty()) {
      return { value: undefined, done: true };
    }
    return { value: this.#arr[i++], done: false };
  }
}
