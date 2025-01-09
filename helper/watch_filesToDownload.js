const fs = require("fs");
const path = require("path");

function update() {
    try {
        global.filesToDownload = JSON.parse(
            fs.readFileSync(
                global.__basedir + "/SHARED_FILES_INFO/filesToDownload.json",
                "utf8"
            )
        );
    } catch (syntaxError) {
        return;
    }

    // set fileName, downloadId  for all
    for (let i = 0; i < global.filesToDownload.length; i++) {
        try {
            var filename = path.basename(
                global.filesToDownload[i].fileLocation
            );
            if (filename === "") {
                throw TypeError;
            }
        } catch (TypeError) {
            // TypeError, when item.fileLocation === undefined OR length(fileName)==0
            continue;
        }
        global.filesToDownload[i].fileName = filename;
        global.filesToDownload[i].downloadId = 1000 + i;
    }
}

function config() {
    update();
    fs.watch(global.__basedir + "/SHARED_FILES_INFO", (eventType, filename) => {
        global.filesToDownload = [];
        if (eventType == "change" && filename == "filesToDownload.json") {
            update();
        }
    });
}

module.exports = { config };
