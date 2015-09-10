function Vector(x, y) {
	this.x = x || 0;
	this.y = y || 0;
}

Vector.prototype = {
	a: function(vec) {
		this.x += vec.x;
		this.y += vec.y;
		return this;
	},

	s: function(vec) {
		this.x -= vec.x;
		this.y -= vec.y;
		return this;
	},

	m: function(s) {
		this.x *= s;
		this.y *= s;
		return this;
	},

	divide: function(s) {
		this.x /= s;
		this.y /= s;
		return this;
	},

	distanceTo: function(vec) {
		var dx = vec.x - this.x,
			dy = vec.y - this.y;

		return Math.sqrt(dx * dx + dy * dy);
	},

	copy: function(from) {
		this.x = from.x;
		this.y = from.y;
		return this;
	},

	c: function() {
		return new Vector(this.x, this.y);
	},

	length: function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	},

	dot: function(vec) {
		return this.x * vec.x + this.y * vec.y;
	},

	r: function(rad) {
		var x = this.x;
		this.x = x * Math.cos(rad) + this.y * Math.sin(rad);
		this.y = -x * Math.sin(rad) + this.y * Math.cos(rad);
		return this;
	},

	st: function(x, y) {
		this.x = x;
		this.y = y;
		return this;
	}
};
