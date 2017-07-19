var uuid = require('uuid');

var ct = require('../crud-test.js');

var entity = {
    id: uuid.v1(),
    logo: 'atLogo',
    logoThumbnail: 'atLogoThumbnail',
    name: 'atName',
    description: 'atDescription'
};
var change = {
    logo: 'AtLogo',
    logoThumbnail: 'AtLogoThumbnail',
    name: 'AtName',
    description: 'AtDescription'
};
ct.crudTest('application', entity, change);