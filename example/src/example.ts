import { FastifyReply, FastifyRequest } from 'fastify';
import { IncomingMessage, ServerResponse } from 'http';
import { BaseMicroService, IServiceRoute } from '../../src/BaseMicroService';
import BaseController from '../../src/BaseController';

export class ExampleController extends BaseController {

  routes(): IServiceRoute[] {
    /**
     * This is a pure route
     */
    return [
      {
        fn: (req: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
          reply.send('Api is working');
        },
        method: 'get',
        path: '/',
      },
      this.paramsExample(),
      this.notFound(),
    ];
  }

  /**
   * This uses BaseController's responseBuilder for uniform api output,
   * this can be overwritten in your implementation.
   */
  paramsExample(): IServiceRoute {
    return {
      fn: this.responseBuilder(async (params: any) => {
        return `Your parameters are param1=${params.param1} and param2=${params.param2}`
      }),
      method: 'get',
      path: '/:param1/:param2'
    };
  }

  /**
   * 404 response for any route not explicitly implemented.
   */
  notFound(): IServiceRoute {
    return {
      fn: this.responseBuilder(async (params: any) => {
        return `Page Not Found`
      }, 404),
      method: 'get',
      path: '*'
    }
  }
}

/**
 * BaseMicroService needs to be instantiated. Config has the following defaults
 *  hostname: 'localhost'
 *  port: 3000
 *  protocol: 'http'
 */
const server = new BaseMicroService();

/**
 * instantiate ExampleController, then get routes
 */
const exampleController = new ExampleController();

server.init(exampleController.routes());
server.start()
      .then(() => console.log(`Server - ${server.protocol}://${server.hostname}:${server.port}`))
      .catch(console.error);
