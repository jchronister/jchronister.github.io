/* eslint-disable require-jsdoc */
/* eslint-disable id-length */
"use strict";
/*global simpson,Simpson,createHTMLTree,node1*/

// eslint-disable-next-line no-unused-vars
function ownMochaTesting () {

var likeMocha = [];

describE("callmapMe", function() {
  iT("Map Array", function() {
    equaL(JSON.stringify([1,2,3,4,5].mapMe((n) => n + 3)), JSON.stringify([4, 5, 6, 7, 8]));
  });
});

describE("callfilterMe", function() {
  iT("Filter Array", function() {
    equaL(JSON.stringify([1,2,3,4,5].filterMe((n) => n > 3)), JSON.stringify([4, 5]));
  });
});

describE("callreduceMe", function() {
  iT("Reduce Array", function() {
    let redc = [1,2,3].reduceMe((a,n) => a + n, 0);
    equaL(redc, 6);
  });
});

describE("createSimpson", function() {
  iT("Constructor = Class", function() {
    let classSimpson = JSON.stringify(new simpson("Kevin"));
    let simpsonTest =JSON.stringify(new Simpson("Kevin"));
    equaL(simpsonTest, classSimpson);
  });
});

describE("createHTMLTree", function() {
  iT("Constructor = Class", function() {
    let nd1 = JSON.stringify(node1);
    let ndTest = JSON.stringify(createHTMLTree());
    equaL(ndTest, nd1);
  });
});

describE("Test Case", function() {
  iT("for Failed Colored Red", function() {
    equaL([1,2,3,4,5].mapMe((n) => n + 3), [4, 5, 6, 7, 8]);
  });
});




//OMT//OMT
function describE (str, funct) {
  likeMocha.push({describe:str});
  funct();
}

function iT(str, funct){
  likeMocha[(likeMocha.length-1)].it = str;
  funct();
}

function equaL(val1, val2) {
  if(val1 === val2) {
    likeMocha[(likeMocha.length-1)].passed = true;
  } else {
    likeMocha[(likeMocha.length-1)].passed = false;
  }
}


return likeMocha;

}
//OMT