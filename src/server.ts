import cors from 'cors';
import fastify from 'fastify';
import { FastifyReply, FastifyRequest } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import { IServiceConfig, IServiceRoute } from './interfaces';

export default class BaseMicroService {

    public app: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse>;

    constructor(private cfg: IServiceConfig) {
        this.app = fastify({});
    }

    public init(routes: any) {
        routes.forEach((route: IServiceRoute) => {
          switch (route.method) {
            case 'get':
            case 'post':
            case 'delete':
            case 'put':
              this.app[route.method](route.path, route.fn);
              break;
          }
        });
    }

    public start() {
        return new Promise( (resolve, reject) => {
            this.app.listen(this.cfg.port, '0.0.0.0', (err: any) => {
                if (err) { reject(err); return; }
                console.log(`server listening on ${this.cfg.protocol}://${this.cfg.hostname}${this.cfg.port === 80 ? '/' : `:${this.cfg.port}`}`);
                resolve();
            });
        });
    }

    public api() {
        this.app.get('/', (req: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
            reply.send('API is working!');
        });
    }

    public config() {

        const options: cors.CorsOptions = {
            allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
            credentials: true,
            methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
            preflightContinue: false,
        };

        this.app.use('*', () => cors(options));

        // this.app.use(logger('dev'));
    }

}
