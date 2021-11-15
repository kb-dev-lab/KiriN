class BezierTest extends BasicDrawer {
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
    const nbPoints = Generator.getInt(16, 8);
    const maxDiffX = Generator.getInt(size.width / nbPoints);

    this._points = [];

    for (let i = 0; i < nbPoints; i++) {
      const nextX = ((i + 1) * size.width) / nbPoints;
      const nextControlX = parseInt(
        Generator.getInt(maxDiffX) + nextX - size.width / nbPoints,
        10
      );
      const nextControlX2 = parseInt(
        Generator.getInt(maxDiffX) + nextX - size.width / nbPoints,
        10
      );

      this._points.push(
        BezierPoint(
          nextControlX,
          size.height / 2,
          nextControlX2,
          size.height / 2,
          nextX,
          size.height / 2
        )
      );
    }

    this._step = 4;
    this._nextStep = 4;
  }

  draw() {
    if (this._step !== this._nextStep) {
      this._step = this._nextStep;
    }

    const size = System.getWindowSize();
    const prevX = this._x;
    const prevY = this._y;

    Drawer.setStroke("#FFFFFF10");

    this._points.forEach((point, i) => {
      const r = Generator.getInt(12);

      switch (r) {
        case 11:
          point.c2x -= this._step;
          break;
        case 10:
          point.c1x -= this._step;
          break;
        case 9:
          point.c2x += this._step;
          break;
        case 8:
          point.c1x += this._step;
          break;
        case 7:
          point.ex += this._step;
          break;
        case 6:
          point.ex -= this._step;
          break;
        case 5:
          point.c1y += this._step;
          point.c2y += this._step;

          if (i > 0) {
            this._points[i - 1].ey += this._step;
          }

          break;
        case 4:
          point.c1y -= this._step;
          point.c2y -= this._step;

          if (i > 0) {
            this._points[i - 1].ey -= this._step;
          }

          break;
        case 3:
          point.c2y += this._step;
          point.ey += this._step;
          point.c1y += this._step;
          break;
        case 2:
          point.c2y -= this._step;
          point.ey -= this._step;
          point.c1y -= this._step;
          break;
        case 1:
          break;
        case 0:
          break;
      }
    });

    this._points.forEach((point, index) => {
      if (index === 0) {
        return;
      }

      const previousPoint = this._points[index - 1];

      point.c1y = previousPoint.ey / 2 + point.c2y / 2;
    });

    Drawer.drawCurve(0, size.height / 2, ...this._points);
  }
}

Drawers.push(BezierTest);
