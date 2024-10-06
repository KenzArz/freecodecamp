import { app, backEndProject } from "../index.js";

app.get("/whoami", (req, res) => {
	res.sendFile(backEndProject + "/views/index-2.html");
});

app.get("/api/whoami", (req, res) => {
	const ipaddress = req.headers["x-forwarded-for"]?.split(",")[0];
	const language = req.headers["accept-language"];
	const software = req.headers["user-agent"];
	res.json({ ipaddress, language, software });
});
