var uuid = require('uuid');

var ct = require('../crud-test.js');

var entity = {
    id: uuid.v1(),
    name: 'atName',
    code: 'atCode'
};
var change = {
    name: 'AtName',
    code: 'AtCode'
};
ct.crudTest('region', entity, change);