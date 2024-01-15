
import { Response } from 'express';
import * as formattedErrorsJson from '@contents/errors.json';
import { ResponseClientInterface } from '@interfaces/responses';


type FormattedErrors = {
  [key: string]: {
    status: number;
    message: string;
    data: any;
    // Adicione mais propriedades conforme necessário
  };
};

const errorFunction = (error: Error, res: Response) => {
   if ((Object.keys(formattedErrorsJson)).includes(error.message)) {

      const formattedErrorsStringify: FormattedErrors = formattedErrorsJson;
      const response: ResponseClientInterface = formattedErrorsStringify[error.message];
      return res.status(response.status).json(response);
   }
}

export default errorFunction
