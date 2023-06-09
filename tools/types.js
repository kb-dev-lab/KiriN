function BezierPoint(c1x, c1y, c2x, c2y, ex, ey) {
	return {
		c1x,
		c1y,
		c2x,
		c2y,
		ex,
		ey,
	};
}

function QuadraticPoint(cx, cy, ex, ey) {
	return {
		cx,
		cy,
		ex,
		ey,
	};
}

class Point {
	/**
	 *
	 * @param {CartesianPoint} center
	 */
	constructor(center) {
		this.cartesian = new CartesianPoint(0, 0);
		this.polar = new PolarPoint(0, 0);
		this.center = center;
	}

	setCartesian(x, y) {
		this.cartesian.x = x;
		this.cartesian.y = y;

		this.polar = this.cartesian.toPolarPoint(this.center);

		return this;
	}

	setCenter(p) {
		this.center = p;

		return this;
	}

	setPolar(a, r) {
		this.polar.angle = a;
		this.polar.radius = r;

		this.cartesian = this.polar.toCartesianPoint(this.center);

		return this;
	}

	cartesianMove(dx, dy) {
		this.setCartesian(this.cartesian.x + dx, this.cartesian.y + dy);

		return this;
	}

	polarMove(da, dr) {
		this.setPolar(this.polar.angle + da, this.polar.radius + dr);

		return this;
	}
}

class CartesianPoint {
	constructor(x, y) {
		this.x = x;
		this.y = y;

		this.toPolarPoint = this.toPolarPoint.bind(this);
	}

	/**
	 * Compute the distance with another point
	 * @param {CartesianPoint} point
	 * @returns {number} computed distance
	 */
	distanceWith(point) {
		return Math.sqrt(
			(this.x - point.x) * (this.x - point.x) + (this.y - point.y) * (this.y - point.y),
		);
	}

	/**
	 * Transform the point to a polar point
	 * @param {CartesianPoint} center
	 * @returns {PolarPoint} computed polar point
	 */
	toPolarPoint(center) {
		const opposite = this.y - center.y;
		const adjacent = this.x - center.x;
		const dist = this.distanceWith(center);

		const s = Math.asin(opposite / dist);
		let c = Math.acos(adjacent / dist);

		if (s < 0) {
			c *= -1;
		}

		return new PolarPoint(c, dist);
	}
}

class PolarPoint {
	constructor(angle, radius) {
		this.angle = angle;
		this.radius = radius;
	}

	/**
	 * Transform the point to a cartesian point
	 * @param {CartesianPoint} center
	 * @returns {CartesianPoint} computed cartesian point
	 */
	toCartesianPoint(center) {
		return new CartesianPoint(
			Math.round(Math.cos(this.angle) * this.radius) + center.x,
			Math.round(Math.sin(this.angle) * this.radius) + center.y,
		);
	}
}
