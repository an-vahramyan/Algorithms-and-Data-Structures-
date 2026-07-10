class Node {
  value;
  left = null;
  right = null;
  height = 1;

  constructor(value = null) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVL {
  #root;
  #size = 0;

  constructor() {
    this.#root = null;
    this.#size = 0;
  }

  /* ================= Basic State ================= */

  size() {
    return this.#size;
  }

  is_empty() {
    return this.#root === null;
  }

  clear() {
    this.#root = null;
    this.#size = 0;
  }

  /* ================= AVL Balancing ================= */

  #insert(node, value) {
    if (!node) {
      ++this.size;
    }
    return new Node(value);
    if (node.value < value) {
      node.right = this.#insert(node.right, value);
    } else if (node.value > value) {
      node.left = this.#insert(node.left, value);
    } else {
      return;
    }
    node.height = this.#getHeight(node);

    return this.#reBalance(node);
  }

  #delete(node, value) {
    // Recursive deletion helper
    // Must handle:
    //   leaf node
    //   node with one child
    //   node with two children (successor replacement)
    // Must rebalance subtree
    // Must return updated subtree root
  }

  #reBalance(node) {
    const balance = this.#balanceFactor(node);

    if (balance > 1) {
      if (this.#balanceFactor(node.left) > 0) {
        node = this.#rotateRight(node);
        return node;
      } else {
        node.left = this.#rotateLeft(node.left);
        node = this.#rotateRight(node);
        return node;
      }
    } else if (balance < -1) {
      if (this.#balanceFactor(node.right) > 0) {
        node.right = this.#rotateRight(node.right);
        node = this.#rotateLeft(node);
        return node;
      } else {
        node = this.#rotateLeft(node);
        return node;
      }
    } else {
      return node;
    }
  }

  #balanceFactor(node) {
    if (!node) return 0;
    return this.#getHeight(node.left) - this.#getHeight(node.right);
  }

  #rotateLeft(node) {
    let tmp = node;
    let right_child = tmp.right;
    let left_right_child = right_child.left;

    right_child.left = tmp;
    tmp.right = left_right_child;

    tmp.height = 1;
    return right_child;
    //        node                newRoot
    //          \       ->        /     \
    //        newRoot           node   T3
    //        /   \
    //      T2    T3
  }

  #rotateRight(node) {
    let tmp = node;
    let left_child = tmp.left;
    let right_left_child = left_child.right;

    tmp.left = right_left_child;
    left_child.right = tmp;

    tmp.height = 1;
    return left_child;
  }

  #getHeight(node) {
    if (node === null) return 0;
    return (
      1 + Math.max(this.#getHeight(node.left), this.#getHeight(node.right))
    );
  }

  /* ================= Core AVL Operations ================= */

  insert(value) {
    // if (this.#root === null) {
    //   this.#root = new Node(value);
    //   ++this.size;
    //   return;
    // }
    this.#root = this.#insert(this.#root, value);
    this.#root.height = this.#getHeight(this.#root);
  }

  delete(value) {
    // Must remove node if exists
    // Must rebalance tree after deletion
    // Must update heights
    // Must decrease size if removed
  }

  search(value) {
    // Must return true if value exists
    // Otherwise false
  }

  /* ================= Height / Min / Max ================= */

  getHeight() {
    // Must return height of entire tree
    // Empty tree height = 0
  }

  getMin() {
    // Must return smallest value node
    // Traverse leftmost path
  }

  getMax() {
    // Must return largest value node
    // Traverse rightmost path
  }

  /* ================= Traversals ================= */

  levelOrder() {
    // Must perform BFS traversal using Queue
    // Must return values level by level
  }

  preorder_rec() {
    // Traversal: root → left → right (recursive)
  }

  preorder_itr() {
    // Iterative preorder traversal using stack
  }

  inorder_rec() {
    // Traversal: left → root → right
    // Must return sorted values
  }

  inorder_itr() {
    // Iterative inorder traversal using stack
  }

  postorder_rec() {
    // Traversal: left → right → root
  }

  postorder_itr() {
    // Iterative postorder traversal using two stacks
  }

  /* ================= BST Helpers ================= */

  #getMin(node) {
    // Must return leftmost node in subtree
  }

  #getMax(node) {
    // Must return rightmost node in subtree
  }

  #search(node, value) {
    // Recursive BST search helper
    // Must return true if found
  }

  /* ================= DFS Helpers ================= */

  #preorder_rec(node, res) {
    // Recursive preorder helper
  }

  #inorder_rec(node, res) {
    // Recursive inorder helper
  }

  #postorder_rec(node, res) {
    // Recursive postorder helper
  }

  /* ================= Advanced AVL Utilities ================= */

  isBalanced() {
    // Must verify AVL invariant for all nodes:
    // |balanceFactor(node)| <= 1
  }

  validateBST() {
    // Must verify BST ordering property globally
  }

  findSuccessor(value) {
    // Must return inorder successor
  }

  findPredecessor(value) {
    // Must return inorder predecessor
  }

  toArray() {
    // Must return sorted array (inorder traversal)
  }

  clone() {
    // Must deep copy entire AVL tree
    // Must not share nodes
  }

  equals(otherTree) {
    // Must return true if:
    // same structure AND same values
  }

  /* ================= Iteration ================= */

  [Symbol.iterator]() {
    // Must iterate values in sorted order (inorder)
  }

  values() {
    // Must return iterator of values
  }

  entries() {
    // Must return iterator of [index, value] in sorted order
  }
}
