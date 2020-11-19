const express= require('express');
const app=express();

const {Shipping}=require('./Sequelize');
const {Country}=require('./Sequelize');
//mostrar las ubicaciones disponibles
app.get('/shipping',(req,res)=>{
    Country.findAll()
    .then(countries=>{
        res.status(200).json({ countries });
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
        res.status(200).json({ 'Pago': `El pago a realizar es de : ${pago}` });
    }else{
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
        res.status(200).json({ 'Consto': `El costo total del envio es de : ${total}` });
    }else{
        total=costoEnvio;
        res.status(200).json({ 'Consto': `El costo total del envio es de : ${total}` });
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
            res.json({'Status':200,'res':newshipping})
        })
    }else{
        res.json({ error: 'El envio no existe' })
    }
});

module.exports=app;
