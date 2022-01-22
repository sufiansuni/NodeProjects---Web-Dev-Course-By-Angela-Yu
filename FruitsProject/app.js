const mongoose = require("mongoose");

// Call async main function declared below and catch any errors.

main().catch((err) => console.log(err));

// Go read this for a better understanding of async and await:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
async function main() {
	await mongoose.connect("mongodb://localhost:27017/fruitsDB");

	// Creating the Schema.
	const fruitSchema = new mongoose.Schema({
		name: {
			// Validator
			type: String,
			required: [true, "Fruits must have a name."],
		},
		rating: {
			// Validator
			type: Number,
			min: [1, "min >= 1"],
			max: [10, "max <= 10"],
		},
		review: String,
	});

	// Compiling Schema into a Model.
	const Fruit = mongoose.model("Fruit", fruitSchema);

	Fruit.find(function (err, fruits) {
		if (err) {
			console.log(err);
		} else {
			// console.log(fruits);
			fruits.forEach((fruit) => console.log(fruit.name));
		}
	});
	setTimeout(function () {
		mongoose.connection.close();
	}, 1000);
} // end of async main func.
