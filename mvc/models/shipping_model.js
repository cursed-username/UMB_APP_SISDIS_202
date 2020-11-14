module.exports=(sequelize,type)=>{
    const Shipping=sequelize.define('shipping',{
        id:{
            type:type.INTEGER, 
            autoIncrement: true,
            primaryKey: true
        },
        producto:{
            type:type.STRING,
            allownull:true
        },
        pais_origen:{
            type:type.STRING,
            allownull:true
        },
        nombre_destinatario:{
            type:type.STRING,
            allownull:true
        },
        pais_destino:{
            type:type.STRING,
            allownull:true
        },
        ciudad_destino:{
            type:type.STRING,
            allownull:true
        },
        direccion_destino:{
            type:type.STRING,
            allownull:true
        },
        telefono_destinatario:{
            type:type.INTEGER,
            allownull:true
        }
    },{
        timestamps:true
    })
    return Shipping;
}