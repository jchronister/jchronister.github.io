/* eslint-disable require-jsdoc */
/* eslint-disable id-length */
"use strict";


/* global EulerTour PrintPlainTree BinaryTree RedBlackTree Print*/




//BTH//BTH//RTHD  
class TreeHeight extends EulerTour {

  visitExternal(tree, p, result) {
    result[1] = 0;
  }

  visitPostOrder(tree, p, result) {

    // Red/Black Tree if Has isRed Method
    if(tree.isRed) {
      // Red Height = 0, Black Height = 1
      var h = tree.isRed(p) ? 0 : 1;
    } else {
      // Regular Tree
      h = 1;
    }

    result[1] = Math.max(result[0], result[2]) + h;

  }

  height(tree) {
    if (tree.isEmpty()) return 0;
    return this.eulerTour(tree, tree.root());
  }
}
//RTHD
function getBinaryTreeHeight(ary) {// eslint-disable-line no-unused-vars

  if (ary.length < 2) return "Bad Tree: " + JSON.stringify(ary);

  var tree = new BinaryTree();
  var printer = new PrintPlainTree();
  var pos = [null];
  ary.unshift(null);

  pos[1] = tree.insertRoot(ary[1]);

  var l = 1;
  while (l < ary.length) {

    let lf = l * 2;
    if (lf >= ary.length) break;
    if (ary[lf] !== "null") pos[lf] = tree.insertLeft(pos[lf / 2], ary[lf]);

    let rt = l * 2 + 1;
    if (rt >= ary.length) break;
    if (ary[rt] !== "null") pos[rt] = tree.insertRight(pos[(rt - 1) / 2], ary[rt]);
    l += 1;
  }

  return printer.print(tree, "return") + "\n Height is: " + (new TreeHeight).height(tree);
}
//BTH
//RTHF
function getRedBlackTreeHeight(max) {// eslint-disable-line no-unused-vars

    // Create and Fill Tree
    var tree = new RedBlackTree();
    for (var i = 0; i <= max; i+=5) {
      tree.insertItem(i,i + " El");
    }

    var printer = new Print();

    return printer.print(tree, "return") + "\n Height is: " + (new TreeHeight).height(tree);

}//RTHF


