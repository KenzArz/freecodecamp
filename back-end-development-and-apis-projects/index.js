import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";

const project = ["./back-end-development-and-apis-projects"];

export const app = express();
export const upload = multer({ dest: "uploads/" });
export const backEndProject = process.cwd() + project[0].replace(".", "");

app.use(express.static(`image`));
app.use(express.static(`${project[0]}/public`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
	res.sendFile(process.cwd() + "/home.html");
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log("Your app is listening on port " + port);

	for (let i = 1; i <= 5; i++) {
		import(`${project[0]}/app-${i}.js`);
	}
});
