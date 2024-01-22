
import TemplateDocuments from '@functions/templateDocuments';

import connection from '@configs/redisConnection';
import configs from '@configs/redisConfig';

export default {
   job_name: 'use_template',
   async handle({ data, ...rest }: any) {

      // console.log({rest})
      await TemplateDocuments.useTemplate(data);
   },
   connection,
   configs
}
