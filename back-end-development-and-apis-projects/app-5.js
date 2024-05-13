import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
dotenv.config();

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
	res.sendFile(process.cwd() + "/public/index-5.html");
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

const port = process.env.PORT || 3000;
app.listen(port, function () {
	console.log("Your app is listening on port " + port);
});
