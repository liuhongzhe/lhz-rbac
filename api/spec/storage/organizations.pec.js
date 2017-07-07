var uuid = require('uuid');

var ct = require('../crud-test.js');

var entity = {
    id: uuid.v1(),
    name: 'atName',
    code: 'atCode',
    logo: 'atLogo',
    phone: 'atPhone',
    address: 'atAddress'
};
var change = {
    name: 'AtName',
    code: 'AtCode',
    logo: 'AtLogo',
    phone: 'AtPhone',
    address: 'AtAddress'
};
ct.crudTest('organization', entity, change);