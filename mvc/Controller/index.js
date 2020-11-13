const express= require('express');
const app=express();
const cors = require('cors');
//configuraciones
app.set('port',process.env.PORT || 3000);
//middlewares
app.use(express.json());
app.use(cors());
//Routes
app.use(require('../Views/routes'));
//Start Server
app.listen(app.get('port'),()=>{
    console.log('Servidor corriendo en el puerto',app.get('port'));
});