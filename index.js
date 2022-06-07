const exp = require('constants');
const express  = require('express');
const path=require('path')
const port = 8000;

const db=require('./config/mongoose');
const  Contact=require('./models/contact');

const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
// app.use(express.urlencoded());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('assets'));

// // middleware 1
// app.use(function(req,res,next){

//    // console.log('middleware 1 is called');
//    next();
// })


// // middleware 2
// app.use(function(req,res,next){
//    // console.log('middleware 2 is called');
//    next();
// })


var contactList=[
   {
      name:"Ayush",
      phone:1111111111
   },
   {
      name:"Gupta",
      phone:123456789
   },
   {
      name:"Pagal",
      phone:0987654321
   }

]

app.get('/',function(req,res){

   Contact.find({},function(err,contacts){
      if(err){
         console.log('Error in frtching contacts from db');
         return;
      }
      return res.render('home',{

         title:"Contacts List",
         contact_list : contacts
      });
   })
   
});
app.get('/practice',function(req,res){
   return res.render('practice',{
      title:"Let us play with rjs"
   });
});

app.post('/create-contact',function(req,res){
//   console.log(req.body);
   // contactList.push({
   //    name:req.body.name,
   //    phone:req.body.phone
   // });

   Contact.create({
      name:req.body.name,
      phone:req.body.phone
   },function(err ,newConatct){
      if(err){
         console.log('error in creating a conatct!!');
         return;
      };
      console.log('**********',newConatct);
      return res.redirect('back');
   });
});

app.get('/delete-contact/',function(req,res){
   console.log(req.query)
   let id =req.query.id;

   // let contactIndex=contactList.findIndex(contact => contact.phone == phone);

   // if(contactIndex!=-1){
   //    contactList.splice(contactIndex,1);

   //    return res.redirect('/');
   // }

   Contact.findByIdAndDelete(id,function(err){
      if(err){
         console.log("Error in deleting an object in database");
         return;
      }
      return res.redirect('/');

   });

})

app.listen(port,function(err){
   if(err){
      console.log('Error is running the server',err);
   }

   console.log("Yep! My Express Server is running in port :",port);
});

