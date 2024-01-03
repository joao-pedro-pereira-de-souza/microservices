
import {exec, execSync} from 'child_process';
import { promisify } from 'util';
import { mkdtemp, mkdir } from 'fs/promises'
import { readFileSync } from 'fs';

import path from 'path'



import { ResponseFunctionsInterface } from '@interfaces/responses';


interface ParamsDataConvertInterface {
	output: string,
	file: Buffer
}
interface ParamsDefaultConvertDocumentInterface {
   input_file: string,
	output?: string
}

interface ParamsSofficeGetOutputInterface {
	stdout: string
}

interface PromiseConvertPdfToXmlInterface extends ResponseFunctionsInterface {
	data?: ParamsDataConvertInterface
}


interface ResponseSofficeGetOutput extends ResponseFunctionsInterface {
	data?: {
		output: string
	}
}

// algoritmo :
// 01 converter pdf para xml (soffice --headless --convert-to xml template.pdf)
// 02 manipular as variáveis do xml
// 03 converter o xml para pdf (soffice --headless --convert-to pdf template.xml)
// 04 efetuar o upload do novo pdf
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

	// /home/joao/Downloads/testelibreoffice/02/

	// soffice --headless --convert-to xml ${path}
	// static async convertPdfToDocx (params: ParamsDefaultConvertDocumentInterface) : Promise<ResponseFunctionsInterface>{

	// 	try {
	// 		const { input, output } = params;



	// 		const script = `libreoffice --invisible --infilter="writer_pdf_import" --convert-to docx:"MS Word 2007 XML" --outdir ${output} ${input}`
	// 		return {
	// 			success: true,
	// 		}
	// 	} catch (error) {
	// 		return {
	// 			success: false,
	// 			error,
	// 			message: 'Ocorreu um erro ao converter pdf em docx'
	// 		}
	// 	}

	// }

	// static async convertDocxToHtml(params: ParamsDefaultConvertDocumentInterface): Promise<ResponseFunctionsInterface> {

	// 	try {
	// 		const { input, output } = params;

	// 		const script = `pdftohtml -c -s ${input} ${output}`;

	// 		const { stderr, stdout } = await this.execPromise(script);

	// 		if (stderr) {
	// 			return {
	// 				success: false,
	// 				error: stderr,
	// 				message: stderr
	// 			}
	// 		}
	// 		return {
	// 			success: true,
	// 			data: {stdout}
	// 		}
	// 	} catch (error) {

	// 		return {
	// 			success: false,
	// 			error,
	// 			message: 'Ocorreu um erro ao converter docx em html'
	// 		}
	// 	}


	// }

	private static sofficeGetOutput(params: ParamsSofficeGetOutputInterface) : ResponseSofficeGetOutput {
		try {

			/**
			 * convert /home/joao/Documentos/github/meus_projetos/microservices/api/src/temp/DEFGLC/template.pdf -> /home/joao/Documentos/github/meus_projetos/microservices/api/src/temp/DEFGLC/template.xml using filter : OpenDocument Drawing Flat XML\n
			 */
			const { stdout } = params;
			const regex = /(\S+\.xml)\b/;
			const matchStdout = stdout.match(regex);

			const output = matchStdout?.[0];

			if (!output?.length) {
				throw new Error()
			}

			return {
				success: true,
				data: { output }
			}
		} catch (error) {
			return {
				success: false,
				message: 'Nào foi possível encontrar o caminho de saída.',
				error
			}
		}
	}

	static async convertPdfToXml(params: ParamsDefaultConvertDocumentInterface) : Promise<PromiseConvertPdfToXmlInterface>{
		try {

			const { input_file, output } = params;

			const script = `soffice --headless --convert-to xml --outdir ${output} ${input_file} `;
			const responseSoffice = await this.execPromise(script);

			if (!responseSoffice.stdout.length || responseSoffice.stderr.length ) {
				return {
					success: false,
					message: 'Ocorreu um erro ao converter pdf para xml.',
					error: responseSoffice.stderr
				}
			}

			const paramsSofficeGetOutput = {
				stdout: responseSoffice.stdout
			}

			const responseSofficeGetOutput = this.sofficeGetOutput(paramsSofficeGetOutput);
			if (!responseSofficeGetOutput.success) {
				return {
					success: false,
					message: responseSofficeGetOutput?.message
				}

			}

			const sourceFileXml = responseSofficeGetOutput?.data?.output as string
			const fileXml = readFileSync(sourceFileXml);

			return {
				success: true,
				data: {
					output: sourceFileXml,
					file: fileXml
				}
			}
		} catch (error) {
			return {
				success: false,
				message: 'Ocorreu um erro ao converter pdf to xml.',
				error
			}
		}
	}


	static async convertXmlToPdf(params: ParamsDefaultConvertDocumentInterface) : Promise<ResponseFunctionsInterface>{
		try {

			const { input_file, output } = params;

			const script = `soffice --headless --convert-to pdf --outdir ${output} ${input_file} `;
			const responseSoffice = await this.execPromise(script);

			if (!responseSoffice.stdout.length || responseSoffice.stderr.length ) {
				return {
					success: false,
					message: 'Ocorreu um erro ao converter pdf para xml.',
					error: responseSoffice.stderr
				}
			}

			const paramsSofficeGetOutput = {
				stdout: responseSoffice.stdout
			}

			const responseSofficeGetOutput = this.sofficeGetOutput(paramsSofficeGetOutput);
			if (!responseSofficeGetOutput.success) {
				return {
					success: false,
					message: responseSofficeGetOutput?.message
				}

			}

			const sourceFilePdf = responseSofficeGetOutput?.data?.output as string
			const filePdf = readFileSync(sourceFilePdf);

			return {
				success: true,
				data: {
					output: sourceFilePdf,
					file: filePdf
				}
			}

		} catch (error) {
			return {
				success: false,
				message: 'Ocorreu um erro ao converter pdf to xml.',
				error
			}
		}
	}
}
