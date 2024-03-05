import { Express } from 'express';

import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';

import jobs from '@jobs/index';

import permissions from '@contents/permissions';
import MiddlewareAuthentication from '@functions/middlewareAuthentication';

function SetupBullBoard(app: Express) {

   const serverAdapter = new ExpressAdapter();
   serverAdapter.setBasePath('/admin/jobs');

   const queuesAdapter = Object.entries(jobs).map(([key, value]) => {
      return new BullAdapter(value);
   });

   createBullBoard({
      queues: queuesAdapter,
      serverAdapter: serverAdapter
   });

   app.use('/admin/jobs', serverAdapter.getRouter());
}

export default SetupBullBoard;
