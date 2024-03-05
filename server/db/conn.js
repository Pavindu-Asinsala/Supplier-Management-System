const mongoose = require ("mongoose");

const DB = "mongodb+srv://pavinduofficial:Pavindu2001@cluster0.fqzjz5q.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(DB,{

  
  useNewUrlParser: true,
  useUnifiedTopology: true


}).then(()=> console.log("Connection start")).catch((error)=> console.log(error.message));