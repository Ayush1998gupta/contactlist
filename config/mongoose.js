const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/contact_list_db');

const db=mongoose.connection;

db.on('error',console.error.bind(console,"Error connectiong to db"));
db.once('open',function(){
   console.log("successfull connected to database");
});