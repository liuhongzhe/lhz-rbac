import { User } from './model/user';

export class Cache {
    static get loginUser(): User {
        return <User>JSON.parse(sessionStorage.getItem('login-user'));
    }
    static set loginUser(user: User) {
        sessionStorage.setItem('login-user', JSON.stringify(user));
    }
    static title: string;
    static createFunction: Function;
    static findFunction: Function;
    static searchPlaceholder: string = '请输入查询内容';
}