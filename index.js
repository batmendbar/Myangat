import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
const PORT = process.env.PORT || 3000;
import { divisionResultSchema, competitionSchema } from "./models.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")))
	.set("views", path.join(__dirname, "views"))
	.set("view engine", "ejs")
	.listen(PORT, () => console.log(`Listening on ${PORT}`));

mongoose.connect(
	"mongodb+srv://batmendbar:DOPl3dIiDwipcPhF@sandbox.3asrq.mongodb.net/competition_results?retryWrites=true&w=majority"
);

const DivisionResult = mongoose.model("divisionResult", divisionResultSchema);
const Competition = mongoose.model("competition", competitionSchema);

// app.get('/', (req, res) => {
//   res.render('pages/index')
// })

app.get("/", (req, res) => {
	Competition.find({}, function (err, competitions) {
		res.render("pages/competitions", {
			competitions: competitions,
		});
	});
});

app.get(
	"/find_division_results/:competitionName/:year/:division/",
	(req, res) => {
		DivisionResult.findOne(
			{
				competitionName: req.params.competitionName,
				year: req.params.year,
				division: req.params.division,
			},
			function (err, division_results) {
				res.render("pages/division_results", {
					division_results: division_results,
				});
			}
		);
	}
);

app.get("/competitions", (req, res) => {
	Competition.find({}, function (err, competitions) {
		res.render("pages/competitions", {
			competitions: competitions,
		});
	});
});

app.get("/competitions/:competitionName", (req, res) => {
	Competition.findOne(
		{
			competitionName: req.params.competitionName,
		},
		function (err, competition) {
			res.render("pages/competitionPage", {
				competition: competition,
			});
		}
	);
});

app.get("/competitions/:competitionName/:year", (req, res) => {
	Competition.findOne(
		{
			competitionName: req.params.competitionName,
		},
		function (err, competition) {
			res.render("pages/unitedDisplay", {
				competition: competition,
			});
		}
	);
});

app.get("/admins/batmend", (req, res) => {
	res.render("pages/batmend");
});
