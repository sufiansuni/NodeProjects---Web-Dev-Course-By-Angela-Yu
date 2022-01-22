const express = require("express");
const app = express();
const port = 3000;
const date = require(__dirname + "/date.js");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const items = []; //Javascript Quirk, elements can vary, not the array/basket itself

app.get("/", (req, res) => {
	const title = date.getDate();
	res.render("list", { listTitle: title, items: items });
});

app.post("/", (req, res) => {
	items.push(req.body.newItem);
	res.redirect("/");
});

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});
