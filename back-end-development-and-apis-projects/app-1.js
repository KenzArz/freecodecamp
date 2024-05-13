import express from "express";
import cors from "cors";

const app = express();
app.use(cors({ optionsSuccessStatus: 200 }));

app.get("/", (req, res) => {
	res.sendFile("index-1.html", {
		root: "./public",
	});
});

app.get("/api/:date?", (req, res) => {
	const date = req.params.date;
	if (!date) return res.json(timeStamp(new Date()));
	res.json(timeStamp(new Date(Number(date) || date)));
});

app.listen(3000, () => {
	console.log("active");
});

const timeStamp = time => {
	if (time.toString() === "Invalid Date") return { error: time.toString() };

	const unix = time.getTime();
	const utc = time.toUTCString();
	return { unix, utc };
};
