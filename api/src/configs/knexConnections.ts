

export default {
   development: {
   client: "postgresql",
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT)
    },
    migrations: {
      tableName: "knex_migrations",
      directory: `${__dirname}/src/database/migrations`,
    },

  },

  production: {
   client: "postgresql",
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT)
    },
    migrations: {
      tableName: "knex_migrations",
      directory: `${__dirname}/src/database/migrations`,
    },

  }
}
