function Camera(w, h) {
	this.w = w - 20;
	this.h = h - 20;
	this.x = 0;
	this.y = 0;
	this.ox = 0;
	this.oy = 0;
	this.sr = 0;
	this.sa = 0;
	this.sx = 0;
	this.sy = 0;
	this.v = [{}, {}, {}, {}];
}

Camera.prototype = {
	save: function() {
		this.ox = this.x;
		this.oy = this.y;
		this.x = 0;
		this.y = 0;
		this.sx = 0;
		this.sy = 0;
	},

	restore: function() {
		this.x = this.ox;
		this.y = this.oy;
	},

	center: function(x, y) {
		this.x = this.w / 2 - x;
		this.y = this.h / 2 - y;
		this.sx = 0;
		this.sy = 0;
		this.sr = 0;
	},

	shake: function() {
		this.sr = 3;
		this.sa = Math.random() * 360;
	},

	u: function(truck, mW, mH) {
		var dx, dy;

		if (truck.x < this.w / 2) {
			dx = truck.x / this.w;
		} else if (truck.x > mW - this.w / 2) {
			dx = 1 - (mW - truck.x) / this.w;
		} else {
			dx = 0.5;
		}

		if (truck.y < this.h / 2) {
			dy = truck.y / this.h;
		} else if (truck.y > mH - this.h / 2) {
			dy = 1 - (mH - truck.y) / this.h;
		} else {
			dy = 0.5;
		}

		this.x += ((this.w * dx + 10 - truck.x) - this.x) * step;
		this.y += ((this.h * dy + 10 - truck.y) - this.y) * step;

		this._sv();

		if (this.sr > 0) {
			this.sa += 45;
			this.sx = Math.sin(this.sa) * this.sr;
			this.sy = Math.cos(this.sa) * this.sr;
			this.sr -= 10 * step;
		}
	},

	_sv: function() {
		this.v[0].x = -this.x;
		this.v[0].y = -this.y;

		this.v[1].x = -this.x + this.w;
		this.v[1].y = -this.y;

		this.v[2].x = -this.x + this.w;
		this.v[2].y = -this.y + this.h;

		this.v[3].x = -this.x;
		this.v[3].y = -this.y + this.h;
	}
};
