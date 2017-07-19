import { RbacAppPage } from './app.po';

describe('rbac-app App', () => {
    let page: RbacAppPage;

    beforeEach(() => {
        page = new RbacAppPage();
    });

    it('should display welcome message', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('Welcome to app!!');
    });
});