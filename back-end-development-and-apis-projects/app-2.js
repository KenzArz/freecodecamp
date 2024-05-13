import express from "express";
import cors from "cors";

const app = express();
app.use(cors({ optionsSuccessStatus: 200 }));

app.get("/", (req, res) => {
	res.sendFile("index-2.html", {
		root: "./public",
	});
});

app.get("/api/whoami", (req, res) => {
	const ipaddress = req.headers["x-forwarded-for"].split(",")[0];
	const language = req.headers["accept-language"];
	const software = req.headers["user-agent"];
	res.json({ ipaddress, language, software });
});

app.listen(3000, () => {
	console.log("active");
});
