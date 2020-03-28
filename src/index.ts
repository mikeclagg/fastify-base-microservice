import { BaseMicroService } from './server';
import { consoleError } from './helpers/utils';

import { SERVER_PORT, HTTP_PROTOCOL, HTTP_HOSTNAME } from './constants';
import { ServiceConfig } from './interfaces';
import { routes } from './routes';

const cfg: ServiceConfig = {
  port: SERVER_PORT,
  protocol: HTTP_PROTOCOL,
  hostname: HTTP_HOSTNAME
};

const server = new BaseMicroService(cfg);
server.init(routes);
server.start()
      .then(() => console.log(`Server - ${cfg.protocol}://${cfg.hostname}:${cfg.port}`))
      .catch(consoleError);
