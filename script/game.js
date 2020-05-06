/*
Class for turn based game structure.
Distributed under the MIT License.
(c) 2020 Florian Beck
*/

export default class Game {
  constructor(timer) {
    this.timer = timer;
    this.level = 0;
    this.score = 0;
  }

  reset() {
    this.timer.reset();
    this.level = 0;
    this.score = 0;
  }
}
