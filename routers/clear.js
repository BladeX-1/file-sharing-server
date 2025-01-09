const express = require("express");
const save_filesToDownload = require("../helper/save_filesToDownload");
const router = express.Router();

router.post("/", (req, res) => {
    save_filesToDownload.save([]);
    res.redirect("/");
});

router.post("/:downloadId", (req, res) => {
    let temp = global.filesToDownload.filter(
        (item) => item.downloadId != req.params.downloadId
    );
    print("$$$$$$$$$", temp);
    save_filesToDownload.save(temp);
    res.redirect("/");
});

module.exports = { router };
