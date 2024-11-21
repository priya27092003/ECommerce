const express = require('express');
const router = express.Router();
const ownerModel = require('../models/onwer.model');

router.get("/", function (req, res) {
    res.send("hello there");
})

router.post("/create", async (req, res)=>{
    let owners = await ownerModel.find();
    if(owners.length > 0){
        return res
                .status(503)
                .send("You don't have permission to create a new owner")
    }
    let {fullname, email, password} = req.body;
    let createdOwner = await ownerModel.create({
        fullname: fullname,
        email: email,
        password: password
    })
    res.status(200).send(createdOwner);
})

module.exports = router;
