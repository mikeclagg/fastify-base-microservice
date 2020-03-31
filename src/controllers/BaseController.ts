import { FastifyReply, FastifyRequest } from 'fastify';
import { IncomingMessage, ServerResponse } from 'http';
import { ApiErrors, ApiMessages, IApiResponse } from '../helpers/APIHelper';

export default class BaseController {

  public ApiMessages = ApiMessages;
  public ApiErrors = ApiErrors;

  public listAllRoute(Model: any, path = '/', method = 'get') {
    const find = {};

    return {
      fn: this.responseBuilder(this.ApiMessages.public, async (params: any) => {
        const getCount = Model.count(find);
        const total = await getCount;
        const limit = 200 > total ? 200 : total;
        const getList = Model.find(find).sort({ createdAt: -1 }).limit(limit);
        const list = await getList;
        return list;
      }),
      method,
      path,
    };
  }

  public listByPattern(Model: any, field: string, regexp: boolean = false, path = '/', method = 'get') {
    return {
      fn: this.responseBuilder(this.ApiMessages.public, async (params: any) => {
        let find = {};
        const [ param ] = path.split('/').filter((p) => /:/.test(p) ? p.replace(/\W/gi, '') : false);
        const trimParam = params[param.replace(/\W/gi, '')];
        if (regexp) {
          find = { [field]: { $regex: new RegExp(`(.*${trimParam}.*)`, 'gi') }};
        } else {
          find = { [field]: trimParam };
        }

        const getCount = Model.countDocuments(find);
        const total = await getCount;
        const limit = 200 > total ? 200 : total;
        const getList = Model.find(find).sort({ createdAt: -1 }).limit(limit);
        const list = await getList;

        return list;
      }),
      method,
      path,
    };
  }

  public _deleteAll(Model: any) {
    return {
      fn: this.responseBuilder(this.ApiMessages.authenticated, async (params: any) => {
        const removed = await Model.deleteMany({});
        return removed;
      }),
      method: 'delete',
      path: '/__REMOVE_ALL_CODES',
    };
  }

  // public fileUpload() {

  // }

  public responseBuilder(message: ApiMessages, next: any) {

    return async (req: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
      let result: any = {};

      if (next) {
        try {
          result = await next(req.params);
        } catch (err) {
          this.responseServerError(err);
        }
        const response: IApiResponse = {
          message,
          result,
          status: 'ok',
        };
        reply.send(response);
      }
    };
  }

  public responseClientError(error: ApiErrors): IApiResponse {
    return {
      message: error,
      result: null,
      status: 'error',
    };
  }

  public responseServerError(err: Error) {
    return (req: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
      const response: IApiResponse = {
        message: 'Server error',
        result: err,
        status: 'error',
      };

      return reply.send(response);
    };
  }

}

function getEnumKeyByEnumValue(myEnum: any, enumValue: any) {
  const keys = Object.keys(myEnum).filter((x) => myEnum[x] === enumValue);
  return keys.length > 0 ? keys[0] : null;
}
