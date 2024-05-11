import dns from "dns";
import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use("/public", express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({ extended: false }));

const db = [];

app.get("/", (req, res) => {
	res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/shorturl", (req, res) => {
	const url = req.body.url.match(/https:\/\/(www.)?.*/g);
	if (!url) return res.json({ error: "invalid url" });

	const validUrl = new URL(url[0]);
	let result = {
		original_url: validUrl.href,
	};

	dns.lookup(validUrl.hostname, (error, address, a) => {
		if (error) return res.json(error);
		const shorted = db.find(m => validUrl.href === m.original_url);
		result.shorturl =
			shorted?.shorturl ||
			address.split(".").reduce((prev, current) => prev + Number(current), 0);

		res.json(result);
		if (!shorted) {
			db.push({ ...result, address });
		}
	});
});

app.get("/api/shorturl/:id", (req, res) => {
	const shorted = db.find(m => m.shorturl == req.params.id);
	if (!shorted)
		return res.json({ error: "No short URL found for the given input" });
	res.redirect(shorted.original_url);
});

app.listen(3000, () => {
	console.log("active");
});
