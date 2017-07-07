var uuid = require('uuid');

var ct = require('../crud-test.js');

var entity = {
    id: uuid.v1(),
    name: 'atName'
};
var change = {
    name: 'AtName'
};
ct.crudTest('role', entity, change);