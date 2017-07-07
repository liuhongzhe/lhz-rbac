"use strict";

var request = require('request');

var config = require('../dist/config').config;

module.exports = function () {
    var curdTest = function (entityName, entity, change) {
        describe(entityName + ' crud test.', () => {
            var urlRoot = 'http://localhost:' + config.port;
            it("Find by id.Not found.", function (done) {
                var url = urlRoot + '/' + entityName + '/' + entity.id;
                request.get(url, (error, response, body) => {
                    expect(response.statusCode).toBe(200);
                    expect(body).toBe('');
                    done();
                });
            });
            it("Create.", function (done) {
                var url = urlRoot + '/' + entityName;
                request.post(url, {
                    json: entity
                }, (error, response, body) => {
                    expect(response.statusCode).toBe(200);
                    expect(body).toBe(entity.id);
                    done();
                });
            });
            it("Find by id.Found.", function (done) {
                var url = urlRoot + '/' + entityName + '/' + entity.id;
                request.get(url, {
                    method: ''
                }, (error, response, body) => {
                    expect(response.statusCode).toBe(200);
                    var queryItem = JSON.parse(body);
                    for (var p in entity) {
                        expect(queryItem[p]).toBe(entity[p]);
                    }
                    done();
                });
            });
            it("Update.", function (done) {
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
            it("Find by id.Found.", function (done) {
                var url = urlRoot + '/' + entityName + '/' + entity.id;
                request.get(url, {
                    method: ''
                }, (error, response, body) => {
                    expect(response.statusCode).toBe(200);
                    var queryItem = JSON.parse(body);
                    for (var p in entity) {
                        expect(queryItem[p]).toBe(entity[p]);
                    }
                    done();
                });
            });
            it("Delete by id.", function (done) {
                var url = urlRoot + '/' + entityName + '/' + entity.id;
                request.delete(url, (error, response, body) => {
                    expect(response.statusCode).toBe(200);
                    done();
                });
            });
            it("Find by id.Not found.", function (done) {
                var url = urlRoot + '/' + entityName + '/' + entity.id;
                request.get(url, (error, response, body) => {
                    expect(response.statusCode).toBe(200);
                    expect(body).toBe('');
                    done();
                });
            });
        });
    };
    return {
        crudTest: curdTest
    };
}()