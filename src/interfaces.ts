import { RequestHandler, DefaultQuery, DefaultParams, DefaultHeaders } from 'fastify';
import { IncomingMessage, ServerResponse } from 'http';

export interface ServiceConfig {
    port: number;
    protocol: string;
    hostname: string;
};
export interface ServiceRoute {
    path: string;
    method: string;
    fn: RequestHandler<IncomingMessage, ServerResponse, DefaultQuery, DefaultParams, DefaultHeaders, any>;
};