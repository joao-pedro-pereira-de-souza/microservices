import axios from 'axios';

import { ResponseFunctionsInterface } from '@interfaces/responses';

interface ParamsGetBufferFile {
   url: string;
}


interface PromiseGetBufferFile extends ResponseFunctionsInterface {
   data?: {
      buffer: Buffer
   }
}
export async function GetBufferFile(params: ParamsGetBufferFile) : Promise<PromiseGetBufferFile> {
   try {

      const { url } = params;
      const buffer = (await axios(url, { responseType: 'arraybuffer'})).data as Buffer;

      return {
         success: true,
         data: { buffer }
      }
   } catch (error) {
      return {
         success: false,
         error,
         message: 'Ocorreu um erro ao importar o arquivo url'
      }
   }
}
