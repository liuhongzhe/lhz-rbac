export const config = {
    port: 11001,
    rbacDatabase: 'lhz-rbac',
    rbacUsername: 'rbac',
    rbasPassword: 'rbac',
    rbacOptions: {
        dialect: 'mysql',
        host: 'localhost',
        port: 3306
    },
    isRdacForce: true,
    isShowRdacInitLog: false,
    rbacStorageKey: 'rbacs'
}