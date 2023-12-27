import express from 'express';
import cors from 'cors';

import Routes from '@routes/index';

const app = express();

app.use(express.json());
app.use(cors());


Routes(app)

export {
	app
};
