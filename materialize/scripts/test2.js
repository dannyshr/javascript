'use strict';

class Utils {
	constructor() {
	}
	
	hi(name) {
		return "saying hi from Utils to [" + name + "]";
	}
	
}

class Car {
	constructor(name) {
		this.name = name;
		this.utils = new Utils();
	}
	
	hello() {
		return this.utils.hi(this.name);
	}
	
}