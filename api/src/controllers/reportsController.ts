import {Request, Response, NextFunction} from 'express';

import knex from '@database/connection';

import TemplateDocuments from '@functions/templateDocuments';

import {
	UseReportInterface as BodyUseReportInterface,
	UseReportSchema
} from '@schemas/ReportSchema';
import {
   CreateTemplateInterface as BodyCreateInterface
} from '@schemas/TemplateSchema';

import { validate } from '@validations/validation';

const reportUsers = async (req: Request<any, any, BodyUseReportInterface, any>, res: Response, next: NextFunction) => {

	try {

		const { id_template, data } = req.body;

		const dataValidation = req.body;
      const responseValidation = await validate(UseReportSchema, dataValidation);
      if (responseValidation.notSuccess) {
         return res.status(422).json(responseValidation.response);
      }


		const whereTemplate = { id: id_template };
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

		const paramsTemplateDocument = {
			file_url: findTemplate.template_url
		}


		const responseUseTemplate = await TemplateDocuments.useTemplate(paramsTemplateDocument);
		if (!responseUseTemplate.success) {

			const response = {
				status: 503,
				message: responseUseTemplate.message,
				data: null
			}
			return res.status(response.status).json(response);
		}

		return res.status(200).json({
			status: 200,
			message: 'Users successfully',
			data: {
				teste: '1'
			}
		});

	} catch (error) {
		next(error);
	}

};

export default {
	reportUsers
};
