var uuid = require('uuid');

var ct = require('../crud-test.js');

var entity = {
    id: uuid.v1(),
    firstName: 'atFirstName',
    lastName: 'atLastName',
    username: 'atUsername',
    password: 'atPassword',
    photo: 'atPhoto',
    phone: 'atPhone',
    email: 'atEmail'
};
var change = {
    firstName: 'AtFirstName',
    lastName: 'AtLastName',
    username: 'AtUsername',
    password: 'AtPassword',
    photo: 'AtPhoto',
    phone: 'AtPhone',
    email: 'AtEmail'
};
ct.crudTest('admin', entity, change, ['password']);