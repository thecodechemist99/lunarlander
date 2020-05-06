/*
Class for turn based game structure.
Distributed under the MIT License.
(c) 2020 Florian Beck
*/

export default class Game {
  constructor(timer) {
    this.timer = timer;
  }

  reset() {
    this.timer = 0;
  }
}
