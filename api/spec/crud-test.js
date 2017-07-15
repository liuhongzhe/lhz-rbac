"use strict";

var request = require('request');

var config = require('../dist/config').config;

module.exports = function () {
    var curdTest = function (entityName, entity, change, excludes) {
        describe(entityName + ' crud test.', () => {
            var urlRoot = 'http://localhost:' + config.port;
            var itemCount = 0;
            it('Find all and count.', (done) => {
                var url = urlRoot + '/' + entityName;
                request.get(url, (error, response, body) => {
                    expect(response.statusCode).toBe(200);
                    var items = JSON.parse(body);
                    itemCount = items.rows.length;
                    done();
                });
            });
            it('Find by id.Not found.', (done) => {
                var url = urlRoot + '/' + entityName + '/' + entity.id;
                request.get(url, (error, response, body) => {
                    expect(response.statusCode).toBe(200);
                    expect(body).toBe('');
                    done();
                });
            });
            it('Create.', (done) => {
                var url = urlRoot + '/' + entityName;
                request.post(url, {
                    json: entity
                }, (error, response, body) => {
                    expect(response.statusCode).toBe(200);
                    expect(body).toBe(entity.id);
                    done();
                });
            });
            it('Find by id.Found.', (done) => {
                var url = urlRoot + '/' + entityName + '/' + entity.id;
                request.get(url, {
                    method: ''
                }, (error, response, body) => {
                    expect(response.statusCode).toBe(200);
                    var queryItem = JSON.parse(body);
                    for (var p in entity) {
                        var exclude = false;
                        if (excludes) {
                            for (var i = 0; i < excludes.length; i++) {
                                if (excludes[i] === p) {
                                    exclude = true;
                                    break;
                                }
                            }
                        }
                        if (!exclude) {
                            expect(queryItem[p]).toBe(entity[p]);
                        }
                    }
                    done();
                });
            });
            it('Find all and check count+1.', (done) => {
                var url = urlRoot + '/' + entityName;
                request.get(url, (error, response, body) => {
                    expect(response.statusCode).toBe(200);
                    var items = JSON.parse(body);
                    expect(items.rows.length).toBe(itemCount + 1);
                    done();
                });
            });
            it('Update.', (done) => {
                for (var property in change) {
                    entity[property] = change[property];
                }
                var url = urlRoot + '/' + entityName + '/' + entity.id;
                request.put(url, {
                    json: entity
                }, (error, response, body) => {
                    expect(response.statusCode).toBe(200);
                    expect(body).toBeUndefined();
                    done();
                });
            });
            it('Find by id.Found.', (done) => {
                var url = urlRoot + '/' + entityName + '/' + entity.id;
                request.get(url, {
                    method: ''
                }, (error, response, body) => {
                    expect(response.statusCode).toBe(200);
                    var queryItem = JSON.parse(body);
                    for (var p in entity) {
                        var exclude = false;
                        if (excludes) {
                            for (var i = 0; i < excludes.length; i++) {
                                if (excludes[i] === p) {
                                    exclude = true;
                                    break;
                                }
                            }
                        }
                        if (!exclude) {
                            expect(queryItem[p]).toBe(entity[p]);
                        }
                    }
                    done();
                });
            });
            it('Find all and check count+1.', (done) => {
                var url = urlRoot + '/' + entityName;
                request.get(url, (error, response, body) => {
                    expect(response.statusCode).toBe(200);
                    var items = JSON.parse(body);
                    expect(items.rows.length).toBe(itemCount + 1);
                    done();
                });
            });
            it('Delete by id.', (done) => {
                var url = urlRoot + '/' + entityName + '/' + entity.id;
                request.delete(url, (error, response, body) => {
                    expect(response.statusCode).toBe(200);
                    done();
                });
            });
            it('Find by id.Not found.', (done) => {
                var url = urlRoot + '/' + entityName + '/' + entity.id;
                request.get(url, (error, response, body) => {
                    expect(response.statusCode).toBe(200);
                    expect(body).toBe('');
                    done();
                });
            });
            it('Find all and check count.', (done) => {
                var url = urlRoot + '/' + entityName;
                request.get(url, (error, response, body) => {
                    expect(response.statusCode).toBe(200);
                    var items = JSON.parse(body);
                    expect(items.rows.length).toBe(itemCount);
                    done();
                });
            });
        });
    };
    return {
        crudTest: curdTest
    };
}()