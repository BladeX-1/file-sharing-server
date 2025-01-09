const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saveJson = require(global.__basedir + "/" + "helper/saveJson");
const cookieRelatedRedirects = require(global.__basedir +
    "/" +
    "cookiesRelated/cookieRelatedRedirects");

router.use(cookieRelatedRedirects.onMatch("/"));

router.get("/", (req, res) => {
    let msg = { error: "" };
    if (req.query.error === "true") {
        msg.error = "invalid credentials";
    }
    res.render("login.ejs", msg);
});

router.post("/", (req, res) => {
    console.log(req.body);
    for (let item of global.auth) {
        if (
            item.username === req.body.username &&
            item.password === req.body.password
        ) {
            let cookie = bcrypt.genSaltSync(5);
            res.cookie("login", cookie, { httpOnly: true });
            global.savedCookies.push(cookie);
            saveJson.save(
                global.__basedir + "/" + "cookiesRelated/savedCookies.json",
                global.savedCookies
            );
            return res.redirect("/");
        }
    }

    return res.redirect("/login?error=true");
});

module.exports = { router };
