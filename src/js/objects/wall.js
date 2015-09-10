function Wall(x, y, r, w, h) {
	Body.call(this, x, y, w || 20, h || 200, r);
}

inherit(Wall, Body);

extend(Wall.prototype, {
	draw: function(ctx) {
		ctx.save();
		ctx.translate(this.c.x, this.c.y);
		ctx.rotate(this.r);
		ctx.fillStyle = '#644';
		ctx.strokeStyle = '#755';
		ctx.shadowColor = '#000';
		ctx.shadowOffsetX = ctx.shadowOffsetY = 4;
		ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
		ctx.shadowOffsetX = ctx.shadowOffsetY = 0;
		ctx.strokeRect(-this.w / 2 + 3, -this.h / 2 + 3, this.w - 6, this.h - 6);
		ctx.restore();
	},

	render: function() {
		if (this.dr) return;
		this.draw(ctx);
	}
});
