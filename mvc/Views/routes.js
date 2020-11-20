const express= require('express');
const app=express();
const kafka=require('kafka-node');
const {Shipping}=require('./Sequelize');
const {Country}=require('./Sequelize');

//configuracion de kafka
//const client=new kafka.KafkaClient({kafkaHost:'127.0.0.1:9092'});
//consumer
//var producer=new kafka.Producer(client);
//mostrar las ubicaciones disponibles
app.get('/shipping',(req,res)=>{
    var paises="";
    Country.findAll()
    .then(countries=>{
        countries.forEach(country=>{
            console.log(country.pais);
            if(country.pais!="Rusia"){
                paises+=" "+country.pais+" , ";
            }else{
                paises+=country.pais+" ";
            }
            /*producer.send(
            [{topic:"shipping",messages:`Pais : ${country.pais}`}],
            function(err,data){}
            );*/
        })
        res.status(200).json({ paises });
    });
});
//crear el envio
app.post('/shipping/new',async(req,res)=>{
    Shipping.create({
        producto:req.body.producto,
        pais_origen:req.body.paisorigen,
        nombre_destinatario:req.body.nombre,
        pais_destino:req.body.paisdestino,
        ciudad_destino:req.body.ciudaddestino,
        direccion_destino:req.body.direcciondestino,
        telefono_destinatario:req.body.telefonodestinatario
    }).then(shipping=>{
        /*producer.send(
            [{topic:"shipping-create",messages:"Envio creado correctamente"}],
            function(err,data){}
            );*/
        res.json({'Status':200,'res':'Envio creado correctamente'});
    });

});
//calculo segun el lugar de destino y el peso
app.post('/shipping/cal',async(req,res)=>{
    const {pais}=req.body;
    //peso en kg
    const {peso}=req.body;
    const paisd=await Country.findOne({where:{pais:pais}});
    if(paisd){
        let tarifa=paisd.tarifa_pais;
        let pago=(peso*5000)+tarifa;
        /*producer.send(
            [{topic:"shipping-calculo",messages:`El pago a realizar es de : ${pago}`}],
            function(err,data){}
            );*/
        res.status(200).json({ 'Pago': `El pago a realizar es de : ${pago}` });
    }else{
        /*producer.send(
            [{topic:"shipping-calc",messages:"Error el pais no tiene covertura"}],
            function(err,data){}
            );*/
        res.status(401).json({ error: 'Error el pais no tiene covertura' });
    }
});
//Eleccion de velocidad del envio
app.post('/shipping/vel',async(req,res)=>{
    const {velocidad}=req.body;
    const costoEnvio=req.body.costo;
    let total;
    if(velocidad=="rapido"){
        total=(costoEnvio*0.15)+costoEnvio;
        /*producer.send(
            [{topic:"shipping-velocidad",messages:`El costo total del envio es de : ${total}`}],
            function(err,data){}
            );*/
        res.status(200).json({ 'Costo': `El costo total del envio es de : ${total}` });
    }else{
        total=costoEnvio;
        /*producer.send(
            [{topic:"shipping-velocidad",messages:`El costo total del envio es de : ${total}`}],
            function(err,data){}
            );*/
        res.status(200).json({ 'Costo': `El costo total del envio es de : ${total}` });
    }
});
//actualizar el lugar de destino
app.put('/shipping/:id',async(req,res)=>{
    const {id}=req.params;
    const nuevaDireccion=req.body.direccion;
    const shipping= await Shipping.findOne({where:{id:id}});
    if(shipping){
        shipping.update(
            {
                direccion_destino: nuevaDireccion,
                type: nuevaDireccion
            },
            { 
                where:
                {
                    id: id
                }
            })
        .then(newshipping=>{
            /*producer.send(
            [{topic:"shipping-destino",messages:newshipping}],
            function(err,data){}
            );*/
            res.json({'Status':200,'res':newshipping})
        })
    }else{
        /*producer.send(
            [{topic:"shipping-destino",messages:"El envio no existe"}],
            function(err,data){}
            );*/
        res.json({ error: 'El envio no existe' })
    }
});

module.exports=app;
