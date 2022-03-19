# api-graphql-crud-com-subscriptions
Projeto de GraphQL em Node JS e com o Mongo DB. Ele é a continuação do projeto **api-graphql-com-banco-de-dados**, URL: https://github.com/samuelffn/api-graphql-crud-com-subscriptions.git.  
Este projeto tem uma implementação com subscriptions. Subscriptions é a forma de temos de trabalhar com websocket/real time dentro do GraphQL. Toda vez que um usuário for registrado na aplicação uma notificação será enviada para quem estiver inscrito.  
Temos um exemplo na AWS https://docs.aws.amazon.com/appsync/latest/devguide/aws-appsync-real-time-data.html   

## Para usar a API  
1) Instale as dependências do projeto: **npm i** ou **yarn install** 
3) **npm run start** ou **yarn start** 
  
## Dependências utilizadas  
  
### Babel
Como precisaremos da utilização do ES6 será necessária a instalação do Babel  
*Instalação:*  
**npm i @babel/core @babel/cli @babel/preset-env @babel/node -D** ou **yarn add @babel/core @babel/cli @babel/preset-env @babel/node -D**  
*Utilização:*  
Será necessário criar um arquivo **.babelrc** na raíz do projeto com o seguinte conteúdo:  
```
{
    "presets": ["@babel/preset-env"]
}
```  
  
### Apolo Server e GraphQL  
Apolo Server e GraphQL: **npm i apollo-server graphql** ou **yarn add apollo-server graphql**  

### merge-graphql-schemas
Para trabalhar com vários Schemas do GraphQL: **npm i merge-graphql-schemas** ou **yarn add merge-graphql-schemas**

### Nodemon  
Dependência para ser utilizada apenas no ambiente de *desenvolvimento*.  
Ela faz com que ao salvar alguma alteração o servidor faça a atualização semprecisar parar e executar novamente.  
- Instalação:  
**npm install -D nodemon** ou  **yarn add nodemon -D**  

- Utilização:  
1) Acessa o package.json  
2) Em scripts, cria uma nova propriedade informando o local onde está o server, no caso está em **src**  
  2.1- Criando o comando: **"start": "nodemon src/index.js",** ou **"start": "npx nodemon src/index.js",**  
  2.2- O nome **dev** pode ser o que você quiser. Ex.: **"dev": "nodemon src/index.js",**   
3) No terminal executa a aplicação usando o comando: **npm run dev**  
Obs.: O npm run serve para executar os comandos que estão em script  
  
### Mogoose  
**npm install mongoose**   
O mongoose é um ORM (Object Relacional Mapping) de bancos não relacionais.  
O ORM vai encapsular a lógica das operações do banco de dados através do código. Sendo assim não será utilizada a linguagem do banco de dados e utilizará o JavaScript para realizar operações no banco.    
Ao executar a aplicação pela primeira vez ela vai criar o banco de dados que foi definido em **src/startServer.  js** com o nome **graphql-user-message** dado em:  
```
mongoose.connect('mongodb://localhost:27017/graphql-user-message', {
    useNewUrlParser: true,
    userUnifiedTopology: true,
});  
```
  
## Ferramentas utilizadas para ajudar no desenvolvimento  
  
### Baixando e criando a imagem do mongodb utilizando o Docker  
1) Para instalação do docker: https://www.docker.com/  
2) Verifica a versão do Docker instalado na máquina:  
    Help: **docker --help**  
    Mostrar só a versão: **docker --version**  
    Mostra todos os detalhes: **docker version**  
3) **docker pull mongo**  
    docker pull: comando utilizado para baixar a imagem do mongodb. Se der erro de permissão use: **sudo**  
4) **docker run --name mongodb -p 27017:27017 -d mongo**  
    Se der erro de permissão use: **sudo**  
    --name: Será o nome do container dentro do meu sistema.  
    -p:  Será a porta para redirecionamento.  
    27017:27017: É um exemplo de redirecionamento das portas. Toda vez que acessar a porta 27017 da ninha máquina, ele redirecionará para a porta 27017 do mongodb que está instalado dentro desse container.  
    -d: mongo: Preciso informar qual imagem vou utilizar para criar esse container. Utilizamos a imagem que baixamos no passo 3, mongo.  
5) Listar as imagens que estão ativas no momento: **docker ps**  
    Comando utilizado para listar as imagens do docker e todos os detakhes da mesma.  
6) Para testar o funcionamento do mongodb:  
    6.1- Abre o navegador e digita: **localhost:27017**  
    6.2- Se tudo estiver bem, retornará algo do tipo: **Its looks like you are trying to access MongoDB over HTTP  on the native driver port**  
7) Quando precisar reiniciar a máquina será necessário levantar o Docker novamente:  
    7.1- Listar todas as imagens: **docker ps -a**  
    7.2- **docker start noma_da_imagem**  

### Robo 3T  
É um visualizador para dados do MongDB  
**Instalação**  
1) Link: https://robomongo.org/download e escolhe a opção Robo 3T (formerly Robomongo)  
2) Depois de fazer o download acessa a pasta **/home/user/Downloads/robo3t-1.3.1-linux-x86_64-7419c406/bin**  
3) Executa o **robo3t**  

**Cadastrando um banco**  
1) Clica em MongoDB Connections, em seguida em Create  
    Em Type: Direct Connection  
    Em Name: O nome que você quizer (Coloquei MongoDB-Docker)  
    Em Address: Localhost  
    Em porta: 27017 (é a default, que utilizamos na criação do container)  
2) Clica em Test pra testar a conexão  
3) Clica em Save  
4) De volta à janela do MongoDB Connections, escolhe a conesão criada e depois clica em Connect  
5) Observe que ainda não temos tabelas criadas, pois nossa API Node irá criá-las.  

## Testando a API  

**Iniciando a API**
1) Executando no terminal: **npm run start** ou **yarn start**  
2) Abra o navegador e acesse: **http://localhost:4000**  
3) Observe que o navegador que o **Playground** já é carregado (Ele é como um Insomnia ou Postman da vida). No Playground faremos os nossos testes.  
4) Na área abaixo da URL digite as queries que segem como exemplo abaixo.  
  
### Exemplos para requisições no Playground  

**User - Mutation**  
*createUser*  
```
mutation {
  createUser (data: {
    firstName: "Samuel"
    lastName: "Neto"
    email: "samuel.neto@mail.com"
    active: true
  }) {
   firstName
  }
}
```

*deleteUser*  
```
mutation {
  deleteUser(id: "5f07ae22df97bf3ffac4763c")
}
```

*updateUser*  
```
mutation {
  updateUser(id: "5f07af75df97bf3ffac4763d", data: {
    firstName: "Samuel"
    lastName: "Franca"
    email: "samuel.franca@mail.com"
    active: true
  }){
    _id firstName lastName email active
  }
}
```

**User - Query**  
*users*  
```
query {
  users {
    _id firstName lastName fullName email active
  }
}
```

*user*  
```
query{
  user(id: "5f07af75df97bf3ffac4763d") {
    _id firstName lastName fullName email active 
  }
}
```

**Message - Mutation**  
*createMessage*  
```
mutation {
  createMessage(data: {
    title: "Exemplo"
    content: "Exemplo de message"
    author: "5f07af75df97bf3ffac4763d"
  }){
    title content
  }
}
```

**Message - Query**  
messages  
```
query{
  messages {
    title
    content
    author {
      firstName
      fullName
    }
  }
}
```

**Subscriptions**  
Primeiro execute uma chamada de Subscription. Podem ser todas ao mesmo tempo, mas separadas, cada uma na sua
aba. Em seguida, também em outras abas execte as mutations de Create, Update e Delete (Cada uma na sua aba).  
  
*userAdded*  
```  
subscription {
  userAdded {
     _id firstName lastName fullName email active
  }
}
```  
  
*userUpdate*  
```  
subscription {
  userUpdate {
     _id firstName lastName fullName email active
  }
}
```  
  
*userDeleted*  
```  
subscription {
  userDeleted
}
```  
  
A atualização na subcription acorre simultânea com a ação das Mutations.  
Pra entender melhor o exemplo você pode utilizar algumas mutatios, como create, update e delete e à medida que for utilizando acompanhar o report que é feito às subscribes que estão escutando.  
  
