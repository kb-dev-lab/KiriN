function addToTurningSandLine(p0, p1, sandCoef) {
	const basePoint = new PolarPoint(
		p0.polar.angle + p1.polar.angle / 2,
		p0.polar.radius + sandCoef,
	);

	let dx = p1.cartesian.x - p0.cartesian.x;
	if (dx < 0) {
		dx *= -1;
	}

	let dy = p1.cartesian.y - p0.cartesian.y;
	if (dy < 0) {
		dy *= -1;
	}

	let sx, sy;

	if (p0.cartesian.x < p1.cartesian.x) {
		sx = 1;
	} else {
		sx = -1;
	}

	if (p0.cartesian.y < p1.cartesian.y) {
		sy = 1;
	} else {
		sy = -1;
	}

	let err = dx - dy;

	while (p0.cartesian.x !== p1.cartesian.x || p0.cartesian.y !== p1.cartesian.y) {
		let nextXMove = 0;
		let nextYMove = 0;

		let e2 = 2 * err;

		if (e2 > -dy) {
			err -= dy;
			nextXMove = sx;
		}

		if (e2 < dx) {
			err += dx;
			nextYMove = sy;
		}

		p0.cartesianMove(nextXMove, nextYMove);

		Drawer.addDegressiveLine(p0.cartesian.x, p0.cartesian.y, p1.cartesian.x, p1.cartesian.y, 4);
	}
}

class TurningHazardousShape extends BasicDrawer {
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

	getNextColor(i) {
		const nbAvailableColors = this._colors.length;

		const nbColorsByIndex = this._nbCyclesToUseAllColors / nbAvailableColors;
		const currentIndex = Math.trunc((i * nbAvailableColors) / this._nbCyclesToUseAllColors);
		let nextIndex = Math.trunc(currentIndex + 1);

		if (currentIndex === nbAvailableColors - 1) {
			nextIndex = 0;
		}

		let value = ((i - nbColorsByIndex * currentIndex) * 100) / nbColorsByIndex;
		let computedColor = Tools.getColorMean(
			value,
			this._colors[currentIndex],
			this._colors[nextIndex],
		);

		computedColor.a = 0x2;

		return computedColor.toColor();
	}

	init() {
		this._colors = COLORS_PRESETS.synthwave;
		this._nbCyclesToUseAllColors = 500;
		const size = System.getWindowSize();
		const nbPoints = 1;

		this._radius = 40.0;
		this._center = new CartesianPoint(size.width / 2, size.height / 2);

		const nbPointsToGenerate = Generator.getInt(40, 70);
		this._points = [];

		for (let i = 0; i < nbPointsToGenerate; i++) {
			const randomness = (Generator.getInt(0, 100) - 50) / nbPointsToGenerate / 100;
			const point = (Math.PI * 2 * i) / nbPointsToGenerate + randomness;

			const x = Math.cos(point) * this._radius + size.width / 2;
			const y = Math.sin(point) * this._radius + size.height / 2;

			this._points.push(new Point(this._center).setCartesian(x, y));
		}

		this._step = 16;
		this._nextStep = 16;
		this._lineWidth = 1;
		this._nextLineWidth = 1;

		Drawer.background('black');
	}

	draw(i) {
		if (this._step !== this._nextStep) {
			this._step = this._nextStep;
		}

		if (this._lineWidth !== this._nextLineWidth) {
			this._lineWidth = this._nextLineWidth;
		}

		Drawer.setStroke(this.getNextColor(i).toString());

		for (let point of this._points) {
			point.polarMove(Generator.getInt(-50, 50) / 3000, Generator.getInt(1, 4));
		}

		for (let i = 0; i < this._points?.length; i++) {
			if (i + 1 === this._points?.length) {
				addToTurningSandLine(this._points[i], this._points[0], 12);
			} else {
				addToTurningSandLine(this._points[i], this._points[i + 1], 12);
			}
		}

		for (let point of this._points) {
			point.polarMove(0.4, 0);
		}
	}
}

Drawers.push(TurningHazardousShape);
