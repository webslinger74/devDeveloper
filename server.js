const express  = require('express');
const path = require('path');
// const open = require('open');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const passport = require('passport');


const db = require('./config/keys.js').mongoURI;

//connect to MongoDB

mongoose.connect(db, { useNewUrlParser: true })
    .then(()=> console.log('db connected'))
    .catch((error) => console.log(error));


const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());

//passport config

require('./config/passport')(passport);

//user routes

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


app.listen(port, (error)=> {
    if(error){
        console.log(error);
    }// else {
     //   open(`http://localhost:${port}`);
  //  }
})

//Server static assets if in production

if(process.env.NODE_ENV === "production"){
app.use(express.static('client/build'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
})
}

