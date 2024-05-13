import express from "express";

const app = express();

app.get("/", (req, res) => {
	res.sendFile("index-2.html", {
		root: "./public",
	});
});

app.get("/api/whoami", (req, res) => {
	const headers = req.headers;
	const ipaddress = headers["x-forwarded-for"].split(",")[0];
	const languanges = headers["accept-language"];
	const software = headers["user-agent"];
	res.json({ ipaddress, languanges, software });
});

app.listen(3000, () => {
	console.log("active");
});
