import server from './server';

const port = process.env.port || 4000;
server.listen(port,()=> {
    console.log("servidor funcionando en el puerto",port)
})