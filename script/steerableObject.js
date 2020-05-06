/* 
Steerable object class.
Distributed under the MIT license.
(c) 2020 Florian Beck.
*/

import InteractiveObject from "./interactiveObject.js";

export default class SteerableObject extends InteractiveObject {
  constructor(x, y, keyInput) {
    super(x, y);
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.keyInput = keyInput;
  }

  getFocus() {
    this.keyInput.getFocus(this);
  }

  getKey() {}

  keyIsDown(keyCode) {}

  arrowKeys() {}

  move() {}
}
