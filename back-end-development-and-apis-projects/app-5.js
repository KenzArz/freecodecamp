import { app, upload, backEndProject } from "../index.js";

app.get("/metadata", function (req, res) {
	res.sendFile(backEndProject + "/views/index-5.html");
});

const cpUpload = upload.fields([{ name: "upfile", maxCount: 1 }]);
app.post("/api/fileanalyse", cpUpload, (req, res) => {
	if (!req.files.upfile.length)
		return res.json({ error: "File can not be empty" });
	const files = req.files.upfile[0];
	res.json({
		name: files.originalname,
		type: files.mimetype,
		size: files.size,
	});
});
