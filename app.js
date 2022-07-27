
const express = require('express');

const todoController = require('./controllers/todoController')



var app = express();
// set up template engine
app.use(express.static('./public'));
app.set('view engine','ejs');

//static files

// fire controller
todoController(app);

//port
app.listen(3620); 
console.log('Port is starting http://localhost:3620/');