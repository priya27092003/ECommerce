const mongoose = require('mongoose');
const config = require('config');

const dbgr = require("debug")("development:mongoose")
mongoose.connect(`${config.get("MONGODB_URL")}`)

.then(function(){
    dbgr("connected to mongodb");
    // node -e "process.env.DEBUG='development:*'; require('./app');"
    //set NODE_ENV=development
})

.catch(function(err){
    dbgr("error connecting to mongodb");
})

module.exports = mongoose.connection;