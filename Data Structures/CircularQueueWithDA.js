class CircularQueue {
 #data;
 #front;
 #size;
 constructor(capacity = 8) {
     // Capacity must be a positive integer
     // If invalid → throw Error

     // Must allocate internal storage

     // Must initialize:
     //   front = 0
     //   size = 0

     // Queue must support circular indexing
 }

 /* ================= Basic State ================= */

 size() {
     // Must return current number of elements
 }

 capacity() {
     // Must return current storage capacity
 }

 isEmpty() {
     // Must return true if queue contains no elements
 }

 clear() {
     // Must remove all elements

     // Must reset:
     //   front = 0
     //   size = 0

     // Capacity must remain unchanged
 }

 /* ================= Core Queue Operations ================= */

 enqueue(value) {
     // Must insert value at the logical back of the queue

     // If queue is full:
     //   must automatically grow storage
     //   preserving FIFO order

     // Must:
     //   compute circular rear position
     //   store value
     //   increment size
 }

 dequeue() {
     // If queue is empty → throw Error

     // Must:
     //   read front value
     //   move front forward circularly
     //   decrement size
     //   return removed value
 }

 front() {
     // If queue is empty → throw Error

     // Must return first element
     // Must NOT remove it
 }

 back() {
     // If queue is empty → throw Error

     // Must return last element
     // Must NOT remove it
 }

 /* ================= Internal Resize ================= */

 #grow() {
     // Must create larger storage

     // New capacity should be:
     //   oldCapacity * 2

     // Must copy queue elements
     // in correct FIFO order

     // After growth:
     //   front must become 0

     // Logical queue order must remain unchanged
 }

 /* ================= Utilities ================= */

 toArray() {
     // Must return queue elements
     // in FIFO order

     // Internal circular layout
     // must not be exposed
 }

 toString() {
     // Must return string representation
     // of queue contents
 }

 [Symbol.iterator]() {
     // Must iterate through elements
     // in FIFO order
 }
}