function Score(x, y, s) {
	this.x = x;
	this.y = y;
	this.s = s;
	this.w = 20;
}

Score.prototype = {
	w: 20,
	render: function() {
		for (var i = -1; i < 2; i++) {
			ctxfg.fillStyle = this.s - 1 > i ? '#ff0' : 'rgba(0,0,0,.1)';
			ctxfg.fillRect(this.x - this.w / 2 + ((this.w + 5) * i), this.y - this.w / 2, this.w, this.w);
		}
	}
};
