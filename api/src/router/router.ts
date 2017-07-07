import * as restify from 'restify';

export abstract class Router {
    constructor(protected api: restify.Server) { }
    abstract config(): void;
}