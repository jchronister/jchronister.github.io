/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable id-length */
"use strict";

// eslint-disable-next-line no-unused-vars
var log = console.log;
// eslint-disable-next-line no-redeclare
if (typeof alert === "undefined") var alert = console.log;
// eslint-disable-next-line no-undef, no-redeclare
if (typeof prompt === "undefined") var prompt = require("prompt-sync")();

//CC
/* Rewrite Clock to Class
*
*/
//CC
function callClassClock () {

    class ClassClock {

      constructor (template) {
        this.template = template;
      }
      
      render() {
        let date = new Date();

        let hours = date.getHours();
        if (hours < 10) hours = "0" + hours;

        let mins = date.getMinutes();
        if (mins < 10) mins = "0" + mins;

        let secs = date.getSeconds();
        if (secs < 10) secs = "0" + secs;

        let output = this.template
          .replace("h", hours)
          .replace("m", mins)
          .replace("s", secs);

        console.log(output);
        this.count += 1;
        if(this.count > 9) this.stop();

      }

      stop () {
        clearInterval(this.timerId);
      }

      start () {
        this.render();
        this.timerId = setInterval(()=>this.render(), 1000);
        this.count = 1;
      }

    }

    let clock = new ClassClock({template: "h:m:s"}.template);
    log(clock);
    clock.start();

    return "See Console for Clock Output";

}
//CC
//CF
/* Rewrite Clock to Constructor Functions with Prototype Methods
*
*/
//CF
function callConstrictorClock() {

  function ConstrictorClock( template ) {
    this.template = template;
  }

  ConstrictorClock.prototype.render = function () {
      let date = new Date();

      let hours = date.getHours();
      if (hours < 10) hours = "0" + hours;

      let mins = date.getMinutes();
      if (mins < 10) mins = "0" + mins;

      let secs = date.getSeconds();
      if (secs < 10) secs = "0" + secs;

      let output = this.template
        .replace("h", hours)
        .replace("m", mins)
        .replace("s", secs);

      console.log(output);

      if(this.count > 9) this.stop();
      this.count += 1;
    };

    ConstrictorClock.prototype.stop = function() {
      clearInterval(this.timer);
    };

    ConstrictorClock.prototype.start = function() {
      this.render();
      this.timer = setInterval(this.render.bind(this), 1000);
      this.count = 1;
    };

    let clock = new ConstrictorClock({template: "h:m:s"}.template);
    log(clock);
    clock.start();

    return "See Console for Clock Output";

}
//CF
//ECI
/*  Error creating an instance
*
*   Here’s the code with Rabbit extending Animal.
*
*   Unfortunately, Rabbit objects can’t be created. What’s wrong? Fix it.
*/
//ECI
function fixRabbit(){
class Animal {

  constructor(name) {
    this.name = name;
  }

}

class Rabbit extends Animal {
  constructor(name) {
    super(); // <-- Added This Line
    this.name = name;
    this.created = Date.now();
  }
}

let rabbit = new Rabbit("White Rabbit"); // Error: this is not defined (Did not Call Super)
return (rabbit.name);

}
//ECI
//EXTC
/*  Extended clock
*
*   We’ve got a Clock class. As of now, it prints the time every second.
*   Create a new class ExtendedClock that inherits from Clock and adds the 
*   parameter precision – the number of ms between “ticks”. Should be 1000 
*   (1 second) by default.
*/
//EXTC
function callExtendClock () {

  class Clock {
    constructor({ template }) {
      this.template = template;
    }

    render() {
      let date = new Date();

      let hours = date.getHours();
      if (hours < 10) hours = "0" + hours;

      let mins = date.getMinutes();
      if (mins < 10) mins = "0" + mins;

      let secs = date.getSeconds();
      if (secs < 10) secs = "0" + secs;

      let output = this.template
        .replace("h", hours)
        .replace("m", mins)
        .replace("s", secs);

      console.log(output);
    }

    stop() {
      clearInterval(this.timer);
    }

    start() {
      this.render();
      this.timer = setInterval(() => this.render(), 1000);
    }
  }

  class ExtendClock extends Clock{

    constructor ({template, precision}) {
      super({template});
      this.precision = precision || 1000;
    }

    start() {
      this.render();
      this.timer = setInterval(() => this.render(), this.precision);
    }

  }


  let clock = new ExtendClock({template:"h:m:s",precision: 3000},1000);
  clock.start();

  return "See Console for Output";

}
//EXTC





