/* eslint-disable id-length */
/* eslint-disable require-jsdoc */
"use strict";

/*global require module*/

if (typeof window === "undefined") {
  var Tree = require("./RBTree.js");
} else {

  if(!Tree) Tree = window.module.exports;
}

class BST_Dictionary {// eslint-disable-line camelcase
    constructor() {
        this._BST = new Tree.RedBlackTree();
    }
    findElement(key) {
        return this._BST.findElement(key);
    }
    insertItem(key, elem) {
        return this._BST.insertItem(key, elem);
    }
    removeElement(key) {
        return this._BST.removeElement(key);
    }
    size() {
        return this._BST.size();
    }
    isEmpty() {
        return this._BST.isEmpty();
    }
    items() {
        return this._BST.items();
    }
    keys() {
        return this._BST.keys();
    }
    elements() {
        return this._BST.elements();
    }
    toString() {
        let iter = this._BST.items();
        let res = "[";
        while (iter.hasNext()) {
            let item = iter.nextObject();
            if (iter.hasNext()) {
                res = res + item.toString() + ", ";
            } else {
                res = res + item.toString();
            }
        }
        return res + "]";
    }
    print() {
        console.log(this.toString());
    }
}

// Node/Browser Fix for export/require
if(typeof window !== "undefined") {
  if (!window.module) window.module = {};
  if (!window.module.exports) window.module.exports = {};
}

module.exports.BST_Dictionary = BST_Dictionary;// eslint-disable-line camelcase