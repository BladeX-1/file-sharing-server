function downloadHandler(req, res) {
    let fileItem = global.filesToDownload.filter(
        (item) => item.downloadId == req.params.downloadId
    )[0];

    return fileItem ? res.download(fileItem.fileLocation) : res.end();
}

module.exports = { downloadHandler };
