const express =require('express');
const Router =express.Router();
const historial=require('../Controller/sequelize');
const kafka=require('kafka-node');
const client=new kafka.KafkaClient({kafkaHost:'127.0.0.1:9092'});
var producer=new kafka.Producer(client);



Router.get("/",async(req,res)=>{
    historial.findAll()
    .then( userResponse => {
      res.status( 200 ).json( userResponse )
    })
    .catch( error => {
      res.status( 400 ).send( error )
    })
});




module.exports=Router;