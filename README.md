# Crud Básico com Laravel e react.js

Aplicação que utiliza Axios no Framework React.js no FrontEnd e Laravel 8 como Framework no BackEnd.

## Passo 1- Instalação do Projeto laravel

> Abrindo o terminal do seu computador utilizamos esse comando para criar um novo projeto em laravel.
```bash
   composer create-project --prefer-dist laravel/laravel laravel-react
```
### Passo 2- Criando Database para o projeto

Após a instalação do projeto, abra o seu banco Mysql e crie um Database para ser adcionado em seu projeto. Utilizando o comando abaixo:

Create database laravel;

### Passo 3- Adicionando Detalhes Ao arquivo .end

Após criado o database, abra o arquivo .env localizado em seu projeto e altere os seguintes campos
de acordo com o database desenvolvido: DB_DATABASE:<NOME DO BANCO>, DB_USERNAME:<NOME DE USUARIO>,
DB_PASSWORD:<SENHA DO SEU BANCO>.

### Passo 4- Criação de Migration, Model e Controller

Utilize o comando abaixo, para criação do Model, Controller e Migration que seram essenciais
para o seu projeto.

php artisan make:model Laravel -mcr

### Passo 5- Alterando a Migration do banco de dados

Após a criação de sua migration, acesse a seguinte pasta em seu projeto para alterar os dados
que seram enviados ao banco de dados: app/database/migration. Alterando assim como estiver no
seu esquema de projeto.

Depois de alterada sua migration digite o comando abaixo em seu terminal para criação da tabela
em seu banco de dados:

php artisan migrate

### Passo 6- Atualização de Model do projeto

> Acesse a seguinte página do projeto para fazer alteração no Model: app/Models.
E fassa a seguinte alteração como abaixo, seguindo os dados cadastrados em sua
tabela:
```php
    use HasFactory;

    protected $fillable = ['name', 'email', 'phone' , 'checkbox'];
```

### Passo 7- Alteração no Controller do projeto

Acesse a seguinte página do projeto para fazer alteração no Controller: app/Http/Controller.
E fassa a seguinte alteração no Index, Store, Show, Update e Delete, seguindo os dados em 
sua tabela.

   ### Passo 8- Definindo Rotas na api.php do projeto

    > Acesse a seguinte página do projeto para criação de rotas e comunicação dentro do
    seu sistema: app/routes.
    Fassa a seguinte alteração como mostrado abaixo:
```php
    use App\Http\Controllers\RegistrationController;
    Route::resource('registrations',RegistrationController::class);
```
    Para confirmar as alterações anteriores digite o seguinte comando:

    php artisan storage:link

### Passo 9- Criação da aplicação Frontend para consulmir a API do Laravel

Digite em seu terminal os seguintes comandos para criação da aplicação:

1. npm install -g create-react-app
2. create-react-app crud-react

Após instalado, acesse a sua partição cd crud-react e e digite os seguintes comandos
para ajudar na estilização da aplicação:

1. npm install axios react-bootstrap bootstrap
2. npm install react-router-dom sweetalert2 --save

### Passo 10- Criação de Components no FrontEnd

Após entrar na aplicação Frontend, acesse a pasta raiz src e dentro dela crie uma pasta
chamada: components. Para deixar sua aplicação mais organizada, dentro da pasta components
crie a pasta registration "Nome de sua preferência, de acordo com o projeto", dentro da 
pasta falada anteriormente crie os seguintes arquivos abaixo:

1. create.component.js
2. edit.component.js
3. list.component.js

e fassa suas edições de criação, edição e listagem necessarias para cada uma funcionar.

### Passo 11- Atualização da pasta App.js no FrontEnd

Acesse a pasta src/App.js e fassa as seguintes alterações como mostrado abaixo:
De acordo com as informações constadas em seu projeto e nos arquivos do Passo 10.

Finalizando assim seu Crud com Laravel e Reactjs.

Para acessar em seu navegador o sistema, abra 2 terminais e acesse seus servidores 
como mostrado nos comandos abaixo:

1. Backend: php artisan serve
2. Frontend: npm run start