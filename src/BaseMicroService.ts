import fastify from 'fastify';
import { DefaultHeaders, DefaultParams, DefaultQuery, RequestHandler } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';

export interface IServiceConfig {
  cors: any;
  hostname: string;
  port: number;
  protocol: string;
  ssl: boolean;
}

export interface IServiceRoute {
  path: string;
  method: string;
  fn: RequestHandler<IncomingMessage, ServerResponse, DefaultQuery, DefaultParams, DefaultHeaders, any>;
}

export class BaseMicroService {

  public app: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse>;
  private _protocol = 'http';
  private _hostname = 'localhost';
  private _port = 3000;

  /**
   * new BaseMicroService()
   * The cfg object configures the application specific information
   * such as hostname, CORS, SSL, etc.
   *
   * Although in production these should be all
   * controlled by environment variables. This config is optional
   * since every value has a default.
   * @see IServiceConfig
   * @param _cfg: IServiceConfig
   */

  constructor(private cfgInput?: IServiceConfig) {
    if (cfgInput) {

    } else {

    }
    this.app = fastify({});
  }

  get port(): number {

    return this._port;
  }

  get hostname(): string {

    return this._hostname;
  }

  get protocol(): string {

    return this._protocol;
  }

  /**
   * init(Array<IServiceRoute>)
   * Router configuration injection.
   * There are ZERO default routes!
   * @see IServiceRoute
   * @param routes
   */

  public init(routes: IServiceRoute[]) {
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
      this.app.listen(this.port, '0.0.0.0', (err: any) => {
        if (err) {
          reject(err);
          return;
        }
        console.log(`server listening on ${this.protocol}://${this.hostname}${this.port === 80 ? '/' : `:${this.port}`}`);
        resolve();
      });
    });
  }

    // public config() {
    //     const options: cors.CorsOptions = {
    //         allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
    //         credentials: true,
    //         methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    //         preflightContinue: false,
    //     };

    //     this.app.use('*', () => cors(options));

    //     // this.app.use(logger('dev'));
    // }

}
