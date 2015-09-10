function Body(x, y, w, h, r) {
	this.c = new Vector(x, y); // center
	this.w = w || 10; // width
	this.h = h || 10; // height
	this.r = r || 0; // rotation
	this._v = []; // vertices
	this._a = []; // axes
	this._vx = new Vector();
	this._vy = new Vector();
	this.rf();
	this.e = true;
}

Body.prototype = {
	collide: function(target) {
		if (!target.e) return;

		var i, j, a, t, d, aMin, aMax, bMin, bMax, dMin = Infinity,
			ta;

		for (i = 0; i < 4; i++) {
			a = i < 2 ? this._a[i] : target._a[i - 2];

			t = this._v[0].dot(a);
			aMin = aMax = t;

			for (j = 1; j < 4; j++) {
				t = this._v[j].dot(a);

				if (t < aMin) {
					aMin = t;
				} else if (t > aMax) {
					aMax = t;
				}
			}

			t = target._v[0].dot(a);
			bMin = bMax = t;

			for (j = 1; j < 4; j++) {
				t = target._v[j].dot(a);

				if (t < bMin) {
					bMin = t;
				} else if (t > bMax) {
					bMax = t;
				}
			}

			if (aMin < bMin) {
				d = bMin - aMax;
			} else {
				d = aMin - bMax;
			}

			if (d > 0) {
				return null;
			}

			d = Math.abs(d);

			if (d < dMin) {
				dMin = d;
				ta = a.c();

				if (this.c.c().s(target.c).dot(ta) < 0) {
					ta.m(-1);
				}
			}
		}

		return ta.m(dMin);
	},

	con: function(target) {
		for (var i = 0; i < target._v.length; i++) {
			var v = target._v[i];
			if (!isOnLeft(this._v[0], this._v[1], v)) return false;
			if (!isOnLeft(this._v[1], this._v[2], v)) return false;
			if (!isOnLeft(this._v[2], this._v[3], v)) return false;
			if (!isOnLeft(this._v[3], this._v[0], v)) return false;
		}

		return true;
	},

	rf: function() {
		this._vx.st(Math.cos(this.r), Math.sin(this.r)).m(this.w / 2);
		this._vy.st(-Math.sin(this.r), Math.cos(this.r)).m(this.h / 2);

		this._v[0] = this.c.c().s(this._vx).s(this._vy); // top left
		this._v[1] = this.c.c().a(this._vx).s(this._vy); // top right
		this._v[2] = this.c.c().a(this._vx).a(this._vy); // bottom right
		this._v[3] = this.c.c().s(this._vx).a(this._vy); // bottom left

		this._a[0] = this._v[1].c().s(this._v[0]);
		this._a[0] = this._a[0].divide(this._a[0].length());

		this._a[1] = this._v[3].c().s(this._v[0]);
		this._a[1] = this._a[1].divide(this._a[1].length());
	},

	isVisible: function() {
		if (!this._vrad) {
			this._vrad = Math.sqrt(this.w * this.w + this.h * this.h) / 2;
		}

		if (this.c.x + this._vrad < -camera.x) return false;
		if (this.c.x - this._vrad > w - camera.x) return false;
		if (this.c.y + this._vrad < -camera.y) return false;
		if (this.c.y - this._vrad > h - camera.y) return false;
		return true;
	},

	m: function(v, r) {
		this.c.copy(v);

		if (r !== undefined) {
			this.r = r;
		}

		this.rf();
	},

	mb: function(v) {
		this.c.a(v);
		this.rf();
	},

	setRotation: function(r) {
		this.r = r;
		this.rf();
	}
};
