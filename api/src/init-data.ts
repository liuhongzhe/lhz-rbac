import { RbacStorage } from './storage/rbac.storage';

export let init = function (rbacStorage: RbacStorage) {
    return new Promise<boolean>((resolve, reject) => {
        rbacStorage.adminModel.destroy({ where: {} }).then(count => {
            console.log('Destroy admin ok.Count:' + count);
            rbacStorage.adminModel.create({
                firstName: 'Hongzhe',
                lastName: 'Liu',
                username: 'admin',
                password: '123'
            }).then(user => {
                console.log('Create admin ok.Id:' + user.id);
                rbacStorage.menuModel.destroy({ where: {} }).then(count => {
                    console.log('Destroy menu ok.Count:' + count);
                    let menus = [];
                    menus.push({
                        icon: 'home',
                        name: '首页',
                        path: 'dashboard',
                        rank: 0
                    });
                    menus.push({
                        icon: 'important_devices',
                        name: '应用管理',
                        path: 'application-management',
                        rank: 10
                    });
                    menus.push({
                        icon: 'language',
                        name: '行政区划管理',
                        path: 'region-management',
                        rank: 20
                    });
                    menus.push({
                        icon: 'domain',
                        name: '机构管理',
                        path: 'organization-management',
                        rank: 30
                    });
                    menus.push({
                        icon: 'person',
                        name: '用户管理',
                        path: 'user-management',
                        rank: 40
                    });
                    menus.push({
                        icon: 'style',
                        name: '角色管理',
                        path: 'role-management',
                        rank: 50
                    });
                    menus.push({
                        icon: 'person_outline',
                        name: '管理员管理',
                        path: 'admin-management',
                        rank: 910
                    });
                    rbacStorage.menuModel.bulkCreate(menus).then(menus => {
                        console.log('Create menu ok.Count:' + menus.length);
                        resolve();
                    }).catch(e => {
                        console.log('Create menu failed.' + e);
                        reject(e);
                    });
                }).catch(e => {
                    console.log('Destroy menu failed.' + e);
                    reject(e);
                });
            }).catch(e => {
                console.log('Create admin failed.' + e);
                reject(e);
            });
        }).catch(e => {
            console.log('Destroy user failed.' + e);
            reject(e);
        });
    });
}