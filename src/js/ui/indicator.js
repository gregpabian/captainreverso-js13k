function Indicator(p, t) {
	this.c = p.c;
	this.t = t;
	this.i = 0;
	this._d = 0;
	this.a = 0;
	this.x = 0;
	this.y = 0;
}

Indicator.prototype = {
	u: function() {
		this.i += step * 10;
		this._d = Math.sin(this.i) * 5 - 5;
		this.a = Math.atan2(this.t.c.y - this.c.y, this.t.c.x - this.c.x);

		var i;

		if (
			(i = intersect(this.c, this.t.c, camera.v[0], camera.v[1])) ||
			(i = intersect(this.c, this.t.c, camera.v[1], camera.v[2])) ||
			(i = intersect(this.c, this.t.c, camera.v[2], camera.v[3])) ||
			(i = intersect(this.c, this.t.c, camera.v[3], camera.v[0]))
		) {
			this.x = i.x;
			this.y = i.y;
		} else {
			this.x = this.t.c.x;
			this.y = this.t.c.y;
		}

		this.x += (this._d * Math.cos(this.a));
		this.y += (this._d * Math.sin(this.a));
	},

	render: function() {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.a);
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(-20, -8);
		ctx.lineTo(-20, 8);
		ctx.lineTo(0, 0);
		ctx.fillStyle = '#f00';
		ctx.strokeStyle = '#333';
		ctx.fill();
		ctx.stroke();
		ctx.restore();
	}
};
