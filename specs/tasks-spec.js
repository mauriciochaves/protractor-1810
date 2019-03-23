const LoginPage = require('../pages/login-page');
const TasksPage = require('../pages/tasks-page');

const login_page = new LoginPage();
const tasks_page = new TasksPage();

const tasksDb = require('../lib/tasks-db');
const usersDb = require('../lib/users-db');

describe('quando eu cadastro uma tarefa @temp', () => {

    var newTask = { title: "Estudar mais sobre Nodejs", tags: ['node', 'js', 'v8'] }

    beforeAll(() => {
        tasksDb.deleteByName(newTask.title).then(res => console.log(res));

        login_page.go();
        login_page.with("tasks@teste.com.br", "123456");
        tasks_page.newTaskButton.click();

        tasks_page.addTask(newTask);
    });

    it('então vejo esta tarefa com status em andamento', () => {
        expect(
            tasks_page.getItem(newTask.title).getText()
        ).toContain("Em andamento");
    });

    afterAll(() => {
        login_page.logout();
    })
});


describe('quando tento cadastradar uma tarefa', () => {

    beforeAll(() => {
        login_page.go();
        login_page.with("tasks@teste.com.br", "123456");
        tasks_page.newTaskButton.click();
    });

    it('com nome muito curto', () => {
        tasks_page.addTask({ title: "Estudar" });
        expect(
            tasks_page.alertInfo.getText()
        ).toEqual("10 caracteres é o mínimo permitido.");
    });

    it('com nome em branco', () => {
        tasks_page.addTask({ title: "" });
        expect(
            tasks_page.alertWarn.getText()
        ).toEqual("Nome é obrigatório.");
    });

    afterAll(() => {
        login_page.logout();
    })
})

describe('quando eu apago um tarefa', () => {

    var newTask = { title: "Tarefa para ser removida", tags: ['apagar', 'temp'], createdBy: null }

    beforeAll(async () => {
        await tasksDb.deleteByName(newTask.title).then(res => console.log(res));

        await usersDb.getByEmail("tasks@teste.com.br").then((user) => {
            newTask.createdBy = user._id;
        });

        await tasksDb.addTask(newTask);
        login_page.go();
        login_page.with("tasks@teste.com.br", "123456");
    });

    it('então está tarefa não deve ser exibida na lista', () => {
        tasks_page.getItem(newTask.title);
        // Exemplo com JQuery
        // $('tr:contains("removida")').find('#delete-button').click();

        // Desafio: Implementar a remoção com sucesso
        // E verificar se a task foi removida na lista

        // Entrega: email para: instrutor@ninjahouse.com.br com assunto: Protractor 1810 - Desafio
        // Por favor mandar no formato ZIP sem a pasta Node Modules
        // Se quiser mandar via git, basta informar o link no corpo do email

    });
});


