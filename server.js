// nodemon server.js -e js,hbs in order to run this
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app  = express();
const port= process.env.PORT || 3000;  // env variables
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');



app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
   fs.appendFile('server.log', log + '\n', (err)=>{
     if(err){
       console.log('Unable to append to server.log');
     }
   });
  console.log(log);
   next();
});

/*
// maintainance mode
app.use((req, res, next)=>{
    res.render('maintainance.hbs');
});
*/
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
});



app.get('/', (req, res)=>{
//res.send('<h1>Hello Express!</h1>');
res.render('home.hbs', {
  pageTitle : 'Home Page',
  welcomeMessage : 'How are you boy',

});
});

app.get('/about', (req, res)=>{
  res.render('about.hbs', {
    pageTitle : 'About Page',

  });
});

app.get('/project', (req, res)=>{
  res.render('project.hbs', {
    pageTitle : 'Project Page',
    projectPage : 'New project'
  });
});

app.get('/bad', (req, res)=>{
  res.send({

errorMessage : 'Unable to Handle Request'

  });
});

app.listen(port, ()=>{
  console.log(`Server is up on port ${port}`);
});
