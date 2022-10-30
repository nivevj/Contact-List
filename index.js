const express = require('express');
const path=require('path'); //to store paths
const bodyParser=require('body-parser');
const port = 8000;
const app = express();

//set the template and view 
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(bodyParser.urlencoded());
app.use(express.static('assets'));

//middleware1
// app.use(function(req,res,next){
//     req.name="nive";
//     console.log("middleware 1 called");
//     next();
// });
//middleware2
// app.use(function(req,res,next){
//     console.log("name: ",req.name);
//     console.log("middleware 2 called");
//     next();
// });

var contactlist=[
    { name: "AAA", number: 1111111111},
    { name: "BBB", number: 5555555555},
    { name: "CCC", number: 1010101010}
]

//request handling
app.get('/',function(req,res){
    console.log("name from middleware ",req.name);
    //rendering the file from view folder
    return res.render('home',{
        title:"Contacts List",
        contact_list: contactlist
    }); 
});
app.get('/rough',function(req,res){
    return res.render('rough',{title: "Rough EJS"});
});

//adding contact
app.post('/createcontact',function(req,res){
   //console.log(req.body);
   //console.log(req.body.name);
   //console.log(req.body.number);
   contactlist.push({
    name: req.body.name,
    number: req.body.number,
   });
   //contactlist.push(req.body);
   return res.redirect('/');
});

//deleting contact
app.get('/deletecontact',function(req,res){
    console.log(req.query);
    let num=req.query.num; //num is the query param from home.ejs
    console.log(num);
    let numindex=contactlist.findIndex(contact => contact.number==num);
    //contact is the iterating index variable
    if(numindex!=-1){
        contactlist.splice(numindex,1);
    }

    return res.redirect('back');//redirects to the same page

});

//running the application
app.listen(port,function(err){
    if(err){
        console.log('There is error in running the server ',err);
    }
    console.log('The server is running in port ',port);
});
