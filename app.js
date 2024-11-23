const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

const cookieParser = require('cookie-parser');
const path = require('path');

const ownerRoutes = require('./routes/owner.route');
const userRoutes = require('./routes/user.route');
const productRoutes = require('./routes/product.route'); 
const indexRoutes = require('./routes/index.route');

require("dotenv").config();

const db = require('./config/mongoose.connection');
const multer = require('./config/multer.config');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');

app.use("/",indexRoutes);
app.use("/owners", ownerRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);

app.listen(3000);

