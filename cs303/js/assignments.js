/* eslint-disable id-length */
"use strict";


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



// Alert Error
if(typeof window === "object") window.onerror = function(msg, page, line){
  //alert(msg +"\nLine " + line + "\n" + page );
};

var $setup = {

  ary: [],

  jsLoaded: {
    complete: false,

    /**Checks if All Files Have Been Loaded
     * @returns  {Boolean} true / false
     */
    allFilesLoaded: function() {
      for (var x in this) {
        // if ("loaded" in x) if (x.loaded === false) return false;
        if (this[x].loaded === false) return false;
      }
      return true;
    }
  },
  
 
  // /** Returns if Search is in Array
  //  * @param  {*[]} arr - Array to Search
  //  * @param  {*} search - Search Value
  //  * @returns {Number} Array Element Id or -1 for No Match
  //  */
  // getArrayId: function (arr, search) {

  //   if (arr.length === 0) return -1;

  //   for (let i = 0; i < arr.length; i+=1) {
  //     if (arr[i] === search) return i;
  //   }
  //   return -1;
  // },







  /** Returns Object Matching Key in Setup Object Array
   * @param {String} key - Object Key
   * @param {*} value - Value to Compare
   * @returns {Object} Setup Object or null for No Match
   */
  getSetupRef: function (key, value) {
    var arr = this.ary;
    for (let i = 0; i < arr.length; i+=1) {
      if (Array.isArray(arr[i][key])) {
        var subAry = arr[i][key];
        for(var j = 0; j < subAry.length; j += 1) {
          if (subAry[j] === value) {
            arr.lastRef = arr[i];
            return arr[i];
          }
        }
      } else {
        if (arr[i][key] === value) {
          arr.lastRef = arr[i];
          return arr[i];
        }
      }
    }
    return null;
  },  
    
  /** Searches Text for Match and Returns Location
   * @param  {String} text - Text to Search
   * @param  {String} search - Number, Search String, Search Array ['search',nth Time Found]
   * @returns {Number[]} [Start of String Match Location, Length of Search String]
   */
  getTextLoc: function (text, search) {
    
    var retrn, len;
    
    if (typeof search === "number") {
      retrn = search;
      len = 0;
    } else {
      if (!Array.isArray(search)) search = [search, 1];
        len = search[0].length;
        var start = 0 - len, cnt = 0;
        
        do {
          start = text.indexOf(search[0], start + len);
          cnt+=1;
        } while (start !== -1 && cnt < search[1]);
        if (start === -1) {
          throw this.ary.lastRef.key + ": Search String '" + search[0] + "' Not Found " + search[1] + " Time";
        } else {  
          retrn = start;
        }
    } 

    if (retrn >= text.length) {
      throw this.ary.lastRef.key + ": Search '" + search + "' > Text Length '" + text.length + "'";
    } else if (retrn < 0) {
      throw this.ary.lastRef.key + ": Search '" + search + "' Not Found or < 0";
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
    if (!Array.isArray(conditions[0])) conditions = [conditions];

    for (let i = 0; i < conditions.length; i+=1) {
      
      start = this.getTextLoc(text, conditions[i][0], 0);
      end = this.getTextLoc(text, conditions[i][1]);

      if (conditions[i][2] === "+") {
        text = text.slice(start[0] + start[1], end[0]);
      } else {
        text = text.slice(0,start[0]) + text.slice(end[0] + end[1]);
      }

    }
    return text;
  },

    /** Adds Files to HTML Script & Updates HTML When All Files Loaded
   * @param  {String} info - Script Text
   * @param  {String} file - File Name/Path
   * @returns {undefined} Undefined
   */
  insertJSCode: function (info, file) {

    var that = this || $setup;

    that.crtApnd("script", document.head, info);
    that.jsLoaded[file].code = info;
    that.jsLoaded[file].loaded = true;

    // Run Function Setup and Mocha Tests if Everything Loaded
    if (that.jsLoaded.complete === false && that.jsLoaded.allFilesLoaded()) {
      that.setupHTMl();
      that.runMocha();
      that.jsLoaded.complete = true;
    }

  },

  /** Requests All JS Files (If Not Already Requested) for List Items
  *   Checks for Missing / Duplicate Setup Objects or Labels
  * @returns  {undefined} undefined
  */
  requestFiles: function () {

    var list = document.getElementsByTagName("li");
    var ary = this.ary;

    for (var i = 0; i < list.length; i +=1 ) {

      var fileTag = list[i].id;

      // Get Setup Object
      var obj = this.getSetupRef("key", fileTag);
      
      // Error for Invalid Key  
      if (obj === null) {
        throw "List Id '" + fileTag + "' not Found in Setup Array";
      }

      // Request Files
      obj.requestedFiles = true;
      var files = obj.files, allFiles = this.jsLoaded;
      for (var j = 0; j < files.length; j += 1) {
        var file = files[j].filePath;

        if (!allFiles[file]) {
          this.httpRequest(obj, file, this.insertJSCode);

          allFiles[file] = {
            loaded: false,
          };
        }
      }
      
    }

    // Check for Missing Labels
    var miss = ary.reduce((a, n, i) => !n.requestedFiles ? i : a, -1);
    if (miss !== -1) throw "Object Id " + miss + " without Label";

    // Check for Duplicates
    if (list.length !== ary.length) throw "Check Setup Object for Duplicates";

  }, 

  /** Creates HTML Elements for List Items
   * @returns {undefined} undefined
   */
  setupHTMl: function() {

    // Create Array from Current LI's HTML Collection (Collection will Change)
    var list = Array.prototype.slice.call(document.getElementsByTagName("li"));
    var that = this;

    for (var i = 0; i < list.length; i += 1) {

      var fileTag = list[i].id;
      var obj = this.getSetupRef("key", fileTag);
      var section = document.createDocumentFragment();

      /** Show / Hide Element
       * @param  {Object} elStyle - Element Style Reference
       * @returns {Function} Function to Show/Hide Element
       */
      var showHide = function (elStyle) {
        return function () {
          elStyle.display = elStyle.display === "" ? "none" : "";
        };
      };

      // Setup Hide/Show When List Item Clicked
      var elmnt = this.crtApnd("span", section, list[i].firstChild.nodeValue,
        [["addClass", "func"],
        ["addClass", "underline"]]);
      list[i].firstChild.nodeValue = "";

      // Div to Hold All Info
      var div = this.crtApnd("div", section, null, 
        ["display", "none"]);
        // ["addClass", "divInfo"]]); 
      elmnt.addEventListener("click", showHide(div.style));

      var ul = this.crtApnd("ul", div);
      
      // Add Description
      var descLi = this.crtApnd("li", ul, null, ["addClass", "description"]);
      this.insertCode(descLi, obj.files, "Description");

      // Create js Code List Item
      var li = this.crtApnd("li", ul);
      var liSpan = this.crtApnd("span", li, "View/Hide js Code", ["addClass", "func"]);
      var codeDiv = this.crtApnd("div", li, null, 
        [["addClass", "indentLeft"]]);
        // ["display", "none"]]);
      liSpan.addEventListener("click", showHide(codeDiv.style));

      this.insertCode(codeDiv, obj.files, "jsCode", true);

      // Insert Call Buttons
      // obj.btnDiv = this.crtApnd("div", codeDiv);
      // obj.FuncOut = this.crtApnd("div", codeDiv, null, 
      //   [["addClass", "divHolder"], 
      //   ["addClass", "functionOutput"]]);  
        
      // Insert Call Buttons
      var funct = obj.strFunctionRef;
      
      if (funct) {

        if (!Array.isArray(funct)) funct = [funct];

        // Get Prompt Setup
        var aryQuest = Array.isArray(obj.promptQuestion) ? obj.promptQuestion : [obj.promptQuestion];
        var aryDefault = Array.isArray(obj.defaultPromptInput) ? obj.defaultPromptInput : [obj.defaultPromptInput];
        var aryReturn = Array.isArray(obj.promptReturn) ? obj.promptReturn : [obj.promptReturn];
        var aryMapBef = Array.isArray(obj.mapBefore) ? obj.mapBefore : [obj.mapBefore];
        var aryMapAft = Array.isArray(obj.mapAfter) ? obj.mapAfter : [obj.mapAfter];
        var aryCaption = Array.isArray(obj.callCaption) ? obj.callCaption : [obj.callCaption];

        // if (Array.isArray(aryReturn)) {
        //   if (!Array.isArray(aryReturn[0])) aryReturn = [aryReturn];

        // } else {
        //   aryReturn = [aryReturn];
        // }
        
        Array.isArray(obj.promptReturn) ? obj.defaultPromptInput : [obj.defaultPromptInput];


        var call = this.crtApnd("div", li);
        

        // Run Function Setup Code
        if (obj.initialize) obj.initialize();

        for (var j = 0; j < funct.length; j += 1) {

          // Function Reference
          var functRef = obj.functionRef[j] || window[funct[j]];

          // Add Call Buttons
          var btnHolder = this.crtApnd("div", call);
          var btn = this.crtApnd("input", btnHolder, null, 
              [["attribute", "type", "button"], 
               ["attribute", "value", aryCaption[j] || "Click to Call Function " + funct[j]],
               ["addClass", "divMargin"]]);
          var functOut = this.crtApnd("div", btnHolder, null, 
              [["addClass", "functionOutput"],
              ["addClass", "divMargin"],
              ["addClass", "indentLeft"]]);

          // Setup onClick
          if (aryReturn[j] !== null) {
            if (aryQuest[j] === undefined) aryQuest[j] = "Please Enter Arguments. Separated by Comma if Needed";
            if (aryMapBef[j] === undefined) aryMapBef[j] = (n)=>n.trim();
          }
          btn.addEventListener("click", function (functRef,quest,questDef,questRtrn,mapBefore,mapAfter,functOutput, functOut) {
            return function () {
              functOut.innerText = that.callFunction(functRef,quest,questDef,questRtrn,mapBefore,mapAfter,functOutput);
            };           
          }(functRef,aryQuest[j],aryDefault[j],aryReturn[j],aryMapBef[j],aryMapAft[j],obj.outputfunc, functOut));
        }
      }        

      // Create Test Code List Item
      li = this.crtApnd("li");
      liSpan = this.crtApnd("span", li, "View/Hide Function Unit Test Code and Results", ["addClass", "func"]);
      codeDiv = this.crtApnd("div", li, null, 
        [["addClass", "indentLeft"],
        ["display", "none"]]);
      liSpan.addEventListener("click", showHide(codeDiv.style));
      var codeExists = this.insertCode(codeDiv, obj.files, "mochaTest", true);
      obj.testResults = this.crtApnd("div", codeDiv);
      if (codeExists === true) this.crtApnd(li, ul);


        // Render HTML
        this.crtApnd(section, list[i]);
    }

  },

  
  /** Appends Code in pre & code element into Element
   * @param  {Object} appendto - Element to Append to
   * @param  {String} files - Code & Info Array
   * @param  {String} type - Array Key
   * @param  {Boolean} addLinks - Add Links true/false
   * @returns {Boolean} Code Appended true / false
   */
  insertCode: function (appendto, files, type, addLinks) {

    var appended = false;
    if(!files) return appended;
    var frag = document.createDocumentFragment();

    for (var i = 0; i < files.length; i += 1) {
      if (files[i].fileType === type) {

        if (addLinks === true) {
          this.crtApnd("br", frag);
          this.crtApnd("a", frag, "View File", ["href", files[i].filePath]);
        }
        var spot = this.crtApnd("pre", frag);
        this.crtApnd("code", spot, this.cropText(this.jsLoaded[files[i].filePath].code, [files[i].fileCrop]));
        this.crtApnd(frag, appendto);
        appended = true;
      }
    }
    return appended;
  },

  /** Calls Function and Returns Answer With Input
   * @param  {Function} functRef - Function to Call
   * @param  {String} question - Prompt Question
   * @param  {String} qDefault - Prompt Default
   * @param  {String} qReturn - Prompt Return Type - Can be Array
   * @param  {Function} mapBefore - Map Function to Apply to Each Item Before Value Converted
   * @param  {Function} mapAfter - Map Function to Apply to Each Item after Value Converted
   * @returns {String} Function Input/Output String
   */
  callFunction: function(functRef, question, qDefault, qReturn, mapBefore, mapAfter, outputfunc) {

    if (question) {
      var retrArr = this.getUserInput(question, qDefault, qReturn, mapBefore, mapAfter);
      if (retrArr === null) return "";
    }

    // Get Input
    var input = Array.isArray(retrArr) ? JSON.stringify(retrArr) : retrArr;
    
    // Call Function - If More Than One Argument Apply Array
    if (functRef.length > 1) {
      var retrn = functRef.apply(null,retrArr);
    } else {
      retrn = functRef(retrArr);
    }

    // Output: Determine if Array...
    // var input = Array.isArray(retrArr) ? retrArr.join(", ") : retrArr;
    
    // var output = Array.isArray(retrn) ? retrn.join(", ") : retrn;
    // var output = Array.isArray(retrn) ? JSON.stringify(retrn) : retrn;
    var output = typeof retrn === "object" ? JSON.stringify(retrn) : retrn;

    if (question) {
      var strRetrn = "Function Input: " + input + "\nFunction Output: " + output;
    } else {
      strRetrn = "Function Output: " + output;
    }

    // Modify Output if Needed
    if (outputfunc) strRetrn = outputfunc(retrArr, retrn);

    return strRetrn;

  },
      
  /** Create and Append Elements
   * @param  {String|Object} element - Element to Create or Modify
   * @param  {Object} append - Object which Element Appended
   * @param  {String} textNode - Text to Add
   * @param  {String[]} properties - Properties to Add to Create
   * @returns {Object} Created Element
   */ 
  crtApnd: function (element, append, textNode, properties) {
    
    // Create Element if Needed
    if (typeof element === "string") {
      var el = document.createElement(element);
    } else {
      el = element;
    }
    
    // Add Text Node if Text Exists
    if (textNode) el.appendChild(document.createTextNode(textNode));

    // Add Properties
    if (properties) {
      if (Array.isArray(properties)) {
        if (!Array.isArray(properties[0])) properties = [properties];
        properties.forEach(function(n) {
          switch (n[0]) {
            case "display":
              el.style.display = n[1];
              break;
            case "addClass":
              el.classList.add(n[1]);
              break;
            case "attribute":
              el.setAttribute(n[1], n[2]);
              break;
            case "href":
              el.href = n[1];
              break;
          }
        });
      }
    }

    // Append if Exists
    if (append) append.appendChild(el);
    
    return el;
  },

  /** Get User Input
   * @param  {String} question - Prompt Question
   * @param  {String} strDefault - Default Value
   * @param  {String} retrnFormat - Return Format String
   * @param  {Function} functMapBeforeConvert - Map Function to Apply to Each Item Before Value Converted
   * @param  {Function} functMapAfterConvert - Map Function to Apply to Each Item after Value Converted
   * @returns  {*|[]} String or Array
   */
  getUserInput: function (question, strDefault, retrnFormat, functMapBeforeConvert, functMapAfterConvert) {
    //dataType 'number' -> Converts to Number

    var quest = question;
    var ary = Array.isArray(retrnFormat), stay = false;

    do {

        var str = prompt(quest,strDefault), chkFormat;

        // Exit on Cancel
        if (str === null) return null;

        // Convert Check & Input to Array if Needed
        chkFormat = ary === true ? retrnFormat : [retrnFormat];
        str = str.indexOf(",") === -1 ? [str] : str.split(",");

        if (functMapBeforeConvert) str = str.map(functMapBeforeConvert);
        
        // Check Input Format
        var last = chkFormat[0];
        for (let i = 0; i < str.length; i +=1) {
          let val, form = chkFormat[i] || last;

          switch (form) {
            case "number":
              val = Number(str[i]);
              if (val !== val) {
                quest = str[i] +" is Not a Number, Please Check and Reenter";
                strDefault = str.join(", ");
                stay = true;
                break;
              } else {
                str[i] = val;
              }
              break;
            case "boolean":
              val = str[i];
              str[i] = val === "1" || val.toLowerCase() === "true" ? true : false;
              break;
          }
          // Save Last Format
          if (form) last = form;
        }

    } while (stay);

    if (functMapAfterConvert) str = str.map(functMapAfterConvert);

    return ary === true ? str : str[0];
    
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
          callBack(this.responseText, fileName);
        } else if (this.status == 404) {
          throw "Sorry '" + fileName + "' Not Found for '" + setupObj.key + "'";
        }    
      }
  };

  xhttp.open("GET", fileName, true);
  xhttp.send();
},


/** Copy Test Results to Each Function Item
 * @returns {undefined} Undefined
 */
runMocha: function () {

  mocha.run();

  // Setup Mocha Format
  // Future -> Use a Event / Call Back

  /** Copy Test Results to Each Function Item
  * @returns {undefined} Undefined
  */
  var formatMocha = function () {

    document.getElementsByTagName("body")[0].removeEventListener("click", formatMocha, true);
    var li = document.getElementsByClassName("suite");
    var that = $setup;

    for (var i = 0; i < li.length; i += 1){
      
      var cln = li[i].cloneNode(true);

      // Remove Anchor Tags
      var a = cln.getElementsByTagName("a");
      for(var j = a.length - 1; j >=0 ; j -= 1) {
        var text = a[j].firstChild.nodeValue;
        a[j].parentNode.removeChild(a[j]);
      }
      
      // Attach Tests
      var section = document.createDocumentFragment();
      var tests = cln.childNodes[1];
      tests.classList.add("testlist");

      //insertBefore()
      that.crtApnd("h2", section, "Function " + text + " Test Results", ["addClass", "underline"]);
      
      var span = tests.getElementsByTagName("h2");
      for (var l = 0; l < span.length; l += 1) {
        span[l].classList.add("func");
      }

      tests.addEventListener("click", function(e) {

        var el = e.target.parentNode;

        if (el.nodeName === "LI") {
          var child = el.childNodes;
          for (var i = 0; i < child.length; i += 1) {
            if (child[i].nodeName === "PRE" && child[i].className === "") {
              child[i].style.display = child[i].style.display === "" ? child[i].style.display = "none" : child[i].style.display = "";
            }
          }
        }
        //   for (var i = 0; i < el.length; i += 1) {
        //     if (el[i] === "pre" && el.classlist === "") {


        //     }
        
      }

      );

      
      that.crtApnd(tests, section);

      var testEl = that.getSetupRef("key", text);
      if (testEl === null || !testEl.testResults) {
        document.getElementById("error").style.display="";
        throw "No Place to Put Mocha Test " + text;
      }
      testEl.testResults.appendChild(section);

    }

    
    
  };

  document.getElementsByTagName("body")[0].addEventListener("click", formatMocha, true);
},

/** Quick Setup
 * @param {String} strFunction - Function Name
 * @param {String} filePath - File Path
 * @param {String} strCrop - Crop Text
 * @param {String} promptDefault - Default Return
 * @returns {Object} Object Created
 */
setup: function(strFunction, filePath, strCrop, promptDefault) {
  
  var obj = {
    key: strFunction,
    strCrop: strCrop,
    files: [{
      filePath: filePath,
      fileCrop: [[strCrop, 1],[strCrop,2], "+"],
      fileType: "Description",
      },{ 
      filePath: filePath,
      fileCrop: [[strCrop , 2], [strCrop, 3], "+"],
      fileType: "jsCode",
    }],
    strFunctionRef: strFunction,
    functionRef:[], 
    // callCaption: "Click to Call Function " + strFunction,
    promptQuestion: promptDefault === null ? null : "Please Enter Arguments. Separated by Comma if Needed",
    promptReturn: null,
    defaultPromptInput: promptDefault,

    /** Quick Test Setup
     * @param {String} path - File Path
     * @param {String} crop - Crop Text
     * @returns {Object} this
     */
    addTest: function (path, crop) {
      if (!this.files) this.files = [];
      var textCrop = crop || this.strCrop;
      this.files.push({
        filePath: path,
        fileCrop: textCrop ? [[textCrop, 1], [textCrop, 2], "+"]  : null,
        fileType: "mochaTest",
      });
      delete this.addTest;
      return this;
    },

    /** Quick Property Setup
    * @param {String} property - Property
    * @param {*} value - Value
    * @returns {Object} this
    */
    mod: function (property, value) {
      this[property] = value;
      return this;
    }

  };



  $setup.ary.push(obj);
  return obj;

}




};