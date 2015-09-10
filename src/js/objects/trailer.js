function Trailer(x, y, r) {
	this.t = this.tt = null;

	var s = loader.s['tl'];
	this.s = makeCanvas();
	this.s.width = s.w;
	this.s.height = s.h;
	var ctx = this.s.getContext('2d');
	ctx.drawImage(s.img, 0, 0);
	colorize(ctx, s.w, s.h);

	Body.call(this, x, y, s.w, s.h, r);

	this.hp = new Gauge(x, y, this.w, this.hp);
	this.wb = this.h - 40;

	this.wheels = new Body(x, y - this.wb / 2, this.w, this.w, 0);
	this.coupling = new Vector(x, y + this.wb / 2);

	if (r) {
		var rv = new Vector(-Math.sin(r), Math.cos(r)).m(this.wb / 2);
		this.wheels.m(this.c.c().s(rv), r);
		this.coupling = this.c.c().a(rv);
	}
}

inherit(Trailer, Body);

extend(Trailer.prototype, {
	cs: 15,
	hp: 50,

	u: function() {
		if (this.t) {
			this.coupling = this.t.rearWheels.c.c();
			this.wheels.m(this.c.c().s(
				new Vector(-Math.sin(this.r), Math.cos(this.r)).c().m(this.wb / 2)
			), this.r);

			this.m(
				this.coupling.c().a(this.wheels.c).divide(2),
				Math.atan2(this.wheels.c.y - this.coupling.y, this.wheels.c.x - this.coupling.x) + DEG_90
			);

			this.hp.x = this.c.x;
			this.hp.y = this.c.y;
		}

		// validate the target
		if (this.tt) {
			this.tt.u();
		}

		if (this.ind) {
			this.ind.t = this.t ? this.tt : this;
			this.ind.u();
		}
	},

	render: function() {
		if (this.isVisible()) {
			ctx.save();
			ctx.translate(this.c.x, this.c.y);
			ctx.rotate(this.r);
			ctx.drawImage(this.s, -this.w / 2, -this.h / 2);
			ctx.restore();

			if (this.tt && this.hp) {
				this.hp.render(ctx);
			}
		}

		if (this.ind) {
			this.ind.render();
		}
	}
});
