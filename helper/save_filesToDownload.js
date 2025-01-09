const fs = require("fs");
const { FILES_TO_DOWNLOAD_JSON_LOCATION } = require("../env.json");
const saveJson = require("./saveJson");

function save(filesToDownload) {
    saveJson.save(FILES_TO_DOWNLOAD_JSON_LOCATION, filesToDownload);
}

module.exports = { save };
