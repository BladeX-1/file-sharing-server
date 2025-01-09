const fs = require("fs");

function save(location, data) {
    fs.writeFile(location, JSON.stringify(data), function (err) {
        if (err) throw err;
    });
}

module.exports = { save };
