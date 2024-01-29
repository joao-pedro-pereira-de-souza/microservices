import { type Socket, type Server } from 'socket.io';
import events from '@contents/webhooks';


export default async (socket: Socket, io: Server) => {
   socket.on(events.template.progress, async (data, callback) => {
      socket.join(data.job_id)
   })
}
