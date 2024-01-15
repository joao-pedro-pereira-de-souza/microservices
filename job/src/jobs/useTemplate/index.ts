
import FunctionUseTemplate from '@functions/useTemplate';

import connection from '@configs/redisConnection';
import configs from '@configs/redisConfig';

export default {
   job_name: 'use_template',
   async handle({ data }: any) {
      await FunctionUseTemplate(data);
   },
   connection,
   configs
}
