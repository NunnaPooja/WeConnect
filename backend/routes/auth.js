const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const USER = mongoose.model("USER");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { Jwt_secret } = require("../keys");
const requireLogin = require("../middlewares/requireLogin");

router.get('/', (req, res) => {
    res.send("hello");
});

router.post("/signup", (req, res) => {
    const { name, userName, email, password } = req.body;

    if (!name || !userName || !email || !password) {
        return res.status(422).json({ error: "Please add all the fields" });
    }
    USER.findOne({ $or: [{ email: email }, { userName: userName }] }).then((savedUser) => {
        if (savedUser) {
            return res.status(422).json({ error: "User already exists with that email or Username" });
        }
        bcrypt.hash(password, 12).then((hashedPassword) => {
            const user= new USER({
                name,
                email,
                userName,
                password: hashedPassword
            });
            user.save()
                .then(user => { res.json({ message: "Registered successfully" }); })
                .catch(err => { console.log(err)});
        });
    }).catch(err => console.log(err));
});

router.post("/signin", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "Please add Email and Password" });
    }
    USER.findOne({ email: email }).then((savedUser) => {
        if (!savedUser) {
            return res.status(422).json({ error: "Invalid Email" });
        }
        bcrypt.compare(password, savedUser.password).then((match) => {
            if (match) {
                const token = jwt.sign({ _id: savedUser._id }, Jwt_secret);
                res.json({ token });
            } else {
                return res.status(422).json({ error: "Invalid Password" });
            }
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
});

module.exports = router;

