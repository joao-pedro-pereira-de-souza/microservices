import {Request, Response, NextFunction} from 'express';

import TemplateDocuments from '@functions/templateDocuments';

interface UsersInterface {
   name: string,
   birthDate: string
   photo: string
   description: string

}


interface BodyReportUsersInterface {
   users: UsersInterface[]
}

const reportUsers = async (req: Request<any, any, BodyReportUsersInterface, any>, res: Response, next: NextFunction) => {

	try {

		const {users} = req.body;

		const paramsConvertPdfToDocx = {
			input: 'teste',
			output: 'test'
		}

		await TemplateDocuments.useTemplate();

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
