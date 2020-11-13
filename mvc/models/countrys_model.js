module.exports=(sequelize,type)=>{
    const Country=sequelize.define('Country',{
        id:{
            type:type.INTEGER, 
            autoIncrement: true,
            primaryKey: true
        },
        pais:{
            type:type.STRING,
            allownull:false
        },
        tarifa_pais:{
            type:type.INTEGER,
            allownull:false
        }
    },{
        timestamps:true
    })
    return Country;
}