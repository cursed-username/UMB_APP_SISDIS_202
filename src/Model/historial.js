module.exports=(sequelize,type)=>{
    const historial=sequelize.define('historial',{
        idOrden:{
            type:type.INTEGER, 
            autoIncrement: true,
            primaryKey: true,
            
        },                                            
        FechaDeEntrega:{
            type:type.DATE,
            allownull:false
        },
        Estado:{
            type:type.STRING,
            allownull:false
        },
        
    },{
        timestamps:true
    })
    return historial;

}


