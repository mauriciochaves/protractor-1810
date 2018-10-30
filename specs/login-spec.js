const LoginPage = require('../pages/login-page');


describe('dado que acessei a página login', function () {

    const login_page = new LoginPage();

    beforeEach(function () {
        browser.get(login_page.path);
    });

    it('quando a senha é inválida', function () {
        login_page.with('me@papito.io', '123abc');

        expect(login_page.alert.getText()).toEqual('Senha inválida.');
    });

    it('quando o usuário não está cadastrado', function () {
        login_page.with('404@papito.com', 'abc123');

        expect(login_page.alert.getText()).toEqual('Usuário não cadastrado.');
    });

    it('quando o email é incorreto', function () {
        login_page.with('joao&yahoo.com', 'abcasddd');

        expect(login_page.alert.getText()).toEqual('Email incorreto ou ausente.');
    });

    it('quando o email é branco', function () {
        login_page.with('', '123456');

        expect(login_page.alert.getText()).toEqual('Email incorreto ou ausente.');
    });

    it('quando a senha é branco', function () {
        login_page.with('teste@teste.com.br', '');
        expect(login_page.alert.getText()).toEqual('Senha ausente.');
    });

    it('quando a senha é muito curta', function () {
        login_page.with('teste@teste.com.br', '12345');

        expect(login_page.alert.getText()).toEqual('Senha deve ter no mínimo 6 caracteres.');
    });

});



