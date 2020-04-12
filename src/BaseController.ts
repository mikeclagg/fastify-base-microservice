import { FastifyReply, FastifyRequest } from 'fastify';
import { IncomingMessage, ServerResponse } from 'http';
import { ApiErrors, ApiMessages, IApiResponse, IApiErrorResponse } from './helpers/APIHelper';

export default class BaseController {
  public limit = 200;
  public ApiMessages = ApiMessages;
  public ApiErrors = ApiErrors;

  public listAllRoute(model: any, path = '/', method = 'get') {
    const find = {};
    return {
      fn: this.responseBuilder(async (params: any, body ?: any) => {
        const find = {};
        const pagination = await this.pagination(1, find, model);
        let getList: any;
        let list: any;
        try {
          getList = model.find(find).sort({ createdAt: -1 }).limit(pagination.limit);
          list = await getList;
        } catch(err) {
          return err;
        }
        return { list, pagination };
      }),
      method,
      path,
    };
  }

  public listByPattern(model: any, field: string, regexp: boolean = false, path = '/', method = 'get') {
    return {
      fn: this.responseBuilder(async (params: any) => {
        let find = {};
        const [ param ] = path.split('/').filter((p) => /:/.test(p) ? p.replace(/\W/gi, '') : false);
        const trimParam = params[param.replace(/\W/gi, '')];
        if (regexp) {
          find = { [field]: { $regex: new RegExp(`(.*${trimParam}.*)`, 'gi') }};
        } else {
          find = { [field]: trimParam };
        }

        const pagination = await this.pagination(1, find, model);
        const getList = model.find(find).sort({ createdAt: -1 }).limit(pagination.limit);
        const list = await getList;

        return { list, pagination };
      }),
      method,
      path,
    };
  }

  public _deleteAll(Model: any) {
    return {
      fn: this.responseBuilder(async (params: any) => {
        const removed = await Model.deleteMany({});
        return removed;
      }),
      method: 'delete',
      path: `/${Model.collection.collectionName}/__REMOVE_ALL`,
    };
  }

  public responseBuilder(next: any, code = 200) {

    return async (req: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
      let result: any = {};

      if (next) {
        try {
          result = await next(req.params, req.body);
        } catch (err) {
          this.responseServerError(err);
        }
        const response: IApiResponse = {
          result,
          status: 'ok',
        };
        reply.status(code).send(response);
      }
    };
  }

  public responseClientError(error: any): IApiErrorResponse {
    return {
      error: {
        name: error.name,
        message: error.errmsg,
        type: error.codeName,
      }
    };
  }

  public responseServerError(error: any) {
    return (req: FastifyRequest<IncomingMessage>, reply: FastifyReply<ServerResponse>) => {
      const response: IApiErrorResponse = {
        error: {
          name: error.name,
          message: error.errmsg,
          type: error.codeName,
        }
      };

      return reply.send(response);
    };
  }

  public async countDocs(find: any, model: any) {
    const getCount = model.countDocuments({});
    const total = await getCount;
    return total;
  }

  public async pagination(currPage: number, find: any, model: any) {
    const total = await this.countDocs(find, model);
    let limit = this.limit > total ? total : this.limit;
    const pages = Math.ceil(total / limit);
    let skip = currPage - 1 * limit;

    if (currPage > pages) {
      return { list: 'Page not found', total, limit, page: currPage, pages };
    } else if (currPage === pages) {
      skip = total - ((pages * limit) - total);
    }

    return { total, limit, page: currPage, pages, skip };
  }

}

function getEnumKeyByEnumValue(myEnum: any, enumValue: any) {
  const keys = Object.keys(myEnum).filter((x) => myEnum[x] === enumValue);
  return keys.length > 0 ? keys[0] : null;
}
