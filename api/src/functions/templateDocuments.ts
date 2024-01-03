

import { mkdtemp, mkdir } from 'fs/promises';
import path from 'path';

import { writeFile } from 'fs/promises';

import { ResponseFunctionsInterface } from '@interfaces/responses';

import { GetBufferFile } from '@utils/requestHttp';

import ConvertDocument from '@functions/convertDocuments';
interface ParamsUseTemplateInterface {
   file_url: string;
   data: any
}

interface PromiseSetupFolderTempInterface extends ResponseFunctionsInterface {
   data?: {
      path: string;
   }
}

interface ParamsReplaceDocumentInterface {
   source_file: string,
   file: Buffer,
   data: any,
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


   private static async replaceDocument(params: ParamsReplaceDocumentInterface):  Promise<ResponseFunctionsInterface>  {
      try {

         const { data, file, source_file } = params;

         let bufferString = file.toString()

         if (Object.entries(data).length) {
            for (const [key, property] of Object.entries(data)) {


            const regex = new RegExp(`\\${key}`, 'g');

            bufferString = bufferString.replace(regex, String(property));
         }

         }

         const newFileXml = Buffer.from(bufferString);

         await writeFile(source_file, newFileXml);

         return {
            success: true
         }
      } catch (error) {
         return {
            success: false,
            error,
            message: 'Ocorreu um erro ao efetuar o replace no documento xml.'
         }
      }
   }

   static async useTemplate(params: ParamsUseTemplateInterface): Promise<ResponseFunctionsInterface>  {

      try {

         const { file_url , data} = params;

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

         const sourceTemplate = `${responsePathTemp.data?.path}/`
         const pathFilePdf = `${sourceTemplate + fullNamePdfTemplate}`;


         await writeFile(pathFilePdf, responsePdfBuffer.data?.buffer as Buffer);

         const paramsConvertDocument = {
            input_file: pathFilePdf,
            output: sourceTemplate
         }

         const responseConvertPdfToXml = await ConvertDocument.convertPdfToXml(paramsConvertDocument);
         if (!responseConvertPdfToXml.success) {
            return {
               success: false,
               message: responseConvertPdfToXml.message
            }

         }

         const paramsReplaceDocument = {
            source_file: responseConvertPdfToXml.data?.output as string,
            file: responseConvertPdfToXml.data?.file as Buffer,
            data
         }
         await this.replaceDocument(paramsReplaceDocument)

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
