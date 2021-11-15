class QuadraticTest extends BasicDrawer {
  getControls() {
    return [
      Controls.createRange({
        min: 2,
        max: 6,
        text: "Step",
        value: 3,
        onChange: (e) => {
          this._nextStep = Math.pow(2, parseInt(e.target.value, 10));
        },
      }),
    ];
  }

  init() {
    const size = System.getWindowSize();
    const nbPoints = Generator.getInt(8, 4);
    const maxDiffX = Generator.getInt(size.width / nbPoints);

    this._points = [];

    for (let i = 0; i < nbPoints; i++) {
      const nextX = ((i + 1) * size.width) / nbPoints;
      const nextControlX =
        Generator.getInt(maxDiffX) + nextX - size.width / nbPoints;

      this._points.push(
        QuadraticPoint(nextControlX, size.height / 2, nextX, size.height / 2)
      );
    }

    this._step = 8;
    this._nextStep = 8;
  }

  draw() {
    if (this._step !== this._nextStep) {
      this._step = this._nextStep;
    }

    const size = System.getWindowSize();
    const prevX = this._x;
    const prevY = this._y;

    Drawer.setStroke("rgba(255, 255, 255, 0.1");

    this._points.forEach((point) => {
      const r = Generator.getInt(4);

      switch (r) {
        case 3:
          point.cy += this._step;
          break;
        case 2:
          point.cy -= this._step;
          break;
        case 1:
          point.ey += this._step;
          break;
        case 0:
          point.ey -= this._step;
          break;
      }
    });

    Drawer.drawQuadraticCurve(0, size.height / 2, ...this._points);
  }
}

Drawers.push(BezierTest);
