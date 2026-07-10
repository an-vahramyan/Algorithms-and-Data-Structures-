class HashTable {
  #table;
  #capacity;
  #size;
  #maxloadFactor;

  constructor(capacity = 16, maxloadFactor = 0.75) {
    if (capacity <= 0 || !Number.isInteger(capacity)) {
      throw new Error("invalid capacity");
    }
    this.#table = new Array(capacity).fill(null).map(() => []);

    this.#size = 0;
    this.#capacity = capacity;
    this.#maxloadFactor = maxloadFactor;
  }

  /* ================= Basic State ================= */

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
    let newTable = new Array(this.#capacity).fill(null).map(() => []);
    this.#table = newTable;
    this.#size = 0;
  }

  /* ================= Hashing ================= */

  #hash(key, capacity = this.#capacity) {
    if (key instanceof String || typeof key === "string") {
      let res = 0;
      for (let char of key) {
        res = (res << 5) - res + char.charCodeAt(0);
        res |= 0;
      }
      key = res;
    }
    if (key < 0) {
      key = ((key % capacity) + capacity) % capacity;
    }
    let index = key % capacity;
    return index;
  }

  /* ================= Core Operations ================= */

  put(key, value) {
    let index = this.#hash(key);
    let bucket = this.#table[index];

    for (const entry of bucket) {
      if (entry.key === key) {
        entry.value = value;
        return;
      }
    }
    bucket.push({ key, value });
    ++this.#size;

    //load factor
    if (this.#size / this.#capacity > this.#maxloadFactor) {
      this.#resize();
    }
  }

  get(key) {
    let index = this.#hash(key);
    let bucket = this.#table[index];
    for (const entry of bucket) {
      if (entry.key === key) {
        return entry.value;
      }
    }
    return undefined;
  }

  remove(key) {
    let index = this.#hash(key);
    let bucket = this.#table[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        let removedVal = bucket[i].value;
        bucket.splice(i, 1);
        --this.#size;
        return removedVal;
      }
    }
    return undefined;
  }

  containsKey(key) {
    let index = this.#hash(key);
    let bucket = this.#table[index];
    for (const entry of bucket) {
      if (entry.key === key) {
        return true;
      }
    }
    return false;
  }

  containsValue(value) {
    for (const bucket of this.#table) {
      for (const entry of bucket) {
        if (entry.value === value) {
          return true;
        }
      }
    }
    return false;
  }

  /* ================= Resize / Rehash ================= */

  #resize(newCapacity) {
    let newTable = new Array(newCapacity).fill(null).map(() => []);
    let oldTable = this.#table;

    for (const bucket of oldTable) {
      for (const entry of bucket) {
        let index = this.#hash(entry.key, newCapacity);
        newTable[index].push(entry);
      }
    }

    this.#capacity = newCapacity;
    this.#table = newTable;
  }

  loadFactor() {
    return this.#size / this.#capacity;
  }

  /* ================= Entry Views ================= */

  keys() {
    let keys = [];
    for (const bucket of this.#table) {
      for (const entry of bucket) {
        keys.push(entry.key);
      }
    }
    return keys;
  }

  values() {
    let values = [];
    for (const bucket of this.#table) {
      for (const entry of bucket) {
        values.push(entry.value);
      }
    }
    return values;
  }

  entries() {
    let res = [];
    for (const bucket of this.#table) {
      for (const entry of bucket) {
        res.push(entry.key, entry.value);
      }
    }
    return res;
  }

  /* ================= Iteration ================= */

  [Symbol.iterator]() {
    let bucketIdx = 0;
    let entryIdx = 0;

    return {
      next: () => {
        while (bucketIdx < this.#table.length) {
          let bucket = this.#table[bucketIdx];
          if (entryIdx < bucket.length) {
            let entry = bucket[entryIdx];
            entryIdx++;
            return { value: [entry.key, entry.value], done: false };
          }
          bucketIdx++;
          entryIdx = 0;
        }
        return { value: undefined, done: true };
      },
    };
  }

  /* ================= Utility Operations ================= */

  toObject() {
    let res = {};
    for (const bucket of this.#table) {
      for (const entry of bucket) {
        res[entry.key] = entry.value;
      }
    }
    return res;
  }

  clone() {
    let cap = this.#capacity;
    let lF = this.#maxloadFactor;
    let newTable = new HashTable(cap, lF);

    for (const bucket of this.#table) {
      for (const entry of bucket) {
        newTable.put(entry.key, entry.value);
      }
    }

    return newTable;
  }

  equals(otherTable) {
    if (this.#size !== otherTable.size()) {
      return false;
    }
    for (const bucket of this.#table) {
      for (const entry of bucket) {
        let val = otherTable.get(entry.key);
        if (val !== entry.value) {
          return false;
        }
      }
    }
    return true;
  }

  /* ================= Debug / Visualization ================= */

  bucketSizes() {
    let res = [];
    for (const bucket of this.#table) {
      let len = bucket.length;
      res.push(len);
    }
    return res;
  }

  print() {
    for (let i = 0; i < this.#table.length; ++i) {
      console.log("bucket:", i);
      let bucket = this.#table[i];
      if (bucket.length === 0) {
        console.log("bucket is empty");
      } else {
        for (const entry of bucket) {
          console.log(`key: ${entry.key}, value:${entry.value}`);
        }
      }
    }
  }
}
