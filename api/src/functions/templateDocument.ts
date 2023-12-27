

import { mkdtemp, mkdir } from 'fs/promises';
import path from 'path';

import { ResponseFunctionsInterface } from '@interfaces/responses';


export default class {

   private static async setupFolderTemp(): Promise<ResponseFunctionsInterface> {

		try {

			const pathTemp = path.resolve(path.dirname(__dirname), 'temp');

			await mkdir(pathTemp, { recursive: true });

			const folderTemp = await mkdtemp(pathTemp + '/');
			return {
				success: true,
				data: folderTemp
			}

		} catch (error) {
			return {

				success: false,
				error,
				message: 'Ocorreu um erro ao converter docx em html'
			}
		}
	}


   static async useTemplate(): Promise<ResponseFunctionsInterface>  {

      try {

         const responsePathTemp = await this.setupFolderTemp();
         if (!responsePathTemp.success) {
               const { success, message, error} = responsePathTemp;
               return {
                  success,
                  message,
                  error
               }
         }

         return {
            success: true
         }

      } catch (error) {
         return {
            success: false,
				error,
				message: 'Ocorreu um erro no processo de manipular o template pdf'
         }
      }

   }


}
