function Steering(x, y) {
	this.x = x;
	this.y = y;
	this.r = 70;
	this.t = null;
	this.iv = new Vector(0, -this.r);
	this.i = this.iv;
	this.on = false;
	this.txt = new Label(this.x, this.y - 5, 'trailer', 2);
}

Steering.prototype = {
	u: function() {
		var a = (this.t.wr / this.t.wrMax) * DEG_90;
		this.i = this.iv.c().r(-a);
	},

	render: function() {
		ctxfg.beginPath();
		ctxfg.arc(this.x, this.y, this.r, Math.PI, 0);
		ctxfg.lineWidth = 8;
		ctxfg.strokeStyle = '#333';
		ctxfg.stroke();

		ctxfg.beginPath();
		ctxfg.arc(this.x + this.i.x, this.y + this.i.y, 12, 0, TWO_PI);
		ctxfg.fillStyle = '#f60';
		ctxfg.fill();

		ctxfg.beginPath();
		ctxfg.arc(this.x, this.y - 30, 12, 0, TWO_PI);
		ctxfg.fillStyle = this.on ? '#0c0' : '#333';
		ctxfg.fill();

		this.txt.render();
	}
};
