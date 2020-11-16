/* eslint-disable id-length */
/* eslint-disable require-jsdoc */
"use strict";

class TPos {
  constructor(left, elem, right, parent) {
      this._parent = parent;
      this._left = left;
      this._right = right;
      this._elem = elem;
  }
  element() {
      return this._elem;
  }
}
class BinaryTree {
  constructor() {
      this._root = null;
      this._size = 0;
  }
  size() {
      return this._size;
  }
  isEmpty() {
      return this._size == 0;
  }
  root() {
      return this._root;
  }
  isRoot(p) {
      return p == this._root;
  }
  parent(p) {
      return p._parent;
  }
  leftChild(p) {
      return p._left;
  }
  rightChild(p) {
      return p._right;
  }
  _isLeftChild(p) {
      return p != null && p._parent != null 
          && p._parent._left == p;
  }
  sibling(p) {
      if (this._isLeftChild(p)) {
          return p._parent._right;
      } else {
          return p._parent._left;
      }
  }
  isExternal(p) {
      return (p == null);
  }
  isInternal(p) {
      return (p != null);
  }
  replaceElement(p, e) {
      let oldElem = p._elem;
      p._elem = e;
      return oldElem;
  }
  swapElements(p, q) {
      let temp = p._elem;
      p._elem = q._elem;
      q._elem = temp;
  }
  insertRoot(e) {
      if (this._size > 0) {
          throw new Error("Invalid insertRoot(e) to non-empty tree");
      }
      this._root = new TPos(null, e, null, null);
      this._size++;
      return this._root;
  }
  insertLeft(p, e) {
      if (this.isExternal(p) || this.isInternal(p._left)) {
          throw new Error("Invalid insertLeft(p,e) operation");
      }
      let newLeft = new TPos(null, e, null, p);
      p._left = newLeft;
      this._size++;
      return newLeft;
  }
  insertRight(p, e) {
      if (this.isExternal(p) || this.isInternal(p._right)) {
          throw new Error("Invalid insertRight(p,e) operation");
      }
      let newRight = new TPos(null, e, null, p);
      p._right = newRight;
      this._size++;
      return newRight;
  }
  remove(p) {
      if (this.isExternal(p)) {
          throw new Error("Invalid remove(p): p is not internal");
      }
      let parent = p._parent;
      let remainingChild = null;
      if (this.isExternal(p._left)) {
          remainingChild = p._right;  // remainingChild stays in tree
      } else if (this.isExternal(p._right)) {
          remainingChild = p._left;   // remainingChild stays in tree
      } else {
          throw new Error("Invalid remove(p): both children are internal");
      }
      if (this.isRoot(p)) {
          this._root = remainingChild;  // remainingChild stays in tree
          if (this.isInternal(remainingChild)) {  // could be an empty tree after remove
              remainingChild._parent = null;
          }
      } else {
          if (this._isLeftChild(p)) {
              parent._left = remainingChild;  // remainingChild stays in tree
          } else {
              parent._right = remainingChild;  // remainingChild stays in tree
          }
          if (this.isInternal(remainingChild)) {
              remainingChild._parent = parent;
          }
      }
      this._size--;
      return remainingChild;  // remainingChild stays in tree
  }
}
class Item {
  constructor(k, e) {
      this._key = k;
      this._elem = e;
  }
  key() {
      return this._key;
  }
  element() {
      return this._elem;
  }
}
class BinarySearchTree extends BinaryTree {
  constructor() {
      super();
  }
  compareKeys(key1, key2) {
      return key1 - key2;
  }
  replaceItem(p, item) {
      return super.replaceElement(p, item);
  }
  swapItems(p, q) {
      super.swapElements(p, q);
  }
  _findPosition(k, p) {
      let diff = this.compareKeys(k, p.element().key());
      if (diff < 0) {
          if (this.isExternal(p._left)) {
              return p;
          } else {
              return this._findPosition(k, p._left);
          }
      } else if (diff > 0) {
          if (this.isExternal(p._right)) {
              return p;
          } else {
              return this._findPosition(k, p._right);
          }
      } else {  // key k is in position p
          return p;  
      }
  }
  insertItem(k, e) {
      if (this.isEmpty()) {
          return this.insertRoot(new Item(k, e));
      } else {
          let p = this._findPosition(k, this.root());
          let diff = this.compareKeys(k, p.element().key());
          if (diff == 0) { // k is already in the tree
              p.element()._elem = e; // update/replace the element
              return p;
          } else {
              let newItem = new Item(k, e);
              if (diff < 0) {
                  return this.insertLeft(p, newItem);
              } else { 
                  return this.insertRight(p, newItem);
              }
          }
      }
  }
  _findPos2Remove(k) {
      let v = this._findPosition(k, this.root());
      let r = v;
      if (this.isInternal(v._left) && this.isInternal(v._right)) {
          r = this._findPosition(k, v._left);
          this.swapItems(v, r);
      }
      return r;
  }
  removeElement(k) {
      if (this.isEmpty()) { // key k is not in the BST
          return null;
      }
      let r = this._findPos2Remove(k);
      if (r.element().key() != k) { // key k is not in the BST
          return null;
      } else {
          this.remove(r);
      }
      return r.element().element();
  }
  findElement (k) {
      if (this.isEmpty()) { // key k is not in the BST
          return null;
      }
      let p = this._findPosition(k, this.root());
      if (p.element().key() != k) { // key not found
          return null;
      } else {
          return p.element().element();
      }
  }
}
var COLOR = ({RED: 0, BLACK: 1, DBLACK: 2});

class RedBlackTree extends BinarySearchTree {// eslint-disable-line no-unused-vars
  constructor() {
      super();
  }
  _rotateLeft(y) {
      if (this.isExternal(y) || this.isRoot(y)) {
          throw Error("Invalid Left Rotation: y cannot be the root");
      }
      let p = y._parent; // p must not be null
      let gp = p._parent;

      p._right = y._left; // bug 1 misspelling: left_
      if (this.isInternal(y._left)) { // bug 2 null pointer, so needed if
          y._left._parent = p;
      }

      y._left = p;
      p._parent = y;

      if (this.isRoot(p)) {
          this._root = y;
      } else if (gp._left == p) { // bug 7: typo/type error (= instead of ==)
          gp._left = y;
      } else {
          gp._right = y;
      }
      y._parent = gp;
  }
  _rotateRight(y) {
      if (this.isExternal(y) || this.isRoot(y)) {
          throw Error("Invalid Right Rotation: y cannot be the root");
      }
      let p = y._parent; // p must not be null
      let gp = p._parent;
      p._left = y._right;
      if (this.isInternal(y._right)) { // bug 2 (same as in _rotateLeft)
          y._right._parent = p;
      }

      y._right = p;
      p._parent = y;

      if (this.isRoot(p)) {
          this._root = y;
      } else if (gp._right == p) {
          gp._right = y;
      } else {
          gp._left = y;
      }
      y._parent = gp;
  }
  _restructure(z) {
      let p = z._parent;
      if (this._isLeftChild(z)) {
          if (this._isLeftChild(p)) {
              this._rotateRight(p);
          } else { // p is a right child
              this._rotateRight(z);
              this._rotateLeft(z);
          }
      } else { // z is a right child
          if (this._isLeftChild(p)) {
              this._rotateLeft(z);
              this._rotateRight(z);
          } else { // p is also a right child
              this._rotateLeft(p);
          }
      }
  }
  _splitRecolor(parent) {  // Removed z in (parent, z)
      parent._color = COLOR.BLACK;
      this.sibling(parent)._color = COLOR.BLACK;
      let gp = parent._parent;
      gp._color = COLOR.RED;
      return gp;
  }
  _isDoubleRed(p) {
      if (this.isRoot(p)) {
          p._color = COLOR.BLACK;
          return false;
      } else {
          return this.isRed(p._parent); // bug 3: p._parent, not p
      }
  }
  _redChildOf(p) {
      let left = p._left;
      let right = p._right;
      let redChild = null;
      if (this.isRed(left)) {
          redChild = left;
          if (this._isLeftChild(p) && this.isRed(right)) {
              redChild = right;
          }
      } else if (this.isRed(right)) { // bug 4 right instead of left
          redChild = right;
      }
      return redChild;
  }
  _adjustment(y) {
      let p = y._parent;
      // console.log("p="+p.element().key());
      // console.log("y="+y.element().key());
      let newY = null;
      if (this._isLeftChild(y)) {
          newY = y._right;
          this._rotateRight(y);
      } else {
          newY = y._left;
          this._rotateLeft(y);
      }
      p._color = COLOR.RED;
      y._color = COLOR.BLACK;
      return newY;
  }
  _fusionRecolor(y, p, r) {
      y._color = COLOR.RED;
      if (this.isRed(p)) {
          p._color = COLOR.BLACK;
      } else {
          p._color = COLOR.DBLACK;
      }
      if (this.isInternal(r)) {
          r._color = COLOR.BLACK;
      }
      return p;
  }
  _isDoubleBlack(p) {
      return p._color == COLOR.DBLACK;
  }
  _removeDoubleBlack(y, r) {
      if (this.isExternal(r) || this._isDoubleBlack(r)) {
          if (this.isRed(y)) {  // case 3
              y = this._adjustment(y);
          }
          let p = y._parent;
          let z = this._redChildOf(y);
          if (this.isBlack(z)) { // case1: sibling has no red children
              r = this._fusionRecolor(y, p, r);
              if (this.isRoot(r)) {
                  r._color = COLOR.BLACK;
              } else {
                  y = this.sibling(r);
                  this._removeDoubleBlack(y, r);    // recursive rather than iterative
              }
          } else { // case 2: z is red corresponds to transfer in a 2-4 tree
              this._restructure(z);
              p._parent._color = p._color; // new parent of p is same color as previous parent of y
              p._color = COLOR.BLACK;
              z._color = COLOR.BLACK;
              if (this.isInternal(r)) { // bug 5: r could be null/external
                  r._color = COLOR.BLACK;
              }
          }
      }
  }
  isBlack(p) {
      return this.isExternal(p) || p._color == COLOR.BLACK;
  }
  isRed(p) {
      return this.isInternal(p) && p._color == COLOR.RED;
  }
  iterator() {
      return new RB_Iterator(this);
  }
  insertItem(k, e) {
      let q = super.insertItem(k, e);
      if (q != null) { // the item was inserted
          q._color = COLOR.RED;  // add the _color attribute to q
          let z = q;
          while (this._isDoubleRed(z)) {
              let p = z._parent;
              let w = this.sibling(p); // uncle
              if (this.isBlack(w)) { // case 1: uncle is black
                  let gp = p._parent;
                  this._restructure(z);
                  gp._color = COLOR.RED;
                  gp._parent._color = COLOR.BLACK; // new parent of gp
                  return q;
              } else { // case 2: uncle is red
                  z = this._splitRecolor(p, z);
              }
          }
      }
      return q;
  }
  removeElement(k) {
      if (this.isEmpty()) { // key k is not in the BST
          return null;
      }
      let v = this._findPos2Remove(k);
      if (v.element().key() != k) { // key k is not in the BST
          // console.log("Key not found " + k);
          return null;
      }
      let y = this.sibling(v);  // after deletion of v, y is sibling of r
      // console.log("Removing " + r.element().key());
      let r = this.remove(v);  // r is the child of v that remains in the tree
      if (this.isBlack(v) && this.isExternal(r)) { // r the remaining child is black
          this._removeDoubleBlack(y, r);
      } else {
          r._color = COLOR.BLACK; // r has to be a red child
      }
      return v.element().element();
  }
}
class EulerTour {
  visitExternal(T, p, result) { }// eslint-disable-line no-unused-vars
  visitPreOrder(T, p, result) { }// eslint-disable-line no-unused-vars
  visitInOrder(T, p, result) { }// eslint-disable-line no-unused-vars
  visitPostOrder(T, p, result) { }// eslint-disable-line no-unused-vars
  eulerTour(T, p) {
      let result = new Array(3);
      if (T.isExternal(p)) {
          this.visitExternal(T, p, result);
      } else {
          this.visitPreOrder(T, p, result);
          result[0] = this.eulerTour(T, T.leftChild(p));
          this.visitInOrder(T, p, result);
          result[2] = this.eulerTour(T, T.rightChild(p));
          this.visitPostOrder(T, p, result);
      }
      return result[1];
  }
}

class RB_Iterator extends EulerTour {// eslint-disable-line camelcase
  constructor(T) {
      super();
      this._nodes = [];
      this._index = 0;
      this._getNodes(T);
      this.reset();
  }
  visitInOrder(T, v, result) {  // eslint-disable-line no-unused-vars
      this._nodes[this._index] = v.element(); //bug 6 missing '= v' :-)
      this._index++;
  }
  _getNodes(T) {
      this.eulerTour(T, T.root());
  }
  hasNext() {
      return this._index < this._nodes.length;
  }
  nextObject() {
      let next = this._nodes[this._index];
      this._index++;
      return next;
  }
  reset() {
      this._index = 0;
  }
}

class PrintInOrder {// eslint-disable-line no-unused-vars
  constructor(T) {
      this._iter = T.iterator();
  }
  print(retrn) {
      this._iter.reset();
      let res = "[";
      while (this._iter.hasNext()) {
          let next = this._iter.nextObject();
          if (this._iter.hasNext()) {
              res = res + next.key() + " ";
          } else {
              res = res + next.key();
          }
      }
      if (retrn) {
        return res + "]";
      } else {
        console.log(res + "]");
      }
  }
}
class Print extends EulerTour {// eslint-disable-line no-unused-vars
  visitExternal(T, v, result) {
      result[1] = "";
  }
  visitPostOrder(T, v, result) {
      result[1] = "(" + result[0] + v.element().key() +"," + this.color(v._color) + result[2] +")";
  }
  color(col) {
      return col==0 ? "R" : "B";
  }
  print(T, retrn) {
      let ret = "";
      if (T.size() > 0) {
        if (retrn) {
          ret = "Root="+T.root().element().key() +"\n";
        } else {
          console.log("Root="+T.root().element().key());
        }
      }
      let res = this.eulerTour(T, T.root());
      if (retrn) {
        return ret + "[" + res + "]\n";
      } else {
        console.log("[" + res + "]\n");
      }
  }
}

// var t0 = new RedBlackTree();

// var printer = new Print();

// printer.print(t0);
// var h = new Height();

// t0 = new RedBlackTree();

// printer = new Print();

// printer.print(t0);
// h = new Height();

// var bh = new BlackHeight();

// console.log("height="+ h.height(t0)+"\n"); // should be 0
// console.log("black-height="+ bh.height(t0)+"\n"); // should be 0
// t0.insertItem(50, 100);
// printer.print(t0);
// console.log("height="+ h.height(t0)+"\n"); // should be 1
// console.log("black-height="+ bh.height(t0)+"\n"); // should be 1

// t0.insertItem(150, 100);
// t0.insertItem(100, 100);
// printer.print(t0);
// console.log("height="+ h.height(t0)+"\n");
// console.log("black-height="+ bh.height(t0)+"\n");
// t0.insertItem(200, 100);
// t0.insertItem(450, 100);
// t0.insertItem(350, 100);
// t0.insertItem(250, 100);
// t0.insertItem(650, 100);
// t0.insertItem(550, 100);
// printer.print(t0);
// console.log("height="+ h.height(t0)+"\n");
// console.log("black-height="+ bh.height(t0)+"\n");
// t0.insertItem(500, 120);
// printer.print(t0);
// console.log("key= 200, element="+ t0.findElement(200));
// console.log("key= 450, element="+ t0.findElement(450));
// console.log("key= 500, element="+ t0.findElement(500));
// t0.insertItem(500, 130);
// console.log("key= 500, element="+ t0.findElement(500));

// t0.insertItem(500, 100);
// printer.print(t0);
// console.log("height="+ h.height(t0)+"\n");
// console.log("black-height="+ bh.height(t0)+"\n");
// let inOrderPrinter = new PrintInOrder(t0);
// inOrderPrinter.print();

// t0.removeElement(50);
// printer.print(t0);
// console.log("height="+ h.height(t0)+"\n");
// console.log("black-height="+ bh.height(t0)+"\n");
// t0.removeElement(50);
// printer.print(t0);
// console.log("height="+ h.height(t0)+"\n");
// console.log("black-height="+ bh.height(t0)+"\n");
// t0.removeElement(350);
// printer.print(t0);
// console.log("height="+ h.height(t0)+"\n");
// console.log("black-height="+ bh.height(t0)+"\n");
// t0.removeElement(200);
// printer.print(t0);
// console.log("height="+ h.height(t0)+"\n");
// console.log("black-height="+ bh.height(t0)+"\n");
// t0.removeElement(150);
// printer.print(t0);
// console.log("height="+ h.height(t0)+"\n");
// console.log("black-height="+ bh.height(t0)+"\n");
// t0.removeElement(250); // test of adjustment
// printer.print(t0);
// console.log("height="+ h.height(t0)+"\n");
// console.log("black-height="+ bh.height(t0)+"\n");
// t0.insertItem(25, 100);
// t0.insertItem(50, 100); // double rotation
// t0.insertItem(200, 100); // rotate right
// printer.print(t0);
// console.log("height="+ h.height(t0)+"\n");
// console.log("black-height="+ bh.height(t0)+"\n");

class PrintPlainTree extends EulerTour {// eslint-disable-line no-unused-vars
  visitExternal(T, v, result) {
      result[1] = "";
  }
  visitPostOrder(T, v, result) {
      result[1] = "(" + result[0] + v.element() + result[2] +")";
  }
  print(T, retrn) {

      if (retrn) {
        let size = T.size() > 0 ? "Root="+T.root().element() : "";
        let res = this.eulerTour(T, T.root());
        size += "\n[" + res + "]";
        return size;
      }

      if (T.size() > 0) {
          console.log("Root="+T.root().element());
      }
      let res = this.eulerTour(T, T.root());
      console.log("[" + res + "]\n");
  }
}
