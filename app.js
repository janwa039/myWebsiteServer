
var express=require('express');

var nodemailer=require('nodemailer');

var bodyParser=require("body-parser");


var app=express(); //initializing express


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(process.env.PORT || 3002, ()=>{
    console.log('server has started');
})

app.use(function (req, res, next) {
   console.log("REQUESTING STUFF");
   next();
});

app.use(bodyParser.json());

app.use(function (req, res, next) {
    console.log("REQUESTING STUFF 2");
    next();
});


app.post('/formPage', (req, res)=>{

    var transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.USER,
            pass:process.env.PASS
        }
    });
    var mailOptions={
        from:req.body.valueEmail,
        to:process.env.USER,
        subject:req.body.valueSubject,
        text:req.body.valueMessage

    }
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error)
        }
        else{
            console.log('it was a success')
        }

    })
    res.end();
});

app.use(function (req, res, next) {
    console.log("REQUESTING STUFF 3");
    next();
});
