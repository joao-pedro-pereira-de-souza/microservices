import Queue from 'bull';

import jobs from '../jobs';

const AllJobs = Object.values(jobs).map((queue) => {
   return new Queue(queue.job_name, {
      ...queue.connection,
      ...queue.configs
   })
})


export default {
   addJob(job_name: string, data: any) {

      const queue = AllJobs.find(queue => queue.name === job_name);

      if (queue) {
         queue.add(data);
      }

   },
   process() {
      AllJobs.forEach(queue => {

         const queueConfigFind = Object.values(jobs).find((job) => job.job_name === queue.name);

         if (queueConfigFind) {
            queue.process(queueConfigFind.handle)

            queue.on('progress', () => {

               const message = `O processo ${queueConfigFind.job_name} foi inicializado com sucesso ✅`
               console.log(message);
            });

            queue.on('completed', () => {
               const message = `O processo ${queueConfigFind.job_name} foi finalizado com sucesso ✅`
               console.log(message);
            })

              queue.on('error', (job: any, err: any) => {
               const message = `Ocorreu um erro no processo ${queueConfigFind.job_name} 🟥`
                 console.log(message, err);
                 console.log({
                    error: err,
                    data: job
                 })
            } )
         }
      });
   }
}
