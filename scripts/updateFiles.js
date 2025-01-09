const env = require("../env.json");
const save_filesToDownload = require("../helper/save_filesToDownload");

let args = process.argv.slice(2);
console.log("########", args, "###########");

// D:\Repositories\phone-pc-connection\SHARED_FILES_INFO\filesToDownload.json

let filesToDownload = [];

try {
    filesToDownload = require(env.FILES_TO_DOWNLOAD_JSON_LOCATION);
} catch (SyntaxError) {}

for (let arg of args) {
    filesToDownload.push({ fileLocation: arg });
}

save_filesToDownload.save(filesToDownload);
