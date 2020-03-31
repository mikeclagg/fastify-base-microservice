import { IncomingMessage, ServerResponse } from 'http';
import { FastifyRequest, FastifyReply } from 'fastify';
import { ApiErrors, ApiMessages, ApiResponse } from '../helpers/APIHelper';

export default class BaseController {

  public ApiMessages = ApiMessages;
  public ApiErrors = ApiErrors;
  constructor() {
  }

  listAllRoute(Model: any, path = '/', method = 'get') {
    const find = {};

    return {
      path,
      method,
      fn: this.responseBuilder(this.ApiMessages.public, async (params: any) => {
        const getCount = Model.count(find);
        const total = await getCount;
        const limit = 200 > total ? 200: total;
        const getList = Model.find(find).sort({ createdAt: -1 }).limit(limit);
        const list = await getList;
        return list;
      })
    }
  }

  listByPattern(Model: any, field: string, regexp: boolean = false, path = '/', method = 'get') {
    return {
      path,
      method,
      fn: this.responseBuilder(this.ApiMessages.public, async (params: any) => {
        let find = {};
        const [ param ] = path.split('/').filter(param => /:/.test(param) ? param.replace(/\W/gi, '') : false);
        const trimParam = params[param.replace(/\W/gi, '')];
        if (regexp) {
          find = { [field]: { $regex: new RegExp(`(.*${trimParam}.*)`, 'gi') }};
        } else {
          find = { [field]: trimParam };
        }

        const getCount = Model.countDocuments(find);
        const total = await getCount;
        const limit = 200 > total ? 200: total;
        const getList = Model.find(find).sort({ createdAt: -1 }).limit(limit);
        const list = await getList;

        return list;
      })
    }
  }

  _deleteAll(Model: any) {
    return {
      path: '/__REMOVE_ALL_CODES',
      method: 'delete',
      fn: this.responseBuilder(this.ApiMessages.authenticated, async (params: any) => {
        const removed = await Model.deleteMany({});
        return removed;
      })
    };
  }

  fileUpload() {

  }

  responseBuilder(message: ApiMessages, next: Function) {

    return async (req: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
      let result: any = {}, message: any;

      if (next) {
        try {
          result = await next(req.params);
        } catch(err) {
          this.responseServerError(err);
        }
        const response: ApiResponse = {
          'status': 'ok',
          'message': message,
          'result': result
        };
        reply.send(response);
      }
    };
  }

  responseClientError(error: ApiErrors): ApiResponse {
    return {
      'status': 'error',
      'message': error,
      'result': null
    };
  }

  responseServerError(err: Error) {
    return (req: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
      const response: ApiResponse = {
        'status': 'error',
        'message': 'Server error',
        'result': err
      };

      return reply.send(response);
    }
  }

}

function getEnumKeyByEnumValue(myEnum: any, enumValue: any) {
  const keys = Object.keys(myEnum).filter(x => myEnum[x] == enumValue);
  return keys.length > 0 ? keys[0] : null;
}