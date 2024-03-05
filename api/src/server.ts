import 'dotenv/config';

import { http as app } from '@middlewares/setup';
import listener from '@functions/listener';

app.listen(process.env.PORT, listener);
