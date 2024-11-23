const express = require('express');
const router = express.Router();
const {registerUser} = require('../controllers/auth.controller');
const isLoggedIn = require('../middleware/auth.middleware');
const upload = require('../config/multer.config');

router.get("/", function (req, res) {
    res.send('hello there');
})

router.post('/register', registerUser);

router.get("/login",(req,res)=>{   
    res.render('login');
})

router.post("/login",async (req,res)=>{
    let {email, password} = req.body;
    let user= await userModel.findOne({email});
    if(!user){
        return res.status(500).send({error: 'Something went wrong'});
    }
    //decrypt the password
    bcrypt.compare(password, user.password, function(err, result) {
        if(result){
            let token = jwt.sign({email:email, userid:user._id}, process.env.JWT_SECRET || 'shhhhh');
            res.cookie("token", token);
            res.status(200).redirect('/users/profile');
        }
        else{
            res.redirect('/login');
        }
    })
});

router.get('/logout', (req, res)=>{
    res.cookie("token","");
    res.redirect('/login');
});

router.get('/profile', isLoggedIn, async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.render('profile', { user });
    } catch (err) {
        res.status(500).send({ error: 'Error fetching user data' });
    }
});


module.exports = router;
