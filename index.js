import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes';
// import path from 'path';

dotenv.config();

//Conexión a la base de datos MongoDB
mongoose.Promise=global.Promise;
const dbUrl = 'mongodb://localhost:27017/dbsystem';
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
})
.then(mongoose => console.log('Connected to DB in the port 27017'))
.catch(err => console.log(err));

//Crea el servidor de Express. app es un objeto que instancia a express. 
const app = express();

//Ejecutamos morgan en modo dev
app.use(morgan('dev')); 
app.use(cors()); //Permite el aceso al servidos desde cualquier origen.
app.use( express.json() );

//Directorio público
app.use( express.static('public'));

//Rutas
app.use('/api', router);

//Conectar al puerto asignado en las variables de entorno del servidor Y si no al 3000
app.set('port', process.env.PORT || 3000);

//Mandamos que app escuche por el puero asignado y que ejecute la tarea de imprimir por consola
app.listen(app.get('port'),()=>{
    console.log(`Server on port ${ app.get('port')}`);
});