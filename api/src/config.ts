export const config = {
    port: 11001,
    rbacDatabase: 'lhz-rbac',
    rbacUsername: 'rbac',
    rbasPassword: 'rbac',
    rbacOptions: {
        dialect: 'postgres',
        host: 'localhost',
        port: 5432
    },
    isRdacForce: true,
    isShowRdacInitLog: false,
    isInitData: true,
    rbacStorageKey: 'rbacs',
    assetsDirectoryName: 'assets',
    logoDirectoryName: 'logo',
}