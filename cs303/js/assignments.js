/* eslint-disable id-length */
"use strict";

// Alert Error
if(typeof window === "object") window.onerror = function(msg, page, line){
  alert(msg +"\nLine " + line + "\n" + page );
};

var $setup = {

  ary: [],
  lastRef: undefined,
  jsLoaded: [],
  jsUpdate: 0,
 
  /** Returns if Search is in Array
   * @param  {*[]} arr - Array to Search
   * @param  {*} search - Search Value
   * @returns {Number} Array Element Id or -1 for No Match
   */
  getArrayId: function (arr, search) {

    if (arr.length === 0) return -1;

    for (let i = 0; i < arr.length; i+=1) {
      if (arr[i] === search) return i;
    }
    return -1;
  },



  /** Returns if Search is in Array [[]] 
   * @param  {*[]} arr - Array to Search
   * @param  {*} search - Search Value
   * @param  {Number} index - Element Index
   * @returns {Number} Array Element Id or -1 for No Match
   */
  getjsLoadedId: function (arr, search, index) {

    if (arr.length === 0) return -1;

    for (let i = 0; i < arr.length; i+=1) {
      if (arr[i][index] === search) return i;
    }
    return -1;
  },

  /* Setup Options
    let setup = {
    key: "randomInteger",
    filePath: "./randomInteger.js" - Path to Function Code
    fileCrop: [null, "//^//"], -
    functionRef: randomInteger, 
    callCaption: "Click to Call Function randomInteger",
    promptQuestion: "Please Enter Min and Max Separated by Comma",
    promptReturn: ["number","number"],
    defaultPromptInput: "1, 10",
  */









  /** Returns Object Matching Key
   * @param {String} key - Object Key
   * @param {*} value - Value to Compare
   * @param{Number} exitId - Exit Value
   * @returns {Object} Setup Object or Undefined for No Match
   */
  getRef: function (key, value, exitId) {
    var exit = exitId + 1 || this.ary.length;
    for (let i = 0; i < exit; i+=1) {
      if (this.ary[i][key] === value) {
        this.lastRef = this.ary[i];
        return this.ary[i];
      }
    }
  },  
    
  /** Searches Text for Match and Returns Location
   * @param  {String} text - Text to Search
   * @param  {String} search - Number, Search String, Search Array ['search',nth Time Found]
   * @param  {Number} defLoc - Default Location
   * @returns {Number[]} [Start of String Match Location, Length of Search String]
   */
  getTextLoc: function (text, search) {
    
    var retrn, len;
    
    if (typeof search === "number") {
      retrn = search;
      len = 0;
    } else {
      if (!Array.isArray(search)) search = [search, 1];

        var start = 0 - len, cnt = 0;
        len = search[0].length;
        do {
          start = text.indexOf(search[0], start + len);
          cnt+=1;
        } while (start !== -1 && cnt < search[1]);
        if (start === -1) {
          throw this.ary[this.lastRef].key + ": Search String '" + search[0] + "' Not Found " + search[1] + " Time";
        } else {
          retrn = start;
        }
    } 

    if (retrn >= text.length) {
      throw this.ary[this.lastRef].key + ": Search '" + search + "' > Text Length '" + text.length + "'";
    } else if (retrn < 0) {
      throw this.ary[this.lastRef].key + ": Search '" + search + "' Not Found or < 0";
    }
    return [retrn, len];
  },



  /** Crop Text Based on Conditions
   * @param  {String} text - String to Crop
   * @param  {String|Number[]} conditions [Start ""|#, End ""|#, "+"|"-" Crop/Include
   * @returns {String} Cropped String
   */
  cropText: function (text, conditions) {

    var start, end;

    if (!conditions) return text;

    for (let i = 0; i < conditions.length; i+=1) {
      start = this.getTextLoc(text, conditions[i][0], 0);
      end = this.getTextLoc(text, conditions[i][1], text.length - 1);

      if (conditions[i][2] === "+") {
        text = text.slice(start[0] + start[1], end[0]);
      } else {
        text = text.slice(0,start[0]) + text.slice(end[0] + end[1]);
      }

    }
    return text;
  },

    /** Adds Files to HTML Script
   * @param  {String} info - Script Text
   * @param  {Object} obj - Setup Object
   * @param  {String} file - File Name/Path
   * @returns {undefined} Undefined
   */
  insertJSCode: function (info, obj, file) {

    var that = this || $setup;
    var id = that.getjsLoadedId(that.jsLoaded, file, 0);

    if (file === obj.filePath) {
      var propText = "jsCode";
    } else {
      propText = "jsTest";
    }

    that.crtApnd("script", document.head, info);
    obj[propText] = info;
    that.jsLoaded[id][1] = 1;
      
    // Run Function Setup and Mocha Tests if Everything Loaded
    if (that.jsUpdate === 0 && that.jsLoaded.reduce((a, n) => (n[1] === 0) ? a + 1 : a, 0) === 0) {
      // Call Update
      that.setupHTMl();
      that.runMocha();
      that.jsUpdate = 1;
    }
    // console.log(that.jsLoaded)
  },

  /** Requests All JS Files (If Not Already Requested) for List Items
  *   Checks for Setup Object with Missing Label
  * @returns  {undefined} undefined
  */
  requestFiles: function () {

    var i, list = document.getElementsByTagName("li");
    var ary = this.ary;

    for (i = 0; i < list.length; i +=1 ) {

      var fileTag = list[i].id;

      // Get Ary Id for File Tag
      var objId = ary.reduce((a, n, i) => n.key === fileTag ? i : a, -1);
      if (objId === -1) {
        throw "List Id " + fileTag + " not Found in Setup Array";
      } else {
        var obj = ary[objId];
      }

      // Request js File
      if (!obj.filePath) {
          obj.jsCode = "skip";
      } else {
          var otherId = this.getjsLoadedId(this.jsLoaded, obj.filePath === -1, 0);
          if (otherId === -1) {
            this.httpRequest(obj, obj.filePath, this.insertJSCode);
            this.jsLoaded.push([obj.filePath, 0, "jsCode", objId]);
            obj.jsCode = null;
          } else {
            obj.jsCode = this.jsLoaded[otherId][3];
          }
      }

      // Request test File
      if (!obj.testFilePath) {
          obj.jsTest = "skip";
      } else {
            var otherTId = this.getjsLoadedId(this.jsLoaded, obj.testFilePath === -1, 0);
          if (otherTId === -1) {
            this.httpRequest(obj, obj.testFilePath, this.insertJSCode);
            this.jsLoaded.push([obj.testFilePath, 0, "jsTest", objId]);
            obj.jsTest = null;
          } else {
            obj.jsTest = this.jsLoaded[otherTId][3];
          } 
      }
    }

    // Check for Missing Labels
    var miss = ary.reduce((a, n, i) => n.jsCode === undefined || n.jsTest === undefined ? i : a, -1);
    if (miss !== -1) throw "Object Id " + miss + " without Label";

    // Check for Duplicates
    if (list.length !== ary.length) throw "Check Setup Object for Duplicates";

  }, 

  /** Creates HTML Elements for List Items
   * @returns {undefined} undefined
   */
  setupHTMl: function() {

    var fileTag, elmnt, list = document.getElementsByTagName("li");
    var ary = this.ary;

    for (let i = 0; i < list.length; i += 1) {

      fileTag = list[i].id;
      var objId = ary.reduce((a, n, i) => n.key === fileTag ? i : a, -1);
      var obj = ary[objId];

      var section = document.createDocumentFragment();

      // Setup Hide/Show When List Item Clicked
      elmnt = this.crtApnd("span", section, list[i].firstChild.nodeValue);
      list[i].firstChild.nodeValue = "";
      elmnt.classList.add("func");
      elmnt.addEventListener("click", function (e) {
          var li = e.target.nextSibling.style.display === "" ? "none" : "";
          e.target.nextSibling.style.display = li; 
        });
      
 
      // Create Other Sections
      var div = this.crtApnd("div", section);
      div.style.display = "none";
      obj.jsPre = this.crtApnd("pre", div);
      obj.btnDiv = this.crtApnd("div", div);
      obj.btnDiv.classList.add("divHolder");
      obj.FuncOut = this.crtApnd("div", div);      
      obj.FuncOut.classList.add("divHolder");
      obj.FuncOut.classList.add("functionOutput");
      obj.testDiv = this.crtApnd("div", div, "Click to View Function Unit Tests");
      obj.testDiv.classList.add("divHolder");
      obj.testDiv.classList.add("func");

 

      // let testResult = this.crtApnd("div", div); 
      // testResult.id="mocha";
      // test.addEventListener("click", function() {
      //   window.asdf=1;
        
      //   mocha.run();
        
      //   //<div id="mocha"></div>
      //   // mocha.run();
      // });

      // Setup Button to Call Funtion
      if (obj.strFunctionRef) {

          var call = this.crtApnd("input", obj.btnDiv), that = this;
          call.setAttribute("type", "button");
          call.setAttribute("value", obj.callCaption);
          
          /** Button Click to Call Function
           * @param  {Object} objS - Setup Object
           * @returns {undefined} Undefined
           */
          var buttonCall = function(objS) {
            return function () {
              objS.FuncOut.innerText = that.callFunction(objS);
            };
          };

          call.addEventListener("click", buttonCall(obj) );
      
        // Attach Function Text
        var text = typeof obj.jsCode === "number" ? ary[obj.jsCode].jsCode : obj.jsCode;

        this.crtApnd(obj.jsPre, null, this.cropText(text, obj.fileCrop));

        // Render
        this.crtApnd(section, list[i]);

      }
    }

  },

  /** Calls Function and Returns Answer With Input
   * @param  {Object} obj - Setup Object
   * @returns {String} Function Input/Output String
   */
  callFunction: function(obj) {

    let retrArr = this.getUserInput(obj.promptQuestion, obj.defaultPromptInput, obj.promptReturn);
          
    if (retrArr === null) return "";

    // Call Function - If More Than One Argument Apply Array
    if (window[obj.strFunctionRef].length > 1) {
      var retrn = window[obj.strFunctionRef].apply(null,retrArr);
    } else {
      retrn = window[obj.strFunctionRef](retrArr);
    }

    // Output: Determine if Array...
    var input = Array.isArray(retrArr) ? retrArr.join(", ") : retrArr;
    var output = Array.isArray(retrn) ? retrn.join(", ") : retrn;

    if (obj.promptQuestion) {
      var strRetrn = "Function Input:  " + input + "\nFunction Output: " + output;
    } else {
      strRetrn = "'Function Output: " + output;
    }

    return strRetrn;

  },
      
  /** Create and Append Elements
   * @param  {String} create - Element to Create
   * @param  {Object} append - Object which Element Appended
   * @param  {String} textNode - Text to Add
   * @returns {Object} Created Element
   */
  crtApnd: function (create, append, textNode) {
    
    // Create Element if Needed
    if (typeof create === "string") {
      var el = document.createElement(create);
    } else {
      el = create;
    }
    
    // Add Text Node if Text Exists
    if (textNode) {
      var node = document.createTextNode(textNode);
      el.appendChild(node);
    }

    // Append if Exists
    if (append) append.appendChild(el);
    return el;
  },

  /** Get User Input
   * @param  {String} question - Prompt Question
   * @param  {String} strDefault - Default Value
   * @param  {String} retrnFormat - Return Format String
   * @param  {Function} mapFunction - Map Function to Apply to Each Item
   * @returns  {*|[]} String or Array
   */
  getUserInput: function (question, strDefault, retrnFormat, mapFunction) {
    //dataType 'Number' -> Converts to Number
    let quest = question.slice(), ary = Array.isArray(retrnFormat);

    do {

        var str = prompt(quest,strDefault), chkFormat;

        if (str === null) return null;

        if (ary) {
          chkFormat = retrnFormat;
        } else {
          chkFormat = [retrnFormat];
        }

        if (str.indexOf(",") === -1) {
            str = [str];
        } else {
            str = str.split(",");
        }

        for (let i = 0; i < str.length; i +=1) {
          let val, form = typeof chkFormat[i];

          switch (form) {
            case "number":
              val = Number(str[i]);
              if (val !== val) {
                alert(val +" is Not a Number, Please Check and Reenter");
                quest = str.join(", ");
                continue;
              } else {
                str[i] = val;
              }
              break;
            case "boolean":
              //Future
          }
        }

    // eslint-disable-next-line no-constant-condition
    } while (false);

    if (mapFunction) str = str.map(mapFunction);

    if (ary) { 
      return str;
    } else {
      return str[0];
    }
    
},

/** HTTP Request
 * @param  {Object} setupObj - Setup Object
 * @param  {String} fileName - File Name/Path
 * @param  {Function} callBack - Function to Call on Response
 * @returns {undefined} undefined
 */
httpRequest: function (setupObj, fileName, callBack) {

  let xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {
          callBack(this.responseText, setupObj, fileName);
        } else if (this.status == 404) {
          throw "Sorry " + fileName + "Not Found for " + setupObj.key;
        }    
      }
  };

  xhttp.open("GET", fileName, true);
  xhttp.send();
},

runMocha: function () {

  mocha.run();


},














};