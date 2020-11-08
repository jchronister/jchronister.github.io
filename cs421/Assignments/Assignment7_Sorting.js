/* eslint-disable require-jsdoc */
/* eslint-disable id-length */
"use strict";

/*global */


function generateRandomArray(n, min, max) {

  let random = function randomInteger(min,max) {// eslint-disable-line no-unused-vars
    var num = Math.ceil(Math.random() * (max - (min - 1)) + (min - 1));
    if(num == 0) num = 0; //Remove -0
    return num;
  };

  let list = [];
  
  for (var i = 0; i < n; ++i) {
    list.push(random(min, max));
  }
  return list;
}


//SS//SS
function selectionSort(ary) {

  var compare = 0;
  var swaps = 0;
  var timeStart = Date.now();

  // Return Minimum Index in Array
  let getMinIndex = function (ary, start, end) {
    
    let index = start;
    let min = ary[index];
    
    for (var i = start + 1; i <= end; i += 1) {
      compare++;
      if (ary[i] < min) {
        min = ary[i];
        index = i;
      }
    }
    return index;
  };
  
  let end = ary.length - 1;

  // Sort
  for (var i = 0; i <= end; i += 1) {
    var temp = ary[i];
    var minId = getMinIndex(ary, i, end);
    swaps++;
    ary[i] = ary[minId];
    ary[minId] = temp;
  }

  var timeEnd = Date.now();

  return "Selection Sort " + compare + " compares and " + swaps+ " swaps in " + (timeEnd - timeStart) + " ms";

}

function callSelectionSort (n = 100) {// eslint-disable-line no-unused-vars

  let ary = generateRandomArray(n, 0, 100);
  console.log(ary.slice());
  console.log(selectionSort(ary));
  console.log(ary);
  return "See Console for Output";

}
//SS
//IS//IS
function insertionSort(ary, gap = 1) {

  var compare = 0;
  var insert = 0;
  let end = ary.length;
  var timeStart = Date.now();

  for (var i = 1; i < end; i += 1) {

    var temp = ary[i];
    var j = i;
    var comp = j - gap;
    while (comp >= 0 && ary[comp] > temp) {
      compare++;
      insert++;
      ary[j] = ary[comp];
      j -= gap;
      comp = j - gap;
    }

    insert++;
    ary[j] = temp;

    }

    var timeEnd = Date.now();
    return "Insert Sort " + compare + " compares and " + insert + " inserts in " + (timeEnd - timeStart) + " ms";

}

function callInsertionSort (n = 100) {// eslint-disable-line no-unused-vars

  let ary = generateRandomArray(n, 0, 100);
  console.log(ary.slice());
  console.log(insertionSort(ary));
  console.log(ary);
  return "See Console for Output";

}
//IS
//SIS//SIS
function shellSort(ary){

  var compare = 0;
  var insert = 0; 
  let end = ary.length;
  var timeStart = Date.now();

  // Insertion Sort Function
  var sort = function(ary, gap = 1) {  
    
    for (var i = 1; i < end; i += 1) {

      var temp = ary[i];
      var j = i;
      var comp = j - gap;
      compare++;
      while (comp >= 0 && ary[comp] > temp) {
        compare++;
        insert++;
        ary[j] = ary[comp];
        j -= gap;
        comp = j - gap;
      }

      insert++;
      ary[j] = temp;

    }
  };

  // Calculate Intervals and Call Insertion Sort
  var gEnd = Math.floor((ary.length - 1) / 3);
  var g = 1;

  while (g <= gEnd) {
    g = g * 3 + 1;
  }

  while (g > 0) {
    sort(ary,g);
    g = (g - 1) / 3;
  }

  var timeEnd = Date.now();
  return "Shell Sort " + compare + " compares and " + insert + " inserts in " + (timeEnd - timeStart) + " ms";

}

function callShellSort (n = 100) {// eslint-disable-line no-unused-vars

  let ary = generateRandomArray(n, 0, 100);
  console.log(ary.slice());
  console.log(shellSort(ary));
  console.log(ary);
  return "See Console for Output";

}
//SIS
//HS//HS
class heapSort {

  constructor(ary, base) {
    this.base = base || 0;
    this.heap = ary;
    this.swap = 0;
    this.compare = 0;
    this.start = Date.now();
    this.buildHeap();
    this.sort();
    this.end = Date.now();
    
  }

  sortTime () {
    return "Heap Sort " + this.compare + " compares and " + this.swap + " swaps in " + (this.end - this.start) + " ms";
  }

  downHeap (index, end) {
    let notProper = true;
    let parentIndex = index || this.base;

  while (notProper) {

    var childIndex = this.indexOfMinChild(parentIndex, end);

    if (childIndex === parentIndex) {
      notProper = false;
    } else {
      this.swapElements(childIndex, parentIndex);
      parentIndex = childIndex;
    }
  }

  }

  indexOfMinChild(index, end = this.size()) {

    let smallest = index;
    let left = this.leftChildIndex(index);
    let right = this.rightChildIndex(index);
    let size = end;
    this.compare += 2;
    if (left < size && this.heap[left] > this.heap[smallest]) smallest = left;
    if (right < size && this.heap[right] > this.heap[smallest]) smallest = right;
    
    return smallest;

  }

  size() {
    return this.heap.length - this.base;
  }

  swapElements (indx1, indx2) {
    let temp = this.heap[indx1];
    this.heap[indx1] = this.heap[indx2];
    this.heap[indx2] = temp;
    this.swap++;
  }

  leftChildIndex (parentIndex){
    switch (this.base) {
      case 0: return 2 * parentIndex + 1;
      case 1: return 2 * parentIndex;
    }
  }

  rightChildIndex (parentIndex){
    switch (this.base) {
      case 0: return 2 * parentIndex + 2; 
      case 1: return 2 * parentIndex + 1;
    }
  }

  parent (childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  buildHeap () {

    let last = this.size() - 1;
    let next = last;

    while (next > 0) {
      this.downHeap(this.parent(next));
      next = next - 2;
    }

  }

  sort() {
    
    let end = this.size() -1;

    while (end > 0) {
      this.swapElements(0, end);
      end = end - 1;
      this.downHeap(0, end);
    }
  }

}

function callHeapSort (n) {// eslint-disable-line no-unused-vars

  let ary = generateRandomArray(n, 0, 100);
  console.log(ary.slice());
  console.log(new heapSort(ary).sortTime());
  console.log(ary);
  return "See Console for Output";

}
//HS

//CS//CS
function compareSorts(n = 10) {// eslint-disable-line no-unused-vars

  let ary = generateRandomArray(n, 0, 100);
  let ary2 = ary.slice();
  let ary3 = ary.slice();
  let ary4 = ary.slice();
  let ary5 = ary.slice();
  let ary6 = ary.slice();

  console.log(ary.slice());
  console.log(selectionSort(ary));
  console.log(insertionSort(ary2));
  console.log(shellSort(ary4));
  console.log(new heapSort(ary3).sortTime());
  console.log(timeQuickSort(ary5));
  console.log(timeArraySort(ary6));
  
  console.log(ary);

  // Verify Sorts All the Same
  var match = "";
  for (var i = 0; i < ary.length; ++i) {
    if (ary[i] !== ary2[i] || ary[i] !== ary3[i] ||
        ary[i] !== ary4[i] || ary[i] !== ary5[i] ||
        ary[i] !== ary6[i]){
      match = "Error Arrays do Not Match";
      break;
    }
  }

  console.log(match === "" ? "Arrays Match" : match);

  return "See Console for Output";

}
//CS



//*Quick Sort

function quickSort(ary) {

  let start = arguments[1] === undefined ? 0 : arguments[1];
  let end = arguments[2] === undefined ? ary.length - 1 : arguments[2];

  if (start >= end) return; 

  let mid = randomInteger(start, end);

  let se = flipElements(ary, mid, start, end);

  quickSort(ary, start, se[0]);
  quickSort(ary, se[1], end);

  return ary;
}

function randomInteger(min,max) {
  return Math.ceil(Math.random() * (max - (min - 1)) + (min - 1));
}

function flipElements(ary, mid, start, end) {

  var i = start;
  var midValue = ary[mid];

  while (i <= end) {
    quickSort.compare++;
    if (ary[i] > midValue) {
      // Move to End
      swapElements(ary, i, end);
      end -= 1;
    } else {
      quickSort.compare++;
      if (ary[i] < midValue) {
        // Move to Front
        swapElements(ary, i, start);
        start += 1;
      }
      i += 1;
    }
  }
  
  return [start === 0 ? start : start - 1, end === ary.length - 1 ? end : end + 1];
}

function swapElements(ary, indexA, indexB) {
  var temp = ary[indexA];
  ary[indexA] = ary[indexB];
  ary[indexB] = temp;
  quickSort.swap++;
}


function timeQuickSort (ary) {

  quickSort.swap = 0;
  quickSort.compare = 0;

  var timeStart = Date.now();
  quickSort(ary);

  var timeEnd = Date.now();
  return "Quick Sort " + quickSort.compare + " compares and " + quickSort.swap + " swaps in " + (timeEnd - timeStart) + " ms";


}

function timeArraySort (ary) {

  var timeStart = Date.now();
  ary.sort((a,b)=>a-b);

  var timeEnd = Date.now();
  return "Built in Array Sort in " + (timeEnd - timeStart) + " ms";

}