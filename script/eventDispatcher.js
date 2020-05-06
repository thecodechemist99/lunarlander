/*
EventDispatcher class.
Distributed under the MIT License.
(c) 2020 Florian Beck.
*/

export default class EventDispatcher {
  constructor() {
    this.listeners = {};
  }

  addEventListener(type, eventHandler) {
    if (!(type in this.listeners)) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(eventHandler);
  }

  removeEventListener(type, eventHandler) {
    if (!(type in this.listeners)) {
      return;
    }

    for (let index in this.listeners[type]) {
      if (this.listeners[type][index] === eventHandler) {
        this.listeners[type].splice(index, 1);
        return;
      }
    }
  }

  dispatchEvent(event) {
    if (!(event.type in this.listeners)) {
      return true;
    }

    event.target = this;
    for (let index in this.listeners[event.type]) {
      this.listeners[event.type][index].call(this, event);
    }
    return !event.defaultPrevented;
  }
}
