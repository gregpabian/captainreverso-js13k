function Truck(x, y, r) {
	this.sp = 0;
	this.wr = 0;
	this.trn = 0;
	this.acc = 0;
	this.trailer = this.cc = null;

	this.s = loader.s['tr'];
	this.hp = new Gauge(x, y, this.s.w, this.hp);

	Body.call(this, x, y, this.s.w, this.s.h, r);
	this.cabin = new Body(x, y + this.wb / 2, this.s.w, this.s.w, 0);
	this.frontWheels = new Body(x, y + this.wb / 2);
	this.rearWheels = new Body(x, y - this.wb / 2);

	if (r) {
		var rv = new Vector(-Math.sin(r), Math.cos(r)).m(this.wb / 2);
		this.cabin.m(this.c.c().a(rv), r);
		this.frontWheels.m(this.c.c().a(rv), r);
		this.rearWheels.m(this.c.c().s(rv), r);
	}
}

inherit(Truck, Body);

extend(Truck.prototype, {
	wrMax: deg2rad(45),
	a: 6,
	ra: 4,
	rs: 1.3,
	wb: 50,
	tb: 140,
	f: 0.95,
	hp: 100,

	u: function() {
		this.trn = 0;
		this.acc = 0;

		if (controls.k['l']) this.trn--;
		if (controls.k['r']) this.trn++;
		if (controls.k['u']) this.acc++;
		if (controls.k['d']) this.acc--;

		// attach/detach a trailer
		if (controls.k['a']) {
			controls.k['a'] = 0;

			if (this.trailer) {
				sound.p('a');
				if (this.trailer.tt && this.trailer.tt.v) {
					this.trailer.tt.e = false;
				}

				this.trailer.t = this.trailer = null;
			} else if (this.cc && this.cc.e) {
				sound.p('a');
				this.trailer = this.cc;
				this.trailer.t = this;
			}
		}

		if (this.trn > 0) {
			this.wr += step * this.rs;
		} else if (this.trn < 0) {
			this.wr -= step * this.rs;
		} else if (autoCenter) {
			// auto centering
			if (this.wr < -step) {
				this.wr += step * this.rs;
			} else if (this.wr > step) {
				this.wr -= step * this.rs;
			}
			if (Math.abs(this.wr) < step) {
				this.wr = 0;
			}
		}

		this.wr = this.wr > this.wrMax ? this.wrMax : this.wr < -this.wrMax ? -this.wrMax : this.wr;

		if (this.acc > 0) {
			this.sp += step * this.a;
		} else if (this.acc < 0) {
			this.sp -= step * this.ra;
		} else {
			if (Math.abs(this.sp) < step) {
				this.sp = 0;
			}
		}

		this.sp *= this.f + (this.wrMax - Math.abs(this.wr)) / this.wrMax / 100;

		var rv = new Vector(-Math.sin(this.r), Math.cos(this.r));
		var pv = rv.c().m(this.wb / 2);

		this.rearWheels.c = this.c.c()
			.s(pv)
			.a(rv.c().m(this.sp));
		this.rearWheels.r = this.r;

		this.frontWheels.c = this.c.c()
			.a(pv)
			.a(new Vector(-Math.sin(this.frontWheels.r), Math.cos(this.frontWheels.r)).m(this.sp));
		this.frontWheels.r = this.wr + this.r;

		this.m(
			this.frontWheels.c.c().a(this.rearWheels.c).divide(2),
			Math.atan2(this.rearWheels.c.y - this.frontWheels.c.y, this.rearWheels.c.x - this.frontWheels.c.x) + DEG_90
		);

		this.hp.x = this.c.x;
		this.hp.y = this.c.y;

		this.cabin.m(this.frontWheels.c, this.r);
	},

	render: function() {
		this.s.render(ctx, this.c.x, this.c.y, this.r);
		if (this.sp < 0) {
			sound.p('r', 1000);
		} else {
			sound.c('r');
		}
	},

	collideObjects: function(targets) {
		// check collision between the cabin and the trailer
		if (this.trailer && (c = this.cabin.collide(this.trailer))) {
			if (c.length() > crashThreshold) {
				this.hp.v--;
				this.trailer.hp.v--;
				sound.p('h');
				camera.shake();
			}
			this.cabin.mb(c);
			this.m(
				this.cabin.c.c().a(this.rearWheels.c).divide(2),
				Math.atan2(this.rearWheels.c.y - this.cabin.c.y, this.rearWheels.c.x - this.cabin.c.x) + DEG_90
			);
		}

		var c;

		// check collisions between the body and targets
		for (var i = 0, len = targets.length; i < len; i++) {
			if (!targets[i].isVisible()) continue;

			if ((c = this.collide(targets[i]))) {
				if (c.length() > crashThreshold) {
					this.hp.v--;
					sound.p('h');
					camera.shake();
				}
				this.mb(c);
				this.cabin.mb(c);
			}

			if (this.trailer && (c = this.trailer.collide(targets[i]))) {
				if (c.length() > crashThreshold) {
					this.trailer.hp.v--;
					sound.p('h');
					camera.shake();
				}
				this.mb(c);
				this.cabin.mb(c);
				this.trailer.mb(c);
				this.trailer.wheels.mb(c);
			}
		}
	},

	collideTrailers: function(trailers) {
		for (var i = 0, len = trailers.length; i < len; i++) {
			var trailer = trailers[i],
				c;

			if (!trailer.isVisible() || trailer === this.trailer) continue;

			if ((c = this.cabin.collide(trailer))) {
				if (c.length() > crashThreshold) {
					this.hp.v--;
					if (trailer.hp) trailer.hp.v--;
					sound.p('h');
					camera.shake();
				}
				this.mb(c);
				this.cabin.mb(c);
			}

			if ((c = this.collide(trailer.wheels))) {
				if (c.length() > crashThreshold) {
					this.hp.v--;
					if (trailer.hp) trailer.hp.v--;
					sound.p('h');
					camera.shake();
				}
				this.mb(c);
				this.cabin.mb(c);
			}

			if (this.trailer && (c = this.trailer.collide(trailer))) {
				if (c.length() > crashThreshold) {
					this.trailer.hp.v--;
					sound.p('h');
					camera.shake();
				}
				this.mb(c);
				this.cabin.mb(c);
				this.trailer.mb(c);
				this.trailer.wheels.mb(c);
			}
		}
	},

	checkTrailers: function(trailers) {
		if (this.trailer) {
			return;
		}

		this.cc = null;

		for (var i = 0, len = trailers.length; i < len; i++) {
			if (this.rearWheels.c.distanceTo(trailers[i].coupling) < trailers[i].cs) {
				this.cc = trailers[i];
				return true;
			}
		}
	}
});
