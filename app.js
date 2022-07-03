const express = require('express');
const app = express();
const morgan = require('morgan');

let options = {
    root : __dirname+'/views'
}

app
app.use(morgan('dev'));

app.get('/home',(req,res)=>{
    console.log(req.hostname);
    res.sendFile('index.html',options);
});

app.get('/params/:name',(req,res)=>{
    res.hello('req.params.name')
});

app.listen(3000,() => {
    console.log(`Listening on http://localhost:3000/home`);
});