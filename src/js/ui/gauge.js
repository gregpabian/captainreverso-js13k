function Gauge(x, y, w, m, c) {
	this.x = x;
	this.y = y;
	this.s = w / m; // step size
	this.w = w;
	this.h = 5;
	this.v = m; // value
	this.c = '#' + (c || '0f0');
}

Gauge.prototype.render = function(ctx) {
	ctx.fillStyle = '#333';
	ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w + 2, this.h + 2);
	if (this.v > 0) {
		ctx.fillStyle = this.c;
		ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.s * this.v, this.h);
	}
};
