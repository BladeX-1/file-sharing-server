global.print = console.log;
global.__basedir = __dirname;
global.filesToDownload = [];
global.savedCookies = require("./cookiesRelated/savedCookies.json");
global.auth = require("./auth.json");

const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const busboy = require("connect-busboy");
const { downloadHandler } = require("./helper/downloadHandler");
const save_filesToDownload = require("./helper/save_filesToDownload");
const { uploadHandler } = require("./helper/uploadHandler");
const cookiesRelatedRedirects = require("./cookiesRelated/cookieRelatedRedirects");
const cookieParser = require("cookie-parser");

const clearRouter = require("./routers/clear").router;
const loginRouter = require("./routers/login").router;

const watcher = require("./helper/watch_filesToDownload");
watcher.config();

const dotenv = require("dotenv");
dotenv.config();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny")); // to log API hits
app.use(busboy()); // download related
app.use(cookieParser());

app.use("/login", loginRouter);

app.use(cookiesRelatedRedirects.onMismatch("/login"));

app.get("/", (req, res) => {
    res.render("index.ejs", { filesToDownload: global.filesToDownload });
});

app.get("/download/:downloadId", downloadHandler);

app.post("/upload", uploadHandler);

app.post("/logout", (req, res) => {
    res.clearCookie("login");
    return res.redirect("/login");
});

app.use("/clear", clearRouter);

app.listen(process.env.APP_PORT, process.env.APP_HOSTNAME, () => {
    print(
        `file sharing app active on ${process.env.APP_HOSTNAME}:${process.env.APP_PORT}`
    );
});
