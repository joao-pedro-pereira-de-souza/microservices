
import { type Server } from 'socket.io';
import jobs from '@jobs/index';

import Sockets from '@websockets/index';

export default function (io: Server) {
   try {
      io.on('connection', (socket) => {
         console.log('✅ Websocket connected')
         Sockets.socketsTemplate(socket, io)

      });

      jobs.queueUseTemplate.on('global:completed', (id, response) => {

         const { success, data } = JSON.parse(response)

         const paramsEmit = {
            success,
            data: {
               file:  Buffer.from(data.pdf)
            }

         }

         io.to(id).emit('progress', paramsEmit);
      })
   } catch (error) {
      throw error
   }
}
