import { app, backEndProject } from "../index.js";
app.get("/timestamp", (req, res) => {
	res.sendFile(backEndProject + "/views/index-1.html");
});

app.get("/api/:date?", (req, res, next) => {
	const date = req.params.date;
	for (const stack of app._router.stack) {
		if (!stack.route) continue;
		else if (stack.route.path === `/api/${date}`) return next();
	}
	if (!date) return res.json(timeStamp(new Date()));
	return res.json(timeStamp(new Date(Number(date) || date)));
});

const timeStamp = time => {
	if (time.toString() === "Invalid Date") return { error: time.toString() };
	const unix = time.getTime();
	const utc = time.toUTCString();
	return { unix, utc };
};
