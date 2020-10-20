class SimpleDrawer extends BasicDrawer {
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
    this._x = 0;
    this._y = 0;
    this._step = 8;
    this._nextStep = 8;
  }

  draw() {
    if (this._step !== this._nextStep) {
      this._step = this._nextStep;
    }

    const r = Generator.getInt(4);
    const size = System.getWindowSize();
    const prevX = this._x;
    const prevY = this._y;

    Drawer.setStroke(Generator.getColor());

    switch (r) {
      case 3:
        this._y += this._step;
        break;
      case 2:
        this._x += this._step;
        break;
      case 1:
        this._y -= this._step;
        break;
      case 0:
        this._x -= this._step;
        break;
    }

    if (this._y > size.height) {
      this._y -= this._step;
    } else if (this._y < 0) {
      this._y += this._step;
    }

    if (this._x > size.width) {
      this._x -= this._step;
    } else if (this._x < 0) {
      this._x += this._step;
    }

    Drawer.addLine(prevX, prevY, this._x, this._y);
  }
}

Drawers.push(SimpleDrawer);
