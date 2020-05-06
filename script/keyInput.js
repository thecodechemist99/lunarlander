/*
Class to route key inputs.
Distributed under the MIT License.
(c) 2020 Florian Beck.
*/

export default class KeyInput {
  constructor() {
    this.focusElement = null;
  }

  getFocus(element) {
    this.focusElement = element;
  }

  keyTyped() {
    this.sendKey(key);
    return false;
  }

  keyPressed() {
    if (keyCode === BACKSPACE) {
      this.deleteKey();
    }

    if (
      keyCode === LEFT_ARROW ||
      keyCode === RIGHT_ARROW ||
      keyCode === UP_ARROW ||
      keyCode === DOWN_ARROW
    ) {
      this.arrowKeys(keyCode);
    }

    return false;
  }

  sendKey(key) {
    this.focusElement.getKey(key);
  }

  deleteKey() {
    this.focusElement.deleteKey();
  }

  arrowKeys(keyCode) {
    this.focusElement.arrowKeys(keyCode);
  }

  keyIsDown(keyCode) {
    if (keyIsDown(keyCode)) {
      this.focusElement.keyIsDown(keyCode);
    }
  }
}
