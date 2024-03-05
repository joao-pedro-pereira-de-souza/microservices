interface ParamsInterface {
   minutes: number;
}

export default async (params: ParamsInterface) => {
   const nowDate = new Date();
   nowDate.setMinutes(nowDate.getMinutes() + params.minutes);

   await new Promise(resolve => {
      const interval = setInterval(() => {
         if (new Date().getTime() >= nowDate.getTime()) {
            clearInterval(interval);
            resolve('sucessful');
         }
      }, 1000); // Verifica a cada segundo (pode ajustar conforme necessário)
   });

   console.log('Processo concluído!');
}
