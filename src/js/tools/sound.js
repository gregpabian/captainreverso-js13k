var sound = {
	s: {},

	m: 0,

	mute: function(val) {
		this.m = val;
		localStorage.setItem('tm', val);
	},

	l: {},
	t: {},

	_play: function(name) {
		var s = sound.s[name];
		s.s = s.s + 1 < s.c ? s.s + 1 : 0;
		s.t[s.s].play();
	},

	c: function(name) {
		if (this.m) return;
		var s = sound.s[name];
		s.t[s.s].pause();
		s.t[s.s].currentTime = 0;
		clearTimeout(sound.t[name]);
	},

	cancelAll: function() {
		if (this.m) return;
		Object.keys(sound.t).forEach(function(k) {
			clearTimeout(sound.t[k]);
		});
	},

	p: function(name, delay) {
		if (this.m) return;

		delay = delay || 100;

		var now = time();

		if (sound.l[name] && now < sound.l[name] + delay) {
			clearTimeout(sound.t[name]);
			sound.t[name] = setTimeout(function() {
				sound.l[name] = now;
				sound._play(name);
			}, delay);
		} else {
			sound.l[name] = now;
			sound._play(name);
		}
	}
};

sound.m = +localStorage.getItem('tm') || 0;

if (document.documentMode) sound.mute(1);

Object.keys(sounds).forEach(function(name) {
	var s = sounds[name],
		a, i;

	sound.s[name] = {
		s: 0,
		c: s.c,
		t: []
	};

	for (i = 0; i < s.c; i++) {
		a = new Audio();
		a.src = jsfxr(s.s);
		sound.s[name].t.push(a);
	}
});
