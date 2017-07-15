import { RbacStorage } from './storage/rbac.storage';

export let init = function (rbacStorage: RbacStorage) {
    return new Promise<boolean>(r => {
        rbacStorage.userModel.destroy({
            where: {}
        }).then(count => {
            console.log('Destroy user data.Count:' + count);
            rbacStorage.userModel.create({
                firstName: 'Hongzhe',
                lastName: 'Liu',
                username: 'admin',
                password: '123'
            }).then(user => {
                console.log('Create admin ok.Id:' + user.id);
                r();
            });
        });
    });
}