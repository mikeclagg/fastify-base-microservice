import { IServiceConfig, IServiceRoute } from './interfaces';

const env = process.env;

const PORT = env.SERVER_PORT && Number(env.SERVER_PORT) || 3000;
const PROTOCOL = env.SERVER_PROTOCOL || 'http';

const CFG: IServiceConfig = {
  port: PORT,
  protocol: PROTOCOL,
  hostname: env.SERVER_HOSTNAME || 'localhost',
  cors: true,
  ssl: /s/.test(PROTOCOL)
};

export default CFG;
