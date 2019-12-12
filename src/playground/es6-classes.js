class Person {

	constructor (name = 'Anonymous', age = 0) {
		this.name = name;
		this.age = age;
	}
	getGreetings() {
		return ('I am ' + this.name + '.');
	}
	getDescription () {
		return `${this.name} is ${this.age} year(s) old.`;  //template string
	}
}

class Student extends Person {
	constructor(name, age, major) {
		super(name, age);
		this.major = major;
	}
	hasMajor() {
		return !!this.major;
	}
	getDescription() {
		let description = super.getDescription();
		if(this.hasMajor()) {
			description += ` And has a major in ${this.major}.`;
		}
		return description;
	}
}

class Traveller extends Person {
	constructor(name, age, homeLocation) {
		super(name, age);
		this.homeLocation = homeLocation;
	}
	hasHomeLocation() {
		return !!this.homeLocation;
	}
	getGreetings() {
		let greetings = super.getGreetings();
		if(this.hasHomeLocation()) {
			greetings += ` I am visiting from ${this.homeLocation}.`;
		}
		return greetings;
	}
}
const me = new Traveller('Me', 7, 'hai');

const you = new Student('Life', 8);
console.log(me.getGreetings());
console.log(you.getDescription());