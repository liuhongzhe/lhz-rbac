import { User } from './model/user';

export class Cache {
    public get loginUser(): User {
        return <User>JSON.parse(sessionStorage.getItem('login-user'));
    }
    public set loginUser(user: User) {
        sessionStorage.setItem('login-user', JSON.stringify(user));
    }
    public title: string;
    public backFunction: Function;
    public createFunction: Function;
    public createFunctionData: any;
    public findFunction: Function;
    public searchPlaceholder: string = '请输入查询内容';
}