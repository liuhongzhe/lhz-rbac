var uuid = require('uuid');

var ct = require('../crud-test.js');

var entity = {
    id: uuid.v1(),
    name: 'atName',
    key: 'atKey',
    secret: 'atSecret'
};
var change = {
    name: 'AtName',
    key: 'AtKey',
    secret: 'AtSecret'
};
ct.crudTest('application', entity, change);