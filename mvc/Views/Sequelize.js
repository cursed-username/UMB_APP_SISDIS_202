const Sequelize=require('sequelize');
//import de los modelos
const ShippingModel=require('../models/shipping_model');
const CountryModel=require('../models/countrys_model');
//configuracion de la url de la bd
const DBURL ='mysql://root:@localhost:3306/shipping';
//pasar los parametros de configuracion a sequelize
const sequelize=new Sequelize(DBURL);
//creando la tablas tablas
const Shipping=ShippingModel(sequelize,Sequelize);
const Country=CountryModel(sequelize,Sequelize);
//sincronizando squelize
sequelize.sync()
    .then(()=>{
        console.log('Tablas creadas');
    })

module.exports={
    Shipping,
    Country
}