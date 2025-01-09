function check(cookie) {
    for (let item of global.savedCookies) {
        if (item == cookie) {
            return true;
        }
    }
    return false;
}

module.exports = { check };
