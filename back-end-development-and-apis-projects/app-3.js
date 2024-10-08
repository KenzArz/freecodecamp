import dns from "dns";
import { app, backEndProject } from "../index.js";

const db = [];

app.get("/shorturl", (req, res) => {
	res.sendFile(backEndProject + "/views/index-3.html");
});

app.get("/api/shorturl/:id", (req, res) => {
	const shorted = db.find(m => m.short_url == req.params.id);
	if (shorted) {
		return res.redirect(302, shorted.original_url);
	}
	return res.json({ error: "No short URL found for the given input" });
});

app.post("/api/shorturl", (req, res) => {
	const url = req.body.url.match(/https:\/\/(www.)?.*/g);
	if (!url) return res.json({ error: "invalid URL" });

	const validUrl = new URL(url[0]);
	const result = {
		original_url: url[0],
	};

	dns.lookup(validUrl.hostname, (error, address) => {
		if (error) return res.json(error);
		const shorted = db.find(m => url[0] === m.original_url);
		result.short_url =
			shorted?.short_url ||
			Math.floor(Math.random() * Number(address.replaceAll(".", "")));

		res.json(result);
		if (!shorted) {
			db.push({ ...result, address });
		}
	});
});
