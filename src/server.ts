import express from 'express';

const app = express();

//Routing
app.get('/',(req,res)=>{
    res.send('Hola mundo en express / TypeScript');
});

export default app;