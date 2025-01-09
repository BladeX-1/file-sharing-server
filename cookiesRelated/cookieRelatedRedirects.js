const doesCookiesMatch = require("./doesCookiesMatch");

function onMatch(redirectValue) {
    function inner(req, res, next) {
        if (doesCookiesMatch.check(req.cookies.login)) {
            return res.redirect(redirectValue);
        }
        next();
    }
    return inner;
}

function onMismatch(redirectValue) {
    function inner(req, res, next) {
        if (!doesCookiesMatch.check(req.cookies.login)) {
            return res.redirect(redirectValue);
        }
        next();
    }
    return inner;
}

module.exports = { onMismatch, onMatch };
