/* eslint-disable id-length */
/* eslint-disable require-jsdoc */
"use strict";

/*global require module*/

if (typeof window === "undefined") {
  var Tab = require("./LinearHashTable.js");
} else {

  // // Load Required Files
  // let addScript = function (script) {
  //   var scr  = document.createElement("script");
  //   scr.src = script;
  //   scr.async = false;
  //   document.head.appendChild(scr);
  // };
  // addScript("./LinearHashTable.js");

  if(!Tab) Tab = window.module.exports;
}


class HT_Dictionary {// eslint-disable-line camelcase
    constructor() {
        this._HT = new Tab.LinearHashTable();
    }
    findElement(key) {
        return this._HT.findElement(key);
    }
    insertItem(key, elem) {
        return this._HT.insertItem(key, elem);
    }
    removeElement(key) {
        return this._HT.removeElement(key);
    }
    size() {
        return this._HT.size();
    }
    isEmpty() {
        return this._HT.isEmpty();
    }
    items() {
        return this._HT.items();
    }
    keys() {
        return this._HT.keys();
    }
    elements() {
        return this._HT.elements();
    }
    print() {
        return this._HT.print();
    }
}


// Node/Browser Fix for export/require
if(typeof window !== "undefined") {
  if (!window.module) window.module = {};
  if (!window.module.exports) window.module.exports = {};
}

module.exports.HT_Dictionary = HT_Dictionary;// eslint-disable-line camelcase