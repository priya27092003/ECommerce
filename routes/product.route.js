const express = require('express');
const router = express.Router();

router.get("/", function (req, res) {
    res.send("hello there");
})

module.exports = router;
