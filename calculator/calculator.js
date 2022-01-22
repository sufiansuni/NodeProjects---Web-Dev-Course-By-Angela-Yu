const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post('/', (req, res) => {
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);
    var result = num1 + num2;
    res.send("Result: " + result);
})

app.get('/bmi', (req, res) => {
    res.sendFile(__dirname + "/bmiCalculator.html");
})

app.post('/bmi', (req, res) => {
    var weight = Number(req.body.weight);
    var height = Number(req.body.height);
    var bmi = Math.floor(weight / Math.pow(height, 2));
    res.send("Your BMI is " + bmi);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
