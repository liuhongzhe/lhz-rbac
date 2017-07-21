var uuid = require('uuid');

var ct = require('../crud-test.js');

var entity = {
    id: uuid.v1(),
    logo: 'atLogo',
    logoThumbnail: 'atLogoThumbnail',
    firstName: 'atFirstName',
    lastName: 'atLastName',
    username: 'atUsername',
    password: 'atPassword',
    phone: 'atPhone',
    email: 'atEmail'
};
var change = {
    logo: 'AtLogo',
    logoThumbnail: 'AtLogoThumbnail',
    firstName: 'AtFirstName',
    lastName: 'AtLastName',
    username: 'AtUsername',
    password: 'AtPassword',
    phone: 'AtPhone',
    email: 'AtEmail'
};
ct.crudTest('admin', entity, change, ['password']);