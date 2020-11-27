const express=require("express");
const morgan =require("morgan");
var app=express();



app.set('port',process.env.PORT || 3000);
require('./sequelize');

//Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Starting the server
app.use(require("../View/route"));
app.listen(app.get("port"),()=>{
    console.log('server On port', app.get('port'));
});
