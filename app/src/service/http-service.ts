import { Headers, Http, Request, RequestMethod } from '@angular/http';

import { environment } from '../environments/environment';

import { Pagination } from '../entity/pagination';

export abstract class HttpService {
    constructor(protected http: Http) { }

    protected buildSearchTextQueryString(text: string) {
        var queryString = '';
        if (text) {
            queryString += '&search_text=' + text;
        }
        return queryString;
    }

    protected buildPaginationQueryString(pagination: Pagination) {
        var queryString = '';
        if (pagination) {
            if (pagination.size || pagination.size === 0) {
                queryString += '&size=' + pagination.size;
            }
            if (pagination.index || pagination.index === 0) {
                queryString += '&index=' + pagination.index;
            }
        }
        return queryString;
    }

    protected combinePath(paths: string[]) {
        let url = '';
        paths.forEach(path => {
            if (path) {
                if (url !== '') {
                    url += '/';
                }
                url += path;
                while (url.endsWith('/')) {
                    url = url.substr(0, url.length - 1);
                }
            }
        });
        return url;
    }

    requestText(path: string, method: RequestMethod, data: any = {}): Promise<string> {
        let url = this.combinePath([environment.serviceUrlRoot, path]);
        if (environment.showServiceLog) {
            console.log('Debug: Begin a text request. url:' + url + ';method:' + method + ';data:' + JSON.stringify(data));
        }
        return new Promise<string>((resolve, reject) => {
            this.http.request(new Request({
                method: method,
                url: url,
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: data
            })).subscribe(r => {
                var bodyText = r.text();
                if (environment.showServiceLog) {
                    console.log('Request text ok.Return:' + bodyText);
                }
                resolve(bodyText);
            }, e => {
                if (environment.showServiceLog) {
                    throw 'Request text failed.' + e;
                }
                reject(e);
            });
        });
    }

    requestJson<T>(path: string, method: RequestMethod, data: any = {}): Promise<T> {
        let url = this.combinePath([environment.serviceUrlRoot, path]);
        if (environment.showServiceLog) {
            console.log('Debug: Begin a text request. url:' + url + ';method:' + method + ';data:' + JSON.stringify(data));
        }
        return new Promise<T>((resolve, reject) => {
            this.http.request(new Request({
                method: method,
                url: url,
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: data
            })).subscribe(r => {
                var bodyText = r.text();
                if (environment.showServiceLog) {
                    console.log('Request text ok.Return:' + bodyText);
                }
                if (bodyText && bodyText !== '') {
                    resolve(<T>r.json());
                }
                else {
                    resolve(null);
                }
            }, e => {
                if (environment.showServiceLog) {
                    throw 'Request text failed.' + e;
                }
                reject(e);
            });
        });
    }
}