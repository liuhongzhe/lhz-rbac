var uuid = require('uuid');

var ct = require('../crud-test.js');

var entity = {
    id: uuid.v1(),
    name: 'atName',
    path: 'atPath',
    rank: 0
};
var change = {
    name: 'AtName',
    path: 'AtPath',
    rank: 1
};
ct.crudTest('menu', entity, change);