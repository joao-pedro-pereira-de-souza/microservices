const config = {
  redis: {
    host: "127.0.0.1",
    port: Number(process.env.DB_REDIS_PORT),
    password: process.env.DB_REDIS_PASSWORD,
  },
};

console.log({config});

export default config;
