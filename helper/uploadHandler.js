const fs = require("fs");
const FILE_UPLOAD_LOCATION = process.env.FILE_UPLOAD_LOCATION;
/*
uploads single file
rewrites if name clashes
*/
function singleFileUpload(req, res, next) {
    let fstream;
    req.pipe(req.busboy);
    req.busboy.on("file", function (fieldname, file, { filename }) {
        console.log("Uploading: " + filename);

        //Path where image will be uploaded
        fstream = fs.createWriteStream(FILE_UPLOAD_LOCATION + "/" + filename);
        file.pipe(fstream);
        fstream.on("close", function () {
            console.log("Upload Finished of " + filename);
            res.redirect("/"); //where to go next
        });
    });
}

function multiFileUpload(req, res, next) {
    print("#######", req.body, req.files);
    if (!req.files) {
        return res.send({
            success: false,
            message: "No image uploaded!",
        });
    }

    const files = req.files.files;
    const data = [];

    function move(item) {
        try {
            item.mv(FILE_UPLOAD_LOCATION + "/" + item.name);
        } catch (e) {
            return res.send({
                success: false,
                message: "upload error",
            });
        }

        data.push({
            name: item.name,
            mimeType: item.mimetype,
            size: item.size,
        });
    }

    Array.isArray(files) ? files.forEach((file) => move(file)) : move(files);
    return res.send({ success: true, message: "uploaded successfully", data });
}

const uploadHandler = singleFileUpload;
module.exports = { uploadHandler };
