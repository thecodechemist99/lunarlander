/*
Sprites class.
Distributed under the MIT License.
(c)2020 Florian Beck, based upon Work by Garrit Schaap.
*/

import InteractiveObject from "./interactiveObject.js";

export default class Sprite extends InteractiveObject {
  constructor(x, y) {
    super(x, y, 100, 100);
    this.children = [];
  }

  display() {
    if (this.visible) {
      push();
      translate(this.x, this.y);
      rotate(this.rotation);
      scale(this.scale);

      this.draw();

      for (let index in this.children) {
        this.children[index].display();
      }

      pop();
    }
  }

  pressed() {
    this.children.forEach((sprite) => {
      sprite.mousePressed();
    });
  }

  clicked() {
    this.children.forEach((sprite) => {
      sprite.mouseClicked();
    });
  }

  released() {
    this.children.forEach((sprite) => {
      sprite.mouseReleased();
    });
  }

  addChild(sprite) {
    sprite.parent = this;
    this.children.push(sprite);
  }

  removeChild(sprite) {
    let index = this.children.indexOf(sprite);
    if (index != -1) {
      sprite.parent = undefined;
      this.children.splice(index, 1);
    }
  }
}
