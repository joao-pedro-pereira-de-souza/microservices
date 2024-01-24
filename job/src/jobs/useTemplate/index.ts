
import TemplateDocuments from '@functions/templateDocuments';

import connection from '@configs/redisConnection';
import configs from '@configs/redisConfig';

export default {
   job_name: 'use_template',
   async handle({ data, ...rest }: any) {
      const response = await TemplateDocuments.useTemplate(data);

      return response
   },
   connection,
   configs
}
