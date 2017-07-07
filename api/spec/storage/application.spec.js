var uuid = require('uuid');

var ct = require('../crud-test.js');

var entity = {
    id: uuid.v1(),
    name: 'atName',
    token: 'atToken'
};
var change = {
    name: 'AtName',
    token: 'AtToken'
};
ct.crudTest('application', entity, change);