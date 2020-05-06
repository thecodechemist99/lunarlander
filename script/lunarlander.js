/* jslint esversion: 6 */

/*
Lunar Lander Game with arrow/wasd key control and highscore (based on PHP and MySQL database).
Web implementation of javascript file with friendly help from Jan and Amos from higher semesters.
(c) 2019 Florian Beck
 */

new p5();

// preload
let thrustSound;
let explosionSound;
let beepSound;
let bizzlSound;
//  let backgroundMusic;
function preload() {
  thrustSound = loadSound("thrust.mp3");
  explosionSound = loadSound("explosion.mp3");
  beepSound = loadSound("beep.mp3");
  bizzlSound = loadSound("bizzl.mp3");
  //  backgroundMusic = loadSound("background_music.mp3");
}

// setup
let fps = 30;
width = windowWidth;
height = windowHeight;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(fps);
  calcStars();
  textFont("Courier");
  explosionSound.setVolume(0.3);
  beepSound.setVolume(0.2);
  bizzlSound.setVolume(0.2);
  //  backgroundMusic.setVolume(0.5);
  //  backgroundMusic.loop();
}

function resizeHandler() {
  resizeCanvas(windowWidth, windowHeight);
  clear();
  calcStars();
  ground = height * 0.9;
}

window.addEventListener("resize", resizeHandler);

// define colors
let white = color(255);
let whiteOpaque = color("rgba(255, 255, 255, 0.6)");
let lightGrey = color(230);
let black = color(0);

// define states
let run = false;
let finished = false;
let won = true;
let highscore = false;
let nameInput = false;
let scoreSorted = false;
let lost = false;

// define other variables
let rocket = {
  x: 0,
  y: 0,
  xSpeed: 0,
  ySpeed: 0,
  tilt: 0,
  fuel: 150,
  fuelEx: 0,
};
let timer = { m: 0, s: 0, ms: 0 };

let stars = [];
let planets = [];
let name = [];
let houseDamaged = [false, false, false, false, false];

let level = 0;
let count = -1;
let score = 0;
let rank = -1;
let finishText = "";
let nameText;
let ground = height * 0.9;
let highscorelist;
highscoreDataServerExchange(false);

function draw() {
  drawBackground();

  // draw houses and points
  drawHouse(width * 0.15, ground, 1.6, houseDamaged[0]);
  drawHouse(width * 0.3, ground, 1.2, houseDamaged[1]);
  drawHouse(width * 0.75, ground, 1.2, houseDamaged[3]);
  drawHouse(width * 0.85, ground, 1.2, houseDamaged[4]);
  drawMoonStation(width / 2, ground, houseDamaged[2]);
  writeScoreInfo(width * 0.07, ground - 20);
  writeScoreInfo(width * 0.25, ground - 20);
  writeScoreInfo(width * 0.66, ground - 20);
  writeScoreInfo(width * 0.82, ground - 20);
  writeScoreInfo(width * 0.94, ground - 20);

  if (level === 0) {
    drawManual(width / 2, height / 2);
  }

  if (finished && !highscore) {
    finishText = "";
    rocket.fuelEx = 0;
    if (won) {
      drawRocket(rocket.x, rocket.y, rocket.tilt);
      finishText =
        "EXCELLENT LANDING!\nYOU SAVED THE MISSION AN THE ENTIRE SPACE PROGRAM";
      run = false;
    } else {
      if (count < 10) {
        drawExplosion(rocket.x, rocket.y, count);
        // if (count === 9) {
        //   bizzlSound.play();
        // }
        count++;
      } else {
        if (lost) {
          houseDamaged[2] = true;
          finishText =
            "YOU ANNIHILATED EVERY SINGLE HUMAN BEING\nON THE MOON\n\nCLICK TO RESTART";
        } else {
          finishText =
            "YOU CRASHED!\nTHE EXPLOSION DESTROYED 2 YEARS\nOF PREPARATION FOR THE MOON LANDING";
        }
        run = false;
      }
    }
  } else if (run) {
    drawRocket(rocket.x, rocket.y, rocket.tilt);

    // move rocket
    rocket.x += rocket.xSpeed;
    if (rocket.xSpeed > 0) {
      rocket.xSpeed -= 0.05;
    } else if (rocket.xSpeed < 0) {
      rocket.xSpeed += 0.05;
    }

    rocket.y += rocket.ySpeed;
    rocket.ySpeed += 0.1;

    if (rocket.fuel) {
      if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
        rocket.ySpeed -= 0.2;
        rocket.fuel--;
        rocket.fuelEx += 2;
        if (!thrustSound.isLooping()) {
          thrustSound.loop();
        } else {
          thrustSound.fade(1.5, 0.5);
        }
      } else if (rocket.fuelEx > 0) {
        rocket.fuelEx -= 3;
      }

      if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
        rocket.tilt -= 2;
        rocket.fuel--;
      } else if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        rocket.tilt += 2;
        rocket.fuel--;
      }
    } else {
      thrustSound.fade(0, 0.4);
    }

    rocket.xSpeed += rocket.tilt * 0.005;

    // check on ground contact
    if (rocket.y + 17 >= ground) {
      if (rocket.ySpeed > 2 || rocket.tilt > 10 || rocket.tilt < -10) {
        won = false;
        explosionSound.play();
        if (rocket.ySpeed >= 4) {
          score -= 200;
        } else {
          score -= 100;
        }
      } else {
        won = true;
        //        bizzlSound.play();
        if (rocket.x > width * 0.3 + 60 && rocket.x < width / 2) {
          score += 200 + rocket.fuel;
        } else {
          score += 100 + rocket.fuel;
        }
      }
      rocket.ySpeed = 0;
      finished = true;
    }

    // check on house collision
    if (
      rocket.y > ground - 40 &&
      rocket.x > width * 0.15 &&
      rocket.x < width * 0.15 + 80
    ) {
      houseCollision();
      houseDamaged[0] = true;
    }

    if (
      rocket.y > ground - 40 &&
      rocket.x > width * 0.3 &&
      rocket.x < width * 0.3 + 60
    ) {
      houseCollision();
      houseDamaged[1] = true;
    }

    if (
      rocket.y > ground - 40 &&
      rocket.x > width * 0.75 &&
      rocket.x < width * 0.75 + 60
    ) {
      houseCollision();
      houseDamaged[3] = true;
    }

    if (
      rocket.y > ground - 40 &&
      rocket.x > width * 0.85 &&
      rocket.x < width * 0.85 + 60
    ) {
      houseCollision();
      houseDamaged[4] = true;
    }

    // check on moon station collision
    if (
      (rocket.y > ground - 40 &&
        rocket.x > width / 2 - 5 &&
        rocket.x < width / 2 + 105) ||
      (rocket.y > ground - 90 &&
        rocket.x > width / 2 + 40 &&
        rocket.x < width / 2 + 105)
    ) {
      explosionSound.play();
      won = false;
      score = 0;
      level = 1;
      rocket.ySpeed = 0;
      finished = true;
      lost = true;
    }

    // check on planet collision
    for (let i = 0; i < planets.length; i++) {
      let xPos = planets[i][0];
      let yPos = planets[i][1];
      let size = planets[i][2] * 50;

      if (
        rocket.x > xPos - size &&
        rocket.x < xPos + size &&
        rocket.y > yPos - size &&
        rocket.y < yPos + size
      ) {
        explosionSound.play();
        won = false;
        score -= 200;
        rocket.ySpeed = 0;
        finished = true;
      }
    }

    // check on screen borders
    if (rocket.x < -10 || rocket.x > width + 10) {
      if (!beepSound.isPlaying()) {
        beepSound.play();
      }
      finishText = "YOU LOST CONTROL OF THE SPACESHIP";
      run = false;
    }

    // fuel warning
    if (!rocket.fuel) {
      finishText = "NO FUEL LEFT";
      rocket.fuelEx = 0;
      if (!beepSound.isPlaying()) {
        beepSound.play();
      }
    }
  }

  // timer
  if (run === true) {
    timer.ms += 60 / fps;
    if (timer.ms >= 60) {
      timer.s++;
      timer.ms = 0;
    }
    if (timer.s >= 60) {
      timer.m++;
      timer.s = 0;
    }
  }
}

function mousePressed() {
  if (
    mouseX > width - 255 &&
    mouseX < width - 15 &&
    mouseY > height - 55 &&
    mouseY < height - 15 &&
    level > 0
  ) {
    if (highscore) {
      // back button
      highscore = false;
      finished = false;
      finishText = "PRESS ANY KEY TO CONTINUE";
    } else {
      // highscore button
      highscore = true;
      nameInput = true;
    }
  } else if (
    mouseX > width / 2 - 80 &&
    mouseX < width / 2 + 80 &&
    mouseY > height / 2 + 27 &&
    mouseY < height + 73 &&
    nameInput
  ) {
    // save button
    highscoreDataServerExchange(true);
  } else if (!run && !highscore) {
    resetGame();
  }
}

function keyPressed() {
  if (!run && !highscore) {
    resetGame();
  }

  if (nameInput) {
    if (keyCode === BACKSPACE) {
      name.pop();
    } else if (keyCode != SHIFT && keyCode != ENTER && name.length <= 15) {
      name.push(key);
    }
  }
  return false;
}

function keyReleased() {
  if (thrustSound.isLooping) {
    thrustSound.fade(0, 1.2);
  }
}

function calcStars() {
  let maxValue;
  if (width <= 800) {
    maxValue = 30;
  } else if (width <= 1920) {
    maxValue = 60;
  } else {
    maxValue = 90;
  }
  for (let i = 0; i < maxValue; i++) {
    stars[i] = [random(0, width), random(0, ground)];
  }
}

function calcPlanets() {
  let maxValue;
  if (width <= 800) {
    maxValue = 4;
  } else if (width <= 1920) {
    maxValue = 8;
  } else {
    maxValue = 16;
  }
  for (let i = 0; i < maxValue + level; i++) {
    planets[i] = [
      random(0, width),
      random(150, ground - 140),
      random(0.5, 1.2),
    ];
  }
}

function drawBackground() {
  background(black);
  // noFill();
  // stroke(white);
  // strokeWeight(1);
  // line(0, ground, width, ground);

  // stars
  noStroke();
  fill(white);
  for (i = 0; i < stars.length; i++) {
    circle(stars[i][0], stars[i][1], 2);
  }

  // ground
  ellipse(width / 2, height, width * 1.7, height * 0.2);

  if (level > 0) {
    // planets
    for (i = 0; i < planets.length; i++) {
      drawPlanets(planets[i][0], planets[i][1], planets[i][2]);
    }
  }

  // fuel level
  fuelBar(13, 52, rocket.fuel);

  // highscore button
  if (!run && level > 0) {
    highscoreButton(width - 15, height - 15, highscore);
  }

  // text right
  textAlign(RIGHT, TOP);
  textSize(12);
  text(
    "ALTITUDE   " +
      round(ground - rocket.y - 17) * 10 +
      "\n HORIZONTAL SPEED   " +
      round(rocket.xSpeed * 10) +
      "\n VERTICAL SPEED   " +
      round(rocket.ySpeed * 10),
    width - 10,
    20
  );

  // text left
  textAlign(LEFT, TOP);
  text(
    "TIME " +
      getTimer() +
      "\nFUEL " +
      rocket.fuel +
      "\n\nSCORE " +
      score +
      "\nLEVEL " +
      level,
    12,
    20
  );

  // copyright information
  fill(black);
  textFont("Arial");
  text("\u00A9 2019 Florian Beck", 12, height - 20);
  textFont("Courier");
  fill(white);

  // text center
  if (highscore) {
    if (nameInput) {
      // show name input field
      getName();
    } else {
      // show highscore list
      showHighscore();
    }
  } else {
    if (finishText !== "") {
      stroke(white);
      strokeWeight(2);
      fill(black);
      rectMode(CENTER);
      rect(width / 2, height / 2, 650, 150);
      fill(white);
      noStroke();
    }
    textAlign(CENTER, CENTER);
    textSize(20);
    text(finishText, width / 2, height / 2);
  }
}

function drawPlanets(x, y, s) {
  // lower half
  noStroke();
  fill(white);
  arc(x, y, 60 * s, 60 * s, radians(-25), radians(200));

  // rings
  push();
  translate(x, y);
  rotate(radians(-20));
  noFill();
  stroke(lightGrey);
  strokeWeight(7 * s);
  ellipse(0, 0, 80 * s, 30 * s);
  pop();

  // upper half
  noStroke();
  fill(white);
  arc(x, y, 60 * s, 60 * s, radians(-205), radians(-15));
}

function drawRocket(x, y, tilt) {
  // rocket
  noStroke();
  fill(white);
  rectMode(CENTER);
  push();
  translate(x, y);
  rotate(radians(tilt));
  ellipse(0, 0, 18, 34);
  rect(0, 0 - 20, 2, 15);
  quad(-9, 2, 9, 2, 15, 11, -15, 11);
  fill(black);
  ellipse(0, -5, 8, 12);

  // fuel exhaustion
  fill(whiteOpaque);
  if (rocket.fuelEx > 0) {
    triangle(-5, 20, 5, 20, 0, 20 + rocket.fuelEx);
    triangle(-5, 20, 5, 20, 0, 20 + rocket.fuelEx * 0.6);
    triangle(-5, 20, 5, 20, 0, 20 + rocket.fuelEx * 0.2);
  }
  pop();
}

function drawExplosion(x, y, s) {
  noStroke();
  fill(white);
  rectMode(CENTER);
  push();
  translate(x, y);
  for (let i = 0; i < 360; i += 161) {
    rotate(radians(i));
    rect(0, 0, 60 * s, 50 * s);
  }
  pop();
}

function drawHouse(x, y, s, destroyed) {
  // set house on bottom left corner
  noStroke();
  fill(white);
  rectMode(CORNER);
  if (destroyed) {
    beginShape();
    vertex(x, y - 12 * s);
    vertex(x + 10 * s, y - 8 * s);
    vertex(x + 16 * s, y - 10 * s);
    vertex(x + 30 * s, y - 4 * s);
    vertex(x + 40 * s, y - 6 * s);
    vertex(x + 40 * s, y + 18 * s);
    vertex(x, y + 18 * s);
    endShape(CLOSE);
  } else {
    rect(x, y - 12 * s, 40 * s, 30 * s);
  }
  textSize(15);
  text("-200", x + 18 * s, y - 25 * s);
  textSize(20);
}

function drawMoonStation(x, y, destroyed) {
  // set house on bottom left corner
  noStroke();
  rectMode(CORNER);
  if (destroyed) {
    fill(black);
    beginShape();
    vertex(x - 20, y - 5);
    vertex(x + 150, y - 5);
    vertex(x + 130, y + 30);
    vertex(x + 100, y + 60);
    vertex(x + 70, height + 30);
    vertex(x + 40, y + 50);
    vertex(x + 10, y + 30);
    endShape(CLOSE);
    fill(white);
  } else {
    fill(white);
    rect(x, y - 18, 100, 20);
    rect(x + 45, y - 32, 50, 15);
    push();
    translate(x + 64, y - 60);
    rotate(2.2);
    arc(0, 0, 25, 13, -PI, 0);
    rectMode(CENTER);
    rect(0, 4, 2, 10);
    pop();
    stroke(white);
    strokeWeight(3);
    noFill();
    triangle(x + 60, y - 30, x + 70, y - 55, x + 80, y - 30);
    noStroke();
    fill(white);
    textSize(15);
    text("+200", width * 0.42, y - 20);
    text("-OO", x + 40, y - 85);
    textSize(20);
  }
}

function writeScoreInfo(x, y) {
  textSize(15);
  textAlign(CENTER, CENTER);
  text("+100", x, y);
  textSize(20);
}

function drawManual(x, y) {
  if (count === -1) {
    bizzlSound.play();
  }

  // text
  textAlign(CENTER, CENTER);
  textSize(20);
  text(
    "WELCOME TO THE LUNAR LANDER\n\nTRY TO LAND ON THE MOON WITHOUT CRASHING THE ROCKET.\nCONTROL THE ROCKET WITH THE ARROW OR WASD KEYS:\n\nTHRUST",
    x,
    y - 217
  );
  text("TILT LEFT", x - 175, y - 28);
  text("TILT RIGHT", x + 175, y - 28);
  text(
    "AVOID TO HIT ANY PLANETS OR BUILDINGS OR YOUR ROCKET WILL EXPLODE.\n\nAND DON'T FORGET TO CHECK THE FUEL LEVEL!",
    x,
    y + 70
  );

  // keys
  stroke(white);
  strokeWeight(2);
  noFill();
  rectMode(CENTER);
  // button left
  rect(x - 70, y - 30, 60, 60, 5);
  // button right
  rect(x + 70, y - 30, 60, 60, 5);
  // buton up
  rect(x, y - 100, 60, 60, 5);
  // button down
  rect(x, y - 30, 60, 60, 5);

  if (count < 50) {
    // left arrow
    line(x - 60, y - 30, x - 80, y - 30);
    line(x - 80, y - 30, x - 75, y - 35);
    line(x - 80, y - 30, x - 75, y - 25);

    // right arrows
    line(x + 60, y - 30, x + 80, y - 30);
    line(x + 80, y - 30, x + 75, y - 25);
    line(x + 80, y - 30, x + 75, y - 35);

    // up arrow
    line(x, y - 90, x, y - 110);
    line(x - 5, y - 105, x, y - 110);
    line(x + 5, y - 105, x, y - 110);

    // down arrow
    line(x, y - 20, x, y - 40);
    line(x - 5, y - 25, x, y - 20);
    line(x + 5, y - 25, x, y - 20);
  } else if (count < 100) {
    noStroke();
    fill(white);
    textFont("Arial");
    text("W", x, y - 98);
    text("A", x - 70, y - 28);
    text("S", x, y - 28);
    text("D", x + 70, y - 28);

    textFont("Courier");
  } else {
    count = 0;
  }
  fill(white);
  count++;
}

function fuelBar(x, y, fuel) {
  let fuelLevel;
  noStroke();
  fill(white);
  rectMode(CORNER);
  if (level < 5) {
    fuelLevel = fuel / 1.5;
  } else if (level < 25) {
    fuelLevel = fuel / 2.5;
  } else {
    fuelLevel = fuel / 5;
  }
  rect(x, y, fuelLevel * 0.85, 5);
}

function getTimer() {
  let sec;
  let millis;
  if (timer.ms < 10) {
    millis = "0" + round(timer.ms);
  } else {
    millis = timer.ms;
  }
  if (timer.s < 10) {
    sec = "0" + timer.s;
  } else {
    sec = timer.s;
  }
  return timer.m + ":" + sec + ":" + millis;
}

function houseCollision() {
  explosionSound.play();
  won = false;
  score -= 200;
  rocket.ySpeed = 0;
  finished = true;
}

function resetGame() {
  //  bizzlSound.play();

  run = true;
  finished = false;
  highscore = false;
  nameInput = false;
  scoreSorted = false;
  count = 0;
  finishText = "";
  calcPlanets();

  // reset rocket
  rocket.x = width / 2;
  rocket.y = 50;
  rocket.xSpeed = 0;
  rocket.ySpeed = 2;
  rocket.tilt = 0;
  rocket.fuelEx = 0;

  if (level < 5) {
    rocket.fuel = 150;
  } else if (level < 25) {
    rocket.fuel = 250;
  } else {
    rocket.fuel = 500;
  }

  // reset buildings
  if (lost === true) {
    lost = false;
    for (let index in houseDamaged) {
      houseDamaged[index] = false;
    }
  }

  // reset timer
  timer.ms = 0;
  timer.s = 0;
  timer.m = 0;

  // level counter
  if (won) {
    level++;
    won = false;
  }
}

/* === Highscore page === */

function highscoreButton(x, y, highscore) {
  noFill();
  stroke(black);
  strokeWeight(2);

  rectMode(CORNER);
  rect(x - 240, y - 40, 240, 40, 5);

  noStroke();
  fill(black);
  textAlign(LEFT, CENTER);
  textSize(20);

  if (highscore) {
    text("BACK TO THE GAME", x - 217, y - 19);
  } else {
    text("SAVE TO HIGHSCORE", x - 223, y - 19);
  }

  fill(white);
}

function getName() {
  // show name input and save button
  stroke(white);
  strokeWeight(2);
  fill(black);
  rectMode(CENTER);
  rect(width / 2, height / 2, 400, 200);

  fill(white);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(20);
  text("PLEASE TYPE YOUR NAME:", width / 2, height / 2 - 60);

  if (name.length === 0) {
    if (count <= 10) {
      textSize(30);
      nameText = "|";
    } else if (count < 20) {
      nameText = "";
    } else {
      count = 0;
    }
    count++;
  } else {
    nameText = name.join("");
  }
  text(nameText, width / 2, height / 2 - 10);

  textSize(20);
  text("SAVE", width / 2, height / 2 + 50);

  noFill();
  stroke(white);
  rect(width / 2, height / 2 + 50, 160, 45, 5);
  noStroke();
  fill(white);
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

function compareSecondColumn(a, b) {
  /* sort descending by second column of array (based upon:
"https://stackoverflow.com/questions/16096872/how-to-sort-2-dimensional-array-by-column-value") */
  return b[1] - a[1];
}

function highscoreDataServerExchange(sendScore) {
  /* Based upon: https://stackoverflow.com/questions/24468459/sending-a-json-to-server-and-retrieving-a-json-in-return-without-jquery */
  // Sending and receiving data in JSON format using POST method
  //
  let xhr = new XMLHttpRequest();
  let url = "lunarlander.php";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      highscorelist = JSON.parse(xhr.responseText);
      nameInput = false;
    }
  };
  if (sendScore) {
    let data = JSON.stringify({
      sendName: name.join(""),
      sendScore: score,
      sendLevel: level,
    });
    xhr.send(data);
  } else {
    xhr.send();
  }
}
