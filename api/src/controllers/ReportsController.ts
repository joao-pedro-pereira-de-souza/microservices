import {Request, Response, NextFunction} from 'express';
import ConvertDocument from '@functions/convertDocuments';

interface UsersInterface {
   name: string,
   birthDate: string
   photo: string
   description: string

}


interface BodyReportUsersInterface {
   users: UsersInterface[]
}

const reportUsers = async (req: Request<undefined, undefined, BodyReportUsersInterface, undefined>, res: Response, next: NextFunction) => {

	try {

		const {users} = req.body;

		const paramsConvertPdfToDocx = {
			input: 'teste',
			output: 'test'
		}

		await ConvertDocument.convertPdfToDocx(paramsConvertPdfToDocx)

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
