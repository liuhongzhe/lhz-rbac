import * as restify from 'restify';

import { config } from './config';
import * as ri from './router/router.index';
import { RbacStorage } from './storage/rbac.storage';
import * as id from './init-data';

let api = restify.createServer({
    name: 'lhz-rbac-api'
});
api.use(restify.queryParser());
api.use(restify.bodyParser());
api.use(restify.CORS());
console.log('Restify init ok.');
let rbacStorage = new RbacStorage();
rbacStorage.init(config.isRdacForce).then(r => {
    process[config.rbacStorageKey] = rbacStorage;
    console.log('Db init ok.');
    let initRoutrAndListen = () => {
        ri.init(api);
        console.log('Router init ok.');
        api.listen(config.port);
        console.log('Linten on port ' + config.port + '.');
    };
    if (config.isInitData === true) {
        id.init(rbacStorage).then(r => {
            initRoutrAndListen();
        }).catch(e => {
            console.log('Init data failed.' + e);
        });
    }
    else {
        initRoutrAndListen();
    }

}).catch(e => {
    console.log('Db init failed.' + e);
});