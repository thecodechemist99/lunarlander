/*
Highscore window class.
Distributed under the MIT License.
(c) 2020 Florian Beck
*/

import Window from "./window.js";

export default class HighscoreWindow extends Window {
  constructor(x, y, width, height) {
    super(x, y, width, height);
  }

  drawContent() {}
}

function showHighscore() {
  // draw highscore window
  stroke(white);
  strokeWeight(2);
  fill(black);
  rectMode(CENTER);
  rect(width / 2, height / 2, 400, 380);

  fill(white);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(20);
  text("TOP 5 PLAYER:", width / 2, height / 2 - 160);

  textSize(15);
  text("NAME", width / 2 - 90, height / 2 - 120);
  text("SCORE", width / 2 + 70, height / 2 - 120);
  text("LEVEL", width / 2 + 150, height / 2 - 120);

  // calculate ranks
  rank = getRank();

  textSize(20);
  let n = Math.min(5, highscorelist.length);
  for (let i = 0; i < n; i++) {
    let currName = highscorelist[i][0];
    let currScore = highscorelist[i][1];
    let currlevel = highscorelist[i][2];

    textAlign(LEFT, CENTER);
    text(i + 1 + ". " + currName, width / 2 - 180, height / 2 - 90 + i * 30);
    textAlign(CENTER, CENTER);
    text(currScore, width / 2 + 70, height / 2 - 90 + i * 30);
    text(currlevel, width / 2 + 150, height / 2 - 90 + i * 30);
  }

  text("YOUR RESULT:", width / 2, height / 2 + 80);

  textSize(15);
  text("NAME", width / 2 - 90, height / 2 + 120);
  text("SCORE", width / 2 + 70, height / 2 + 120);
  text("LEVEL", width / 2 + 150, height / 2 + 120);

  textSize(20);
  textAlign(LEFT, CENTER);
  text(rank + 1 + ". " + name.join(""), width / 2 - 180, height / 2 + 150);
  textAlign(CENTER, CENTER);
  text(score, width / 2 + 70, height / 2 + 150);
  text(level, width / 2 + 150, height / 2 + 150);
}

function getRank() {
  for (let i = 0; i < highscorelist.length; i++) {
    if (name.join("") === highscorelist[i][0]) {
      return i;
    }
  }
  return highscorelist.length;
}
