import Queue from 'bull';

import connection from '@configs/redis';
import jobs from '@configs/jobs';

export default new Queue(jobs.template, { ...connection });
