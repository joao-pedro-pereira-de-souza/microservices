import knex from 'knex';

import knexConnections from '@configs/knexConnections';

export default knex(process.env.NODE_ENV === 'development'? knexConnections.development: knexConnections.production)
