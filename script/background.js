/* 
Background class for lunarlander game.
Distributed under the MIT license.
(c) 2020 Florian Beck.
*/

import Sprite from "./sprite.js";

export default class Background extends Sprite {
  constructor(x, y) {
    super(x, y);
    this.time = "";
    this.score = 0;
    this.level = 0;
    this.fuelLevel = 0;
    this.altitude = 0;
    this.xSpeed = 0;
    this.ySpeed = 0;
  }

  update(time, score, level, fuelLevel, altitude, xSpeed, ySpeed) {
    this.time = time;
    this.score = score;
    this.level = level;
    this.fuelLevel = fuelLevel;
    this.altitude = altitude;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
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
    ellipse(
      windowWidth / 2,
      windowHeight,
      windowWidth * 1.7,
      windowHeight * 0.2
    );

    // fuel level
    this.drawFuelBar(13, 52, this.fuelLevel);

    // text right
    textAlign(RIGHT, TOP);
    textSize(12);
    text(
      "ALTITUDE   " +
        round(windowHeight - 140 - this.altitude - 17) * 10 +
        "\n HORIZONTAL SPEED   " +
        round(this.xSpeed * 10) +
        "\n VERTICAL SPEED   " +
        round(this.ySpeed * 10),
      windowWidth - 10,
      20
    );

    // text left
    textAlign(LEFT, TOP);
    text(
      "TIME " +
        this.time +
        "\nFUEL " +
        this.fuelLevel +
        "\n\nSCORE " +
        this.score +
        "\nLEVEL " +
        this.level,
      12,
      20
    );

    // copyright information
    fill("#000000");
    textFont("Arial");
    text("\u00A9 2019 Florian Beck", 12, height - 20);
    textFont("Courier");
    fill("#ffffff");
  }

  drawFuelBar(x, y) {
    let fuelLevel;
    noStroke();
    fill("#ffffff");
    rectMode(CORNER);
    if (this.level < 5) {
      fuelLevel = this.fuelLevel / 1.5;
    } else if (this.level < 25) {
      fuelLevel = this.fuelLevel / 2.5;
    } else {
      fuelLevel = this.fuelLevel / 5;
    }
    rect(x, y, fuelLevel * 0.85, 5);
  }
}
