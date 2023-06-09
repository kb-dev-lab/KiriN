class BasicDiagonalLine extends BasicDrawer {
	getControls() {
		return [
			Controls.createRange({
				min: 1,
				max: 4,
				text: 'Step',
				value: 1,
				onChange: (e) => {
					this._nextStep = Math.pow(4, parseInt(e.target.value, 10));
				},
			}),
			Controls.createRange({
				min: 1,
				max: 16,
				text: 'Line width',
				value: 1,
				onChange: (e) => {
					this._nextLineWidth = parseInt(e.target.value, 10);
				},
			}),
		];
	}

	init() {
		const size = System.getWindowSize();
		const nbPoints = 1;

		this._point = new CartesianPoint(0, 0);

		this._step = 16;
		this._nextStep = 16;
		this._lineWidth = 1;
		this._nextLineWidth = 1;
	}

	draw() {
		if (this._step !== this._nextStep) {
			this._step = this._nextStep;
		}

		if (this._lineWidth !== this._nextLineWidth) {
			this._lineWidth = this._nextLineWidth;
		}

		const size = System.getWindowSize();
		const prevX = this._point.x;
		const prevY = this._point.y;

		Drawer.setStroke(Generator.getColorWithOpacity(40));

		const r = Generator.getInt(8);

		switch (r) {
			case 7:
				this._point.x += this._step;
				break;
			case 6:
				this._point.x -= this._step;
				break;
			case 5:
				this._point.y += this._step;
				break;
			case 4:
				this._point.y -= this._step;
				break;
			case 3:
				this._point.x += this._step;
				this._point.y += this._step;
				break;
			case 2:
				this._point.x -= this._step;
				this._point.y -= this._step;
				break;
			case 1:
				this._point.x -= this._step;
				this._point.y += this._step;
				break;
			case 0:
				this._point.x += this._step;
				this._point.y -= this._step;
				break;
		}

		if (this._point.x < 0) {
			this._point.x = 0;
		} else if (this._point.x > size.width) {
			this._point.x = size.width - (size.width % this._step);
		}

		if (this._point.y < 0) {
			this._point.y = 0;
		} else if (this._point.y > size.height) {
			this._point.y = size.height - (size.height % this._step);
		}

		Drawer.addLine(prevX, prevY, this._point.x, this._point.y, this._lineWidth);
	}
}

Drawers.push(BasicDiagonalLine);
