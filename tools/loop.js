const Loop = {
  /**
   * @type {Array<Function>}
   */
  _everyFrameFunctions: [],
  _iterations: 0,
  _running: false,

  addToEveryFrame: (fn) => {
    Loop._everyFrameFunctions.push(fn);
  },

  _compute: () => {
    Loop._everyFrameFunctions.forEach((fn) => fn());
    Loop._iterations++;

    if (Loop._running) {
      window.requestAnimationFrame(Loop._compute);
    }
  },

  reset: () => {
    Loop._everyFrameFunctions = [];
    Loop._iterations = 0;
    Loop._running = false;
  },

  start: () => {
    Loop._running = true;

    Loop._compute();
  },

  stop: () => {
    Loop._running = false;
  },

  isRunning: () => Loop._running,
  getIterations: () => Loop._iterations,
};
