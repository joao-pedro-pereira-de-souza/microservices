import '@functions/setupUploads';

import express from 'express';
import cors from 'cors';
import Http from 'http';
import IO from 'socket.io'
import jobs from '@jobs/index';


import MiddlewareErrors from '@middlewares/erros';
import WebSocket from '@middlewares/websockets';

import Routes from '@routes/index';
import { dirUploads } from '@configs/multer';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(dirUploads))

const http = Http.createServer(app);
const io = new IO.Server(http)

Routes(app)

MiddlewareErrors(app);

WebSocket(io);

export {
	http,
	io
};
