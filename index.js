const express = require('express');
const app = express();

const port = 4555;
const username = "edin";
const password = "password";

app.use((req,res,next)=> {
    if(req.path != '/login'){
        let err = {
            status: 404,
            message: 'Not found!',
        }
        next(err);
    }
    next();
})

app.use((req, res, next)=>{
    if(req.get('Content-type')!= 'application/json'){
        let err = {};
        err.status = 400;
        err.message = 'Bad request';
        next(err);
    }
    next();
});

app.use(express.json());

app.use((req, res, next) => {
    if(req.body.username != username || req.body.password != password){
        let err = {};
        err.status = 401;
        err.message = "username or password incorrect";        
        next(err);
    }
    next();
}
);



app.post('/login',(req, res) => {
    res.status(200).set('Content-type', 'application/json').send(JSON.stringify({token: "1234567890"}));
});

app.use((err,req,res,next)=>{
    res.status(err.status).set('Content-type', 'application/json').send(JSON.stringify({message: err.message}));
});

app.listen(port, ()=> console.log('Listening on port ' + port));