import { readFileSync } from 'fs';

import { Server, IncomingMessage, ServerResponse } from 'http';
import { ServiceConfig, ServiceRoute } from './interfaces';


import mongoose from 'mongoose';

import logger from 'morgan';
import fastify from 'fastify';
import cors from 'cors';

export class BaseMicroService {

    public app: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse>;

    constructor(private cfg: ServiceConfig) {
        this.connectDb();
        this.app = fastify({ ignoreTrailingSlash: true });
    }

    async connectDb() {
        try {
            await mongoose.connect('mongodb://mongo:27017/', {useNewUrlParser: true});
        } catch(err) {
            console.log(err);
        }
    }

    public init(routes: any) {
        routes.forEach((route: ServiceRoute) => {
          switch(route.method) {
            case 'get':
            case 'post':
            case 'delete':
            case 'put':
              this.app[route.method](route.path, route.fn);
              break;
          }
        });
    }

    start() {
        return new Promise( (resolve, reject) => {
            this.app.listen(this.cfg.port, '0.0.0.0', (err: any) => {
                if (err) { reject(err); return; }
                console.log(`server listening on ${this.cfg.protocol}://${this.cfg.hostname}${this.cfg.port == 80 ? '/':`:${this.cfg.port}`}`);
                resolve();
            });
        });
    }

    public api() {
        this.app.get('/', function (req: any, res: any) {
            res.send('API is working!');
        });
    }

    public config() {

        const options: cors.CorsOptions = {
            allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
            credentials: true,
            methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
            // origin: API_URL,
            preflightContinue: false
        };

        this.app.use('*', () => cors(options));

        // this.app.use(logger('dev'));
    }

}
