import '@functions/setupUploads';

import express from 'express';
import cors from 'cors';
import Http from 'http';
import IO from 'socket.io';

import MiddlewareErrors from '@middlewares/erros';
import WebSocket from '@middlewares/websockets';
import MiddlewareRateLimit from '@middlewares/ratelimit';

import Routes from '@routes/index';
import { dirUploads } from '@configs/multer';

import SetupBullBoard from '@middlewares/bullBoard';


const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(dirUploads))

SetupBullBoard(app);

const http = Http.createServer(app);
const io = new IO.Server(http)

MiddlewareRateLimit(app);

Routes(app);

MiddlewareErrors(app);

WebSocket(io);

export {
	http,
	io
};
