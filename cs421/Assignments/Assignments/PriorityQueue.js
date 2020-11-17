/* eslint-disable id-length */
/* eslint-disable require-jsdoc */
"use strict";

/*global module require*/

if (typeof window === "undefined") {
  var Tree = require("./MinHeap.js");
} else {
  if(!Tree) Tree = window.module.exports;
}

class PQItem  {
    constructor(key, elem) {
        this._key = key;
        this._elem = elem;
    }
    key() {
        return this._key;
    }
    element() {
        return this._elem;
    }
}
function compare(item1, item2) {
    return item1.key() - item2.key();
}
class PriorityQueue {
    constructor() {
        this._heap = new Tree.MinHeap(compare);
    }
    insertItem(key, elem) { // returns the Position containing new Item
        let newItem = new PQItem(key, elem);
        return this._heap.insertElem(newItem);
    }
    removeMin() {
        let item = this._heap.removeMin();
        return item.element();
    }
    minKey() {
        let item = this._heap.minElement();
        return item.key();
    }
    minElement() {
        let item = this._heap.minElement();
        return item.element();
    }
    size() {
        return this._heap.size();
    }
    isEmpty() {
        return this._heap.isEmpty();
    }
}

// Node/Browser Fix for export/require
if(typeof window !== "undefined") {
  if (!window.module) window.module = {};
  if (!window.module.exports) window.module.exports = {};
}

module.exports.PriorityQueue = PriorityQueue;