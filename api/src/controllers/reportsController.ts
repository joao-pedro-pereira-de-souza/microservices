import {Request, Response, NextFunction} from 'express';
import knex from '@database/connection';

import jobs from '@jobs/index';

import {
	UseReportInterface as BodyUseReportInterface,
	UseReportSchema
} from '@schemas/reportSchema';


import { validate } from '@validations/validation';

const reportUsers = async (req: Request<any, any, any, any>, res: Response, next: NextFunction) => {

	try {

		const data_parse = req.body?.data ? JSON.parse(req.body.data) : null;



		// const dataValidation = req.body;
      // const responseValidation = await validate(UseReportSchema, dataValidation);
      // if (responseValidation.notSuccess) {
      //    return res.status(422).json(responseValidation.response);
      // }

		let file: string | Buffer | null = null;

		if (data_parse?.id_template) {
			const whereTemplate = { id: data_parse.id_template };
			console.log(whereTemplate);
			const findTemplate = await knex('templates').where(whereTemplate).first();
			if (!findTemplate) {

				const response = {
					status: 404,
					message: 'Template not found',
					data: null
				}

				return res.status(response.status).json(response);
			}

			file = findTemplate.template_url
		}

		if (req.file?.buffer) {
			file = req.file?.buffer
		}

		if (!file) {

			const response = {
				status: 422,
				message: 'Arquivo não encontrado.',
				data: null
			}
			return res.status(response.status).json(response);
		}

		const paramsTemplateDocument = {
			file,
			data: data_parse?.data
		}

		const job = await jobs.queueUseTemplate.add(paramsTemplateDocument);


		return res.status(200).json({
			status: 200,
			message: 'Users successfully',
			data: {
				job_id: job.id,
			}
		});

	} catch (error) {
		console.log(error);
		next(error);
	}

};


export default {
	reportUsers,
};
