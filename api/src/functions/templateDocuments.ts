

import { mkdtemp, mkdir } from 'fs/promises';
import path from 'path';
import fs from 'fs';
import { writeFile } from 'fs/promises';

import { ResponseFunctionsInterface } from '@interfaces/responses';

import { GetBufferFile } from '@utils/requestHttp';

interface ParamsUseTemplateInterface {
   file_url: string;
}

interface PromiseSetupFolderTempInterface extends ResponseFunctionsInterface {
   data?: {
      path: string;
   }
}
export default class {

   private static async setupFolderTemp(): Promise<PromiseSetupFolderTempInterface> {

		try {

			const pathTemp = path.resolve(path.dirname(__dirname), 'temp');

			await mkdir(pathTemp, { recursive: true });

			const folderTemp = await mkdtemp(pathTemp + '/');
			return {
				success: true,
				data: { path: folderTemp }
			}

		} catch (error) {
			return {

				success: false,
				error,
				message: 'Ocorreu um erro ao converter docx em html'
			}
		}
	}


   static async useTemplate(params: ParamsUseTemplateInterface): Promise<ResponseFunctionsInterface>  {

      try {

         const { file_url } = params;

         const fullNamePdfTemplate = 'template.pdf';

         const responsePathTemp = await this.setupFolderTemp();
         if (!responsePathTemp.success) {
               const { success, message, error} = responsePathTemp;
               return {
                  success,
                  message,
                  error
               }
         }

         const paramsGetBufferFile = {
            url: file_url
         }
         const responsePdfBuffer = await GetBufferFile(paramsGetBufferFile)
         if (!responsePdfBuffer.success) {
            return responsePdfBuffer
         }

         await writeFile(`${responsePathTemp.data?.path}/${fullNamePdfTemplate}`, responsePdfBuffer.data?.buffer as Buffer);

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
