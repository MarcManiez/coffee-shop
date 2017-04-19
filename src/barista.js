module.exports = class Barista {
  constructor(id) {
    this.id = id;
    this.busyUntil = 0;
  }
  isAvailable(time) {
    return this.busyUntil <= time;
  }
};
