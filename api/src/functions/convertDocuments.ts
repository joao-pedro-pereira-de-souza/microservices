
import {exec} from 'child_process';
import { promisify } from 'util';
import {mkdtemp, mkdir} from 'fs/promises'
import path from 'path'

import {ResponseFunctionsInterface} from '@interfaces/responses';

interface ParamsDefaultConvertDocumentInterface {
   input: string,
   output: string,
}


export default  class {

	static execPromise = promisify(exec);


	// private static async setupFolderTemp(): Promise<ResponseFunctionsInterface> {

	// 	try {

	// 		const pathTemp = path.resolve(path.dirname(__dirname), 'temp');

	// 		await mkdir(pathTemp, { recursive: true });

	// 		const folderTemp = await mkdtemp(pathTemp + '/');
	// 		return {
	// 			success: true,
	// 			data: folderTemp
	// 		}

	// 	} catch (error) {
	// 		return {

	// 			success: false,
	// 			error,
	// 			message: 'Ocorreu um erro ao converter docx em html'
	// 		}
	// 	}
	// }


	static async convertPdfToDocx (params: ParamsDefaultConvertDocumentInterface) : Promise<ResponseFunctionsInterface>{

		try {
			const { input, output } = params;

			return {
				success: true,
			}
		} catch (error) {
			return {
				success: false,
				error,
				message: 'Ocorreu um erro ao converter pdf em docx'
			}
		}

	}


	static async convertDocxToHtml(params: ParamsDefaultConvertDocumentInterface): Promise<ResponseFunctionsInterface> {

		try {
			const { input, output } = params;

			const script = `pdftohtml -c -s ${input} ${output}`;

			const { stderr, stdout } = await this.execPromise(script);

			if (stderr) {
				return {
					success: false,
					error: stderr,
					message: stderr
				}
			}
			return {
				success: true,
				data: {stdout}
			}
		} catch (error) {

			return {
				success: false,
				error,
				message: 'Ocorreu um erro ao converter docx em html'
			}
		}


	}
}
