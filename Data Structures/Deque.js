class BucketedDeque {
  // === State ===
  #everyBucketsLength;
  #bucketSize;
  #buckets;
  #frontBucket;
  #backBucket;
  #frontIndex;
  #backIndex;
  #size;

  constructor(everyBucketsLength) {
    this.#everyBucketsLength = everyBucketsLength;
    this.#bucketSize = everyBucketsLength;

    let mid = Math.floor(this.#bucketSize / 2);
    let bucket = new Array(this.#bucketSize).fill(null);

    this.#buckets = [bucket];
    this.#frontIndex = mid;
    this.#backIndex = mid;
    this.#frontBucket = 0;
    this.#backBucket = 0;
    this.#size = 0;
  }

  // === Core operations ===
  push_front(value) {
    let bucket = this.#buckets[this.#frontBucket];

    if (!bucket) {
      bucket = new Array(this.#bucketSize).fill(null);
      this.#buckets[this.#frontBucket] = bucket;
    }

    --this.#frontIndex;

    if (this.#frontIndex < 0) {
      this.#frontBucket--;
      this.#frontIndex = this.#bucketSize - 1;

      bucket = this.#buckets[this.#frontBucket];

      if (!bucket) {
        bucket = new Array(this.#bucketSize).fill(null);
        this.#buckets[this.#frontBucket] = bucket;
      }
    }

    bucket[this.#frontIndex] = value;
    ++this.#size;
  }

  push_back(value) {
    let bucket = this.#buckets[this.#backBucket];

    if (!bucket) {
      bucket = new Array(this.#bucketSize).fill(null);
      this.#buckets[this.#backBucket] = bucket;
    }

    bucket[this.#backIndex] = value;
    ++this.#size;

    ++this.#backIndex;

    if (this.#backIndex === this.#bucketSize) {
      this.#backBucket++;
      this.#backIndex = 0;
    }
  }

  pop_front() {
    if (this.isEmpty()) {
      throw new RangeError("out of range");
    }
    let value = this.#buckets[this.#frontBucket][this.#frontIndex];
    this.#buckets[this.#frontBucket][this.#frontIndex] = null;
    this.#frontIndex++;
    if (this.#frontIndex === this.#bucketSize) {
      this.#frontBucket++;
      this.#frontIndex = 0;
    }
    --this.#size;
    return value;
  }
  pop_back() {
    if (this.isEmpty()) {
      throw new RangeError("out of range");
    }
    let value = this.#buckets[this.#backBucket][this.#backIndex];
    this.#buckets[this.#backBucket][this.#backIndex] = null;
    --this.#backIndex;
    if (this.#backIndex < 0) {
      this.#backBucket--;
      this.#backIndex = this.#bucketSize - 1;
    }
    --this.#size;
    return value;
  }

  // === Access ===
  front() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.#buckets[this.#frontBucket][this.#frontIndex];
  }
  back() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.#buckets[this.#backBucket][this.#backIndex];
  }
  // === Utilities ==
  isEmpty() {
    return this.#size === 0;
  }
  clear() {
    this.#size = 0;
    let mid = Math.floor(this.#bucketSize / 2);
    let bucket = new Array(this.#bucketSize).fill(null);
    this.#buckets = [bucket];
    this.#frontBucket = 0;
    this.#backBucket = 0;
    this.#frontIndex = mid;
    this.#backIndex = mid;
  }
  size() {
    return this.#size;
  }

  toArray() {
    if (this.isEmpty()) {
      return [];
    }

    let res = new Array(this.#size);
    let index = this.#frontIndex;
    let bucketIDX = this.#frontBucket;

    for (let k = 0; k < this.#size; ++k) {
      res[k] = this.#buckets[bucketIDX][inex];

      ++index;

      if (index === this.#bucketSize) {
        bucketIDX++;
        index = 0;
      }
    }

    return res;
  }

  at(globalIndex) {
    if (!Number.isInteger(globalIndex)) {
      throw new Error("Invalid index");
    }
    if (globalIndex < 0 || globalIndex >= this.#size) {
      return undefined;
    }

    let bucketIDX = this.#frontBucket;
    let index = this.#frontIndex;

    while (globalIndex > 0) {
      index++;

      if (index === this.#bucketSize) {
        bucketIDX++;
        index = 0;
      }

      globalIndex--;
    }
    return this.#buckets[bucketIDX][index];
  }

  // === Iterator ===
  [Symbol.iterator]() {
    let remaining = this.#size;
    let bucketIdx = this.#frontBucket;
    let idx = this.#frontIndex;

    return {
      next: () => {
        if (remaining === 0) {
          return { done: true };
        }

        let value = this.#buckets[bucketIdx][idx];
        idx++;

        if (idx === this.#bucketSize) {
          bucketIdx++;
          idx = 0;
        }

        remaining--;
        return { value, done: false };
      },
    };
  }

  // === Internal methods (optional) ===
  _ensureBucket(front = false) {
    if (front) {
      if (!this.#buckets[this.#frontBucket]) {
        this.#buckets[this.#frontBucket] = new Array(this.#bucketSize).fill(
          null,
        );
      } else {
        if (!this.#buckets[this.#backBucket]) {
          this.#buckets[this.#backBucket] = new Array(this.#bucketSize).fill(
            null,
          );
        }
      }
    }
  }
  _bucketIndex(globalIndex) {
    if (globalIndex < 0 || globalIndex >= this.#size) {
      return undefined;
    }
    let bucketindex = this.#frontBucket;
    let index = this.#frontIndex;
    while (globalIndex > 0) {
      index++;

      if (index === this.#bucketSize) {
        bucketindex++;
        index = 0;
      }
      globalIndex--;
    }

    return {
      bIndex: bucketindex,
      localIndex: index,
    };
  }
}
