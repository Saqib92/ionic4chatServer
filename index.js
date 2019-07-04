
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var methodOverride = require('method-override')
var cors = require('cors');
var mysql = require('mysql');
 
var app = express(); 
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());
const fileUpload = require('express-fileupload');

let http = require('http').Server(app);
let io = require('socket.io')(http);

var port = process.env.PORT || 8081;
 
http.listen(port, function(){
   console.log('listening in http://localhost:' + port);
});


// import Modules/Controllers
var login = require('./login');
var signup = require('./signup');
var search = require('./searchuser');
var addFriend = require('./addFriend');
var findFriends = require('./findFriends');


//connecting to DataBase
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: 'chationic'
});

//to connect to database.
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

  // To Create DataBase umcomment this.
  
/*con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});*/

/*con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE users (email VARCHAR(255), password VARCHAR(255), phone VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});*/





app.post('/signup', function(req, res) {

	signup.signup(req, res, con)
   

});



app.post('/login', (req, res)=>{
	login.login(req, res, con);
})


app.post('/search', (req, res)=>{
  search.search(req, res, con);
})

app.post('/addFriend', (req, res)=>{
  addFriend.addFriend(req, res, con);
})
app.post('/findFriends', (req, res)=>{
  findFriends.findFriends(req, res, con);
})

app.get('/abc/:id', (req, res)=>{
	console.log(req.query);
	//res.send('id: ' +  req.params.id);
	res.send({id: req.params.id, data: req.query});
})



io.on('connection', (socket) => {
  
  // socket.on('disconnect', function(){
  //   io.emit('users-changed', {user: socket.nickname, event: 'left'});   
  // });
 
  // socket.on('set-nickname', (nickname) => {
  //   socket.nickname = nickname;
  //   io.emit('users-changed', {user: nickname, event: 'joined'});    
  // });
  
  // socket.on('add-message', (message) => {
  //   io.emit('message', {text: message.text, file:message.file,from: socket.nickname, created: new Date()});    
  // });

  socket.on('message', (message) => {
    console.log(message, new  Date());

    let sql = "INSERT INTO messages (sender_id, receiver_id, message, image) VALUES ('"+message.sender_id+"', '"+message.receiver_id+"', '"+message.text+"', '"+message.image+"');";
      con.query(sql, (err, result)=>{
        if (err) throw err;
        console.log('successFull added', result)
      })  

    io.emit('message', {text: message.text, created: new Date(), sender_id: message.sender_id, receiver_id: message.receiver_id});    
  });


});


