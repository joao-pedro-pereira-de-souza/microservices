
import {exec } from 'child_process';
import { promisify } from 'util';
import { readFileSync } from 'fs';

import { ResponseFunctionsInterface } from '@interfaces/responses';

interface PromiseConvertXmlToPdfInterface extends ResponseFunctionsInterface {
	data?: {
		file: Buffer
	}
}

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

export default  class {

	static execPromise = promisify(exec);

	private static sofficeGetOutput(params: ParamsSofficeGetOutputInterface, isPdf?: boolean) : ResponseSofficeGetOutput {
		try {
			const { stdout } = params;
			const regex = isPdf && isPdf === true ? /(\S+\.pdf)\b/ : /(\S+\.xml)\b/;
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


	static async convertXmlToPdf(params: ParamsDefaultConvertDocumentInterface) : Promise<PromiseConvertXmlToPdfInterface>{
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

			const responseSofficeGetOutput = this.sofficeGetOutput(paramsSofficeGetOutput, true);
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
