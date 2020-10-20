const System = {
  /**
   * @type {BasicDrawer}
   */
  _currentDrawer: null,

  /**
   * @type {DOMRect}
   */
  _size: null,

  _speed: 1,

  _setupResizer: () => {
    window.addEventListener("resize", () => {
      size = document.body.getBoundingClientRect();
      const canvas = document.getElementById("mainFrame");

      canvas.height = size.height;
      canvas.width = size.width;

      Drawer.background("black");
    });
  },

  initApp: () => {
    document.body.style.height = "100vh";
    document.body.style.width = "100vw";
    document.body.style.overflow = "hidden";
    document.body.style.margin = "0";

    System._size = document.body.getBoundingClientRect();

    const canvas = FD.create("canvas", {
      id: "mainFrame",

      height: System._size.height,
      width: System._size.width,
    });

    document.body.appendChild(canvas);

    Drawer.setCanvas(canvas);
    Drawer.background("black");

    System._setupResizer();
  },

  getSpeedController: () =>
    Controls.createRange({
      min: 1,
      max: 6,
      text: "Speed",
      value: 1,
      onChange: (e) => {
        System._speed = parseInt(e.target.value, 10);
      },
    }),

  getWindowSize: () => System._size,

  /**
   * @param {BasicDrawer} drawer
   */
  loadDrawer: (drawer) => {
    System._currentDrawer = drawer;

    Loop.reset();
    System._currentDrawer.init();

    Controls.addDefaultControllers();
    Controls.add(
      System.getSpeedController(),
      ...System._currentDrawer.getControls()
    );

    Loop.addToEveryFrame(() => {
      for (let i = 0; i < System._speed; i++) {
        System._currentDrawer.draw();
      }
    });
  },
};
