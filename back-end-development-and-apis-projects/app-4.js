import { app, backEndProject } from "../index.js";

const db = [];

app.get("/exercise", (req, res) => {
	res.sendFile(backEndProject + "/views/index-4.html");
});

app.get("/api/users", (req, res) => {
	const users = db.map(user => {
		return {
			username: user.username,
			_id: user._id,
		};
	});
	if (!db.length) return res.json({ error: "There is no user available" });
	res.json(users);
});

app.post("/api/users", (req, res) => {
	const username = req.body?.username;
	if (!username) return res.json({ error: "username can`t be undefined" });
	const checkUser = db.find(m => m.username === username);
	if (checkUser) return res.json(checkUser);
	const result = {
		username,
		_id: createRandomId(),
	};
	res.json(result);
	db.push(result);
});

app.get("/api/users/:_id/logs", (req, res) => {
	const _id = req.params._id;
	const { from, to, limit } = req.query;
	const userById = db.find(user => user._id === _id);
	if (!userById) return res.json({ error: "user not found" });

	const fromTime = new Date(from);
	const toTime = new Date(to);

	let log = userById.log;
	const result = {
		_id,
		username: userById.username,
	};
	if (from) {
		log = log.filter(log => new Date(log.date) >= fromTime);
		result.from = new Date(from).toDateString();
	}
	if (to) {
		log = log.filter(log => new Date(log.date) <= toTime);
		result.to = new Date(to).toDateString();
	}
	if (limit) {
		log = log.slice(0, Number(limit));
	}
	result.log = log;
	result.count = log.length;
	res.json(result);
});

app.post("/api/users/:_id/exercises", (req, res) => {
	const body = req.body;
	if (!body) return res.json({ error: "data can`t be undefined" });
	const _id = req.params._id;
	const { description, duration, date } = body;
	const userById = db.find(user => user._id === _id);
	const username = userById?.username;
	const getDate = date ? new Date(date) : new Date();

	if (!userById) return res.json({ error: "user not found" });
	else if (!description)
		return res.json({ error: "description can`t be undefined" });
	else if (!Number(duration))
		return res.json({ error: "duration must as a number" });
	else if (getDate.toString() === "Invalid Date")
		return res.json({ error: "Invalid Date" });

	const exerciseInfo = {
		description,
		duration: Number(duration),
		date: getDate.toDateString(),
	};
	res.json({
		_id,
		username,
		...exerciseInfo,
	});

	if (userById.log) return userById.log.push(exerciseInfo);
	userById.log = [exerciseInfo];
});

const createRandomId = () => {
	const alphanumeric = Array(123 - 97)
		.fill(97)
		.map((item, i) => item + i)
		.concat(
			Array(57 - 48)
				.fill(48)
				.map((item, i) => item + i)
		);

	let id = "";
	for (let i = 0; i < 20; i++) {
		id += String.fromCharCode(
			alphanumeric[Math.floor(Math.random() * alphanumeric.length)]
		);
	}
	return id;
};
