function Building(x, y, r, w) {
	Body.call(this, x, y, w, 100, r);
}

inherit(Building, Body);

extend(Building.prototype, {
	s: (function() {
		var c = makeCanvas(),
			w, h;

		c.width = c.height = w = h = 100;

		var ctx = c.getContext('2d');

		function triangle() {
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.lineTo(-w / 2, -h / 2);
			ctx.lineTo(-w / 2, h / 2);
			ctx.lineTo(0, 0);
			ctx.fill();
		}

		var gradient = ctx.createLinearGradient(-w / 2, 0, -5, 5);
		gradient.addColorStop(0, '#333');
		gradient.addColorStop(1, '#777');
		ctx.fillStyle = gradient;

		ctx.translate(w / 2, h / 2);
		ctx.save();
		triangle(w, h);
		ctx.scale(-1, 1);
		triangle(w, h);
		ctx.rotate(Math.PI / 2);
		triangle(h, w);
		ctx.rotate(Math.PI);
		triangle(h, w);
		ctx.restore();

		return c;
	})(),

	draw: function(ctx) {
		ctx.save();
		ctx.translate(this.c.x, this.c.y);
		ctx.rotate(this.r);
		ctx.shadowColor = 'rgba(0,0,0,.5)';
		ctx.shadowOffsetX = ctx.shadowOffsetY = 4;
		ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
		ctx.shadowOffsetX = ctx.shadowOffsetY = 0;
		ctx.shadowBlur = 100;
		ctx.drawImage(this.s, -this.w / 2, -this.h / 2, this.w, this.h);
		ctx.restore();
	}
});

function BuildingSmall(x, y, r) {
	Building.call(this, x, y, r, 100);
}

inherit(BuildingSmall, Building);

function BuildingBig(x, y, r) {
	Building.call(this, x, y, r, 200);
}

inherit(BuildingBig, Building);
