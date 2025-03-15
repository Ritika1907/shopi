const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const mongo_url = process.env.MONGO_URL;
mongoose.connect(mongo_url)
    .then(()=>{
        console.log("mongoDB connected");
    }).catch((err)=>{
        console.log("mongoDB error -->",err);
    })