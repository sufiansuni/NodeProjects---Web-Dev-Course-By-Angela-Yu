const mongoose = require("mongoose");

// Call async main function declared below and catch any errors.
main().catch((err) => console.log(err));

// Go read this for a better understanding of async and await:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
async function main() {
	await mongoose.connect("mongodb://localhost:27017/fruitsDB");

	// Creating the Schema.
	const fruitSchema = new mongoose.Schema({
		name: String,
		rating: Number,
		review: String,
	});

	// Compiling Schema into a Model.
	const Fruit = mongoose.model("Fruit", fruitSchema);

	// Create a fruit document with properties and behaviors as declared in our Schema.
	const fruit = new Fruit({
		name: "Apple",
		rating: 7,
		review: "Melinda's are the best Apples!",
	});
	// Save fruit document.
	await fruit.save();

	//ATTENTION: EVERY TIME YOU RUN .save() IT WILL SAVE AGAIN AND AGAIN YOUR fruit!!!
	//So comment it out after the first time you launch app.js.
	// After the first time saving you can comment out every console.log.
	console.log(fruit.name);

	// Creating person Schema.
	const personSchema = new mongoose.Schema({
		name: String,
		age: Number,
	});

	// Compiling person Schema into a model.
	const Person = mongoose.model("Person", personSchema);

	// Creating a person document with properties and behaviors as declared in our Schema.
	const person = new Person({
		name: "John",
		age: 37,
	});

	// Save person document. USE ONLY THE FIRST TIME YOU LAUNCH APP.JS!!!
	await person.save();

	console.log(person.name);

	// Creating 3 different fruits.
	const kiwi = new Fruit({
		name: "Kiwi",
		score: 10,
		review: "The best fruit!",
	});

	const orange = new Fruit({
		name: "Orange",
		score: 4,
		review: "Not for me..",
	});

	const banana = new Fruit({
		name: "Banana",
		score: 10,
		review: "Awesome!",
	});

	// .create() is similar to .insertMany(), but the first makes a call to db for each document in the array,
	// while the second makes an unique call bypassing Mongoose validation!
	// See here for more details: https://mongoosejs.com/docs/api.html#model_Model.insertMany
	// REMEMBER TO COMMENT IT OUT AFTER SAVING THE FIRST TIME IN THE DB!!!
	// (i'm not sure about the callback function(err) part if it's right to write it like that in this case... but it seems to work :P).
	Fruit.create([kiwi, orange, banana], (err) => {
		if (err) {
			return handleError(err);
		} else {
			console.log(
				"Successfully saved all the fruits to fruitsDB inside fruits collection."
			);
		}
	});
	await mongoose.connection.close();
} // end of async main func.
