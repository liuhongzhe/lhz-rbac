var uuid = require('uuid');

var ct = require('../crud-test.js');

var entity = {
    id: uuid.v1(),
    name: 'atName',
    path: 'atPath'
};
var change = {
    name: 'AtName',
    path: 'AtPath'
};
ct.crudTest('menu', entity, change);