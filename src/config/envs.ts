import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

export function loadEnv() {
  const path =
    process.env.NODE_ENV === 'test' ? 'env.test' : process.env.NODE_ENV === 'development' ? '.env.development' : '.env';

  console.log(`
    Server started on ${process.env.NODE_ENV} mode
    Use ${path} file to set configs
  `);

  const currentEnvs = dotenv.config();
  dotenvExpand.expand(currentEnvs);
}
