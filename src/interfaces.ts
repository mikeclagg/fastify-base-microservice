import fastify from 'fastify';
import { IncomingMessage, ServerResponse } from 'http';

export interface ServiceConfig {
    port: number;
    protocol: string;
    hostname: string;
};
export interface ServiceRoute {
    path: string;
    method: string;
    fn: fastify.RequestHandler<IncomingMessage, ServerResponse, fastify.DefaultQuery, fastify.DefaultParams, fastify.DefaultHeaders, any>;
};