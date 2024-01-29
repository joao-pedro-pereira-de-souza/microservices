

import { mkdtemp, mkdir } from 'fs/promises';
import path from 'path';
import { writeFile } from 'fs/promises';
import { rmSync } from 'fs'
import { Job } from 'bull';

import { ResponseFunctionsInterface } from '@interfaces/responses';

import { GetBufferFile } from '@utils/requestHttp';
import FunctionTest from '@utils/taskTest';

import ConvertDocument from '@functions/convertDocuments';


interface ParamsUseTemplateInterface {
   file: string | Buffer;
   data: any;
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

interface ParamsDropFolderInterface {
   source: string
}

interface PromiseUseTemplateInterface extends ResponseFunctionsInterface {
   data?: {
      pdf: Buffer
   }
}


interface ParamsBufferFileInterface {
   file: string | Buffer
}

interface PromiseBufferFileInterface extends ResponseFunctionsInterface {
   data?: {
      file: Buffer
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

   private static rmFolder(params: ParamsDropFolderInterface): ResponseFunctionsInterface {
      try {

         const { source } = params;

         rmSync(source, {recursive: true, force: true});

         return {
            success: true
         }
      } catch (error) {
         return {
            success: false,
            error,
            message: 'Ocorreu um erro ao deletar a pasta do template usado.'
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


   private static async bufferFile(params: ParamsBufferFileInterface): Promise<PromiseBufferFileInterface>{

      try {
         const { file } = params

         let bufferFile
         if (typeof file === 'string') {
            const paramsGetBufferFile = {
               url: file
            }
            const responsePdfBuffer = await GetBufferFile(paramsGetBufferFile)
            if (!responsePdfBuffer.success) {
               return {
                  success: false,
                  message: responsePdfBuffer.message
               }
            }

            bufferFile = responsePdfBuffer.data?.buffer as Buffer
         } else {
            bufferFile = Buffer.from(file)
         }


         return {
            success: true,
            data: {
               file: bufferFile
            }
         }
      } catch (error) {
         return {
            success: false,
            message: 'Ocorreu um erro no arquivo enviado.',
            error
         }
      }

   }

   static async useTemplate(params: ParamsUseTemplateInterface): Promise<PromiseUseTemplateInterface>  {

      try {

         const { file, data } = params;

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

         const paramsBufferFile = {
            file
         }

         const responseBufferFile = await this.bufferFile(paramsBufferFile)

         if (!responseBufferFile.success) {
            return {
               success: false,
               message: responseBufferFile.message
            }
         }

         const sourceTemplate = `${responsePathTemp.data?.path}/`
         const pathFilePdf = `${sourceTemplate + fullNamePdfTemplate}`;

         await writeFile(pathFilePdf, responseBufferFile.data?.file as Buffer)

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

         const paramsConvertDocumentXmlToPdf = {
            input_file: responseConvertPdfToXml.data?.output as string,
            output: sourceTemplate
         }

         const responseConvertXmlToPdf = await ConvertDocument.convertXmlToPdf(paramsConvertDocumentXmlToPdf);

         if (!responseConvertXmlToPdf.success) {
            return {
               success: false,
               message: responseConvertXmlToPdf.message
            }
         }

         const paramsRmFolder = {
            source: responsePathTemp.data?.path as string
         }

         this.rmFolder(paramsRmFolder)
         // const minutes = 1
         // await FunctionTest({ minutes })

         return {
            success: true,
            data: {
               pdf: responseConvertXmlToPdf.data?.file as Buffer,
            }
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
