import { DefaultHeaders, DefaultParams, DefaultQuery, RequestHandler } from 'fastify';
import { IncomingMessage, ServerResponse } from 'http';

export interface IServiceConfig {
    hostname: string;
    port: number;
    protocol: string;
    ssl: boolean;
    cors: any;
}

export interface IServiceRoute {
    path: string;
    method: string;
    fn: RequestHandler<IncomingMessage, ServerResponse, DefaultQuery, DefaultParams, DefaultHeaders, any>;
}
