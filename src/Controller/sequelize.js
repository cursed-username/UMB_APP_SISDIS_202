const Sequelize = require('sequelize')
const insert = require('../Model/historial.js');
const sequelize = new Sequelize('B6J5fwzAi3', 'B6J5fwzAi3', 'EwizatnaCt', {
  host: 'remotemysql.com',
  dialect: 'mysql',
})  

sequelize.authenticate()    
  .then(() => {
    console.log('Conectado')
  })
  .catch(err => {
    console.log('No se conecto')
  })
const historial=insert(sequelize,Sequelize);

sequelize.sync()
    .then(()=>{
        console.log('Tablas creadas');
    })
module.exports=sequelize;
module.exports=historial;