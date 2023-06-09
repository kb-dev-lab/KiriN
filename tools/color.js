class Color {
	constructor(r, g, b, a) {
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;
	}

	toString() {
		return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
	}
}

class Color64 extends Color {
	constructor(r, g, b, a) {
		super(r, g, b, a);
	}

	toColor() {
		return new Color(this.r >> 8, this.g >> 8, this.b >> 8, this.a >> 8);
	}
}

const COLORS_PRESETS = {
	synthwave: [
		new Color64(0x9200, 0x0000, 0x7500, 0xffff),
		new Color64(0xff00, 0x6c00, 0x1100, 0xffff),
		new Color64(0x0d00, 0x0200, 0x2100, 0xffff),
	],
	trisummer: [
		new Color64(0xf400, 0x4300, 0x3600, 0xffff),
		new Color64(0xff00, 0xc100, 0x0700, 0xffff),
		new Color64(0xef00, 0x6c00, 0x0000, 0xffff),
	],
};
