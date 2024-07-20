const { json } = require('body-parser');
const mongoose = require('mongoose');

const DB = 'mongodb+srv://anveshikagbu:Anvi1234@cluster0.4w9lwmj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(DB).then(()=>{
    console.log("Mongodb connected successfully");
}).catch((err)=>{
    console.log("no connection",err);
})



