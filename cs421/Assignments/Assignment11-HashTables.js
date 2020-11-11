/* eslint-disable require-jsdoc */
/* eslint-disable id-length */
"use strict";

/* global List*/

//HTC//HTC
function hashTableByChaining (ary) {// eslint-disable-line no-unused-vars

  // Initialize Hash Table
  let hashTable = new Array(11);
  for (var i = 0; i < hashTable.length; i++) hashTable[i] = new List();

  // Hash Function
  let hashFunction = function(key) {
    return (2 * key + 5) % 11;
  };

  // Get Array Spot & Fill 
  ary.forEach((n)=>hashTable[hashFunction(n)].insertLast(n));

  // Return Printable Hash Table
  var retrn = "\n";
  hashTable.forEach((n, i)=>retrn += i + ": " + n.print("return"));
  return retrn;
  
}
//HTC
//HTLP//HTLP
function hashTableByLinearProbing (ary) {// eslint-disable-line no-unused-vars

  // Initialize Hash Table
  let hashTable = new Array(11);
  let noSpace = "";

  // Hash Function
  let hashFunction = function(key) {
    return (2 * key + 5) % 11;
  };
  hashTableByLinearProbing.hashFunction = hashFunction;

  // Linear Probing Function
  let linearProbe = function(id, n) {
    return (id + n) % hashTable.length;
  };
  hashTableByLinearProbing.linearProbe = linearProbe;

  // Get Array Spot & Fill 
  ary.forEach(function(n) {
    
    // Get First Location
    var id = hashFunction(n);

    if (hashTable[id]) {
      // Find Next Available Location
      for (var i = 0; i < hashTable.length; i++) {
        let check = linearProbe(id,i);
        if (!hashTable[check]) {
          hashTable[check] = n;
          return;
        }
      }
      noSpace += n + " ";
    } else {
      hashTable[id] = n;
    }
    
  });

  hashTableByLinearProbing.table = hashTable; // eslint-disable-line no-unused-vars

  // Return Printable Hash Table
  let print = function (table) {
    var retrn = "";
    for(let i = 0; i < table.length; i++) {
      retrn += "\n" + i + ": " + table[i];
    }
    return retrn;
  };

  hashTableByLinearProbing.print = print;

  var retrn = print(hashTable);
  if (noSpace !== "") retrn += "\nNo Space for: " + noSpace;
  return retrn;
  
}
//HTLP
//HTQ//HTQ
function hashTableByQuadraticProbing (ary) {// eslint-disable-line no-unused-vars

  // Initialize Hash Table
  let hashTable = new Array(11);
  let noSpace = "";

  // Hash Function
  let hashFunction = function(key) {
    return (2 * key + 5) % 11;
  };

  // Linear Probing Function
  let linearProbe = function(id, n) {
    return id + (n*n);
  }; 

  // Get Array Spot & Fill 
  ary.forEach(function(n) {
    
    // Get First Location
    var id = hashFunction(n);

    if (hashTable[id]) {
      // Find Next Available Location
      for (var i = 0; i < hashTable.length; i++) {
        let check = linearProbe(id,i) % hashTable.length;
        if (!hashTable[check]) {
          hashTable[check] = n;
          return;
        }
      }
      noSpace += n + " ";
    } else {
      hashTable[id] = n;
    }
    
  });

  // Return Printable Hash Table
  var retrn = "";
  for(let i = 0; i < hashTable.length; i++) {
    retrn += "\n" + i + ": " + hashTable[i];
  }

  if (noSpace !== "") retrn += "\nNo Space for: " + noSpace;
  return retrn;
  
}
//HTQ
//H2H//H2H
function hashTableBySecondaryHashProbing (ary) {// eslint-disable-line no-unused-vars

  // Initialize Hash Table
  let hashTable = new Array(11);
  let noSpace = "";

  // Hash Function
  let hashFunction = function(key) {
    return (2 * key + 5) % 11;
  };

  // Linear Probing Function
  let linearProbe = function(id, i, n) {
    return id + (i * (7 - (n % 7)));
  }; 

  // Get Array Spot & Fill 
  ary.forEach(function(n) {
    
    // Get First Location
    var id = hashFunction(n);

    if (hashTable[id]) {
      // Find Next Available Location
      for (var i = 0; i < hashTable.length; i++) {
        let check = linearProbe(id, i,n) % hashTable.length;
        if (!hashTable[check]) {
          hashTable[check] = n;
          return;
        }
      }
      noSpace += n + " ";
    } else {
      hashTable[id] = n;
    }
    
  });

  // Return Printable Hash Table
  var retrn = "";
  for(let i = 0; i < hashTable.length; i++) {
    retrn += "\n" + i + ": " + hashTable[i];
  }

  if (noSpace !== "") retrn += "\nNo Space for: " + noSpace;
  return retrn;
  
}
//H2H
//RHLP//RHLP
function removeKeyLinearProbe(key){// eslint-disable-line no-unused-vars

  var specialMarker = "%<>%";
  var table = hashTableByLinearProbing.table;

  if (!table) {
    return "Please Create Hash Table First";
  }

  var id = hashTableByLinearProbing.hashFunction(key);

  var i = 0;

  while (i < table.length) {

    var check = hashTableByLinearProbing.linearProbe(id, i);

    if (table[check] === key) {
      table[check] = specialMarker;
      i = table.length; //Exit
    } else if (table[check] === undefined) {
      // No Key
      i = table.length;
    }
    i+=1;
  }

  return hashTableByLinearProbing.print(table);

}
//RHLP