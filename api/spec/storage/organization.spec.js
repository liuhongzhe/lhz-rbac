var uuid = require('uuid');

var ct = require('../crud-test.js');

var entity = {
    id: uuid.v1(),
    logo: 'atLogo',
    logoThumbnail: 'atLogoThumbnail',
    name: 'atName',
    phone: 'atPhone',
    address: 'atAddress'
};
var change = {
    logo: 'AtLogo',
    logoThumbnail: 'AtLogoThumbnail',
    name: 'AtName',
    phone: 'AtPhone',
    address: 'AtAddress'
};
ct.crudTest('organization', entity, change);