const express = require('express')

const app = express();

//Routing
app.get('/',(req,res)=>{
    res.send('Hola mundo en express');
});


app.get('/ecommers',(req,res)=>{
    res.send('Este es el ecommers');
});

app.get('/blog',(req,res)=>{
    res.send('Este es el blog');
});



app.listen(4000,()=> console.log("servidor funcionando"))