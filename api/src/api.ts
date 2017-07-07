import * as restify from 'restify';

import { config } from './config';
import * as ri from './router/router.index';
import { RbacStorage } from './storage/rbac.storage';

let api = restify.createServer({
    name: 'lhz-rbac-api'
});
api.use(restify.queryParser());
api.use(restify.bodyParser());
console.log('Restify init ok.');
let rbacStorage = new RbacStorage();
rbacStorage.init(config.isRdacForce).then(r => {
    process[config.rbacStorageKey] = rbacStorage;
    console.log('Db init ok.');
    ri.init(api);
    console.log('Router init ok.');
    api.listen(config.port);
    console.log('Linten on port ' + config.port + '.');
}).catch(e => {
    console.log('Db init failed.');
});