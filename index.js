import express from 'express';
import http from 'node:http';
import { config  as envConfig } from 'dotenv';
import productRouter from './routes/productsRouter.js';
import startProcedure from './helpers/updateInterval.js';

envConfig();

const PORT = process.env.PORT;

const app = express();
const server = http.createServer(app);

/* Midlleware */
app.use(express.json());

/* Products Router */
app.use('/products', productRouter);

server.listen(PORT,
    async () => {
        startProcedure();
        console.log(`Server is running on port: ${PORT}\nUrl: http://localhost:${PORT}`);
    }
);
