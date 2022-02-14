var mongoose = require("mongoose");
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
const { text } = require("body-parser");
var app = express();

app.use(bodyParser());
app.use(cors());

const Etudiant = mongoose.model("students", {
	Nom: String,
	Prenom: String,
	date: String,
});

app.post("/logstudent", async (req, resp) => {
	let firstName = req.body.Nom;
	let lastName = req.body.Prenom;
	let x = new Date();
	let date = `${x.getDate()}/${
		x.getMonth() + 1
	}/${x.getFullYear()}, pointe: ${x.getHours()}:${x.getMinutes()}`;
	console.log(lastName, firstName, date);

	try {
		const doc = new Etudiant({
			Nom: firstName,
			Prenom: lastName,
			date: date,
		});
		await doc.save();
		resp.status(200).json({ status: "OK" });
	} catch (err) {
		resp.status(300).json({ status: "Not OK" });
		console.log(err);
	}
});

app.get("/getallstudents", async (req, res) => {
	Etudiant.find({}, (err, messages) => {
		if (!err) {
			res.status(200);
			res.json(messages);
		} else {
			res.status(300);
			res.send("NOT OK");
		}
	});
});

mongoose
	.connect(
		"mongodb+srv://cheese:mickeymouse@cluster0.xlfhh.mongodb.net/students"
	)
	.then((db) => {
		console.log("Database connected");
	})
	.catch((err) => {});

app.listen(740);
