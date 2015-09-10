function Target(x, y, r, t) {
	this.t = t;
	t.tt = this;
	this.a = this.v = false;
	Body.call(this, x, y, 60, 200, r);
}

inherit(Target, Body);

extend(Target.prototype, {
	render: function(_ctx) {
		_ctx = _ctx || ctx;
		if (this.isVisible()) {
			this.a = !!(this.t && this.t.t);
			loader.s['t'].render(_ctx, this.c.x, this.c.y, this.r, this.v ? '#0d0' : this.a ? '#d00' : 0);
		}
	},

	u: function() {
		if (this.a) {
			this.v = (Math.abs(normalizeAngle(this.r - this.t.r)) < DEG_90) && this.con(this.t);
		}
	}
});
