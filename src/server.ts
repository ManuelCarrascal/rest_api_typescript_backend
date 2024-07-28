import express from 'express';
import router from './router';
import db from './config/db';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import colors from 'colors';
import cors , {CorsOptions} from 'cors';
import morgan from 'morgan';

//Conectar a base de datos

async function connectDB() {
	try {
        await db.authenticate();
        try{
            db.sync();
        }catch(error){
            console.log(error);
        }
		console.log(colors.magenta.bold('Conectado a la base de datos'));
	} catch (error) {
		console.log(error);
		console.log(colors.red.bold('No se pudo conectar a la base de datos'));
	}
}

connectDB();

const server = express();

//Permitir CORS
const corsOptions : CorsOptions = {
    origin: function (origin,callback){
        if(origin === process.env.FRONTEND_URL){
            callback(null,true);

        }else{
            callback(new Error('No permitido por CORS'));
        }
        
    },
    optionsSuccessStatus: 200

}

server.use(cors(corsOptions));

server.use(express.json());

server.use(morgan('dev'))

server.use('/api/products', router);

//DOCS
server.use('/docs', swaggerUi.serve,swaggerUi.setup(swaggerSpec));

export default server;
