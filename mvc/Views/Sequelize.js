const Sequelize=require('sequelize');
//import de los modelos
const ShippingModel=require('../models/shipping_model');
const CountryModel=require('../models/countrys_model');
//pasar los parametros de configuracion a sequelize
const sequelize = new Sequelize('A6Ph1XLzs4', 'A6Ph1XLzs4', 'sKhEygjwb8', {
    host: 'remotemysql.com',
    dialect: 'mysql'
});
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