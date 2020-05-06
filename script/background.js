/* 
Background class for lunarlander game.
Distributed under the MIT license.
(c)2020 Florian Beck
*/

import Sprite from "./sprite.js";

export default class Background extends Sprite {
  constructor(x, y) {
    super(x, y);
  }

  draw() {
    background("#000000");

    // stars
    noStroke();
    fill("#ffffff");
    for (let index in window.stars) {
      circle(window.stars[index][0], window.stars[index][1], 2);
    }

    // ground
    ellipse(width / 2, height, width * 1.7, height * 0.2);

    // // fuel level
    // fuelBar(13, 52, rocket.fuel);

    // // text right
    // textAlign(RIGHT, TOP);
    // textSize(12);
    // text(
    //   "ALTITUDE   " +
    //     round(ground - rocket.y - 17) * 10 +
    //     "\n HORIZONTAL SPEED   " +
    //     round(rocket.xSpeed * 10) +
    //     "\n VERTICAL SPEED   " +
    //     round(rocket.ySpeed * 10),
    //   width - 10,
    //   20
    // );

    // // text left
    // textAlign(LEFT, TOP);
    // text(
    //   "TIME " +
    //     getTimer() +
    //     "\nFUEL " +
    //     rocket.fuel +
    //     "\n\nSCORE " +
    //     score +
    //     "\nLEVEL " +
    //     level,
    //   12,
    //   20
    // );

    // copyright information
    fill("#000000");
    textFont("Arial");
    text("\u00A9 2019 Florian Beck", 12, height - 20);
    textFont("Courier");
    fill("#ffffff");
  }
}
