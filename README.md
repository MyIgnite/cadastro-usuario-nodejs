Finalizar a documentação ainda hoje



# CRUD-nodejs
Desafio: Essa será uma aplicação de listagem e cadastro de usuários. Para que a listagem de usuários funcione, o usuário que solicita a listagem deve ser um admin.

Abrir projeto com VSCode Online:

https://github1s.com/MyIgnite/cadastro-usuario-nodejs

Clone o projeto, navegue até a raiz do projeto e execute:</br>

`yarn` </br>
`yarn dev` </br>

Execute o comando para testar a aplicação </br>
`yarn test` </br> </br>

Documentação Swagger </br>
http://localhost:3333/api-docs/

</br>

- [x] não deve ser capaz de criar novos usuários quando o e-mail já estiver em uso
- [x] deve ser capaz de transformar um usuário em administrador
- [x] não deve ser capaz de transformar um usuário não existente como administrador
- [x] deve ser capaz de obter o perfil do usuário por ID
- [x] não deve ser capaz de mostrar o perfil de um usuário não existente
- [x] deve ser capaz de listar todos os usuários
- [x] não deve ser capaz de um usuário não administrador obter a lista de todos os usuários
- [x] não deve ser capaz de um usuário não administrador obter a lista de todos os usuários
- [x] não deve ser capaz de um usuário não existente obter a lista de todos os usuários
- [x] deve ser capaz de listar todos os usuários
- [x] não deve ser capaz de um usuário não administrador obter a lista de todos os usuários
- [x] não deve ser capaz de um usuário não existente obter a lista de todos os usuários
- [x] deve ser capaz de criar novos usuários
- [x] não deve ser capaz de criar novos usuários quando o e-mail já estiver em uso
- [x] deve ser capaz de transformar um usuário em administrador (2 ms)
- [x] não deve ser capaz de transformar um usuário não existente como administrador
- [x] deve ser capaz de criar novos usuários
- [x] deve ser capaz de listar todos os usuários
- [x] deve ser capaz de encontrar o usuário por ID
- [x] deve ser capaz de encontrar o usuário pelo endereço de e-mail
- [x] deve ser capaz de transformar um usuário em administrador
- [x] deve ser capaz de obter o perfil do usuário por ID
- [x] não deve ser capaz de mostrar o perfil de um usuário não existente
- [x] deve ser capaz de criar um usuário com todos os adereços 

</br>

# Implementação

## model 

</br>

A classe `User` representa um objeto usuário com várias propriedades, sendo `id` e `admin` opcionais. </br>
A cada instância o `constructor` verificar se a propriedade `id` e `admin` estão preenchidas, caso contrário, ele as cria automaticamente. Por fim, exporta `User` para ser usado em outros arquivos.

</br>

User.ts
```js
import { v4 as uuidV4 } from "uuid";

class User {
  id?: string;

  name: string;

  admin?: boolean;

  email: string;

  created_at: Date;

  updated_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuidV4();
    }

    if(!this.admin) {
      this.admin = false;
    }
  }
}

export { User };
```

## Repositories

</br>

A interface `IUsersRepository` define uma estrutura de métodos que qualquer classe que a implemente deve possuir. ICreateUserDTO é nosso objeto de transferência de dados entre camadas. Por fim, as interfaces são exportadas para ser usadas em outros arquivos.

</br>

IUserRepository.ts
```js
import { User } from "../model/User";

interface ICreateUserDTO {
  name: string;
  email: string;
}

interface IUsersRepository {
  create({ name, email }: ICreateUserDTO): User;
  findById(id: string): User | undefined;
  findByEmail(email: string): User | undefined;
  turnAdmin(user: User): User;
  list(): User[];
}

export { IUsersRepository, ICreateUserDTO };
```

</br>

A classe `UsersRepository` implementa `IUsersRepository` e criar um ponto em memória para que os dados sejam salvos. Para isso foi usado a Pattern Singleton.

</br>

UsersRepository.ts
```js
import { User } from "../../model/User";
import { ICreateUserDTO, IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date()
    })

    this.users.push(user);
    return user;
  }

  findById(id: string): User | undefined {
    const user = this.users.find(user => user.id === id);
    return user;
  }

  findByEmail(email: string): User | undefined {
    const user = this.users.find(user => user.email === email);
    return user;
  }

  turnAdmin(receivedUser: User): User {
    const user = this.findById(receivedUser.id);

    Object.assign(user, {
      admin: true,
      updated_at: new Date()
    });

    return user;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
```

## UseCases

</br>

As pastas de `useCase` seguem uma estrutura semelhante, onde os arquivos ...Controller.ts são responsáveis por lidar com as requisições do usuário, processando-as e retornando uma resposta apropriada. Por outro lado, os arquivos ...UseCase.ts são responsáveis por gerenciar as regras de negócios do sistema, processando dados e realizando operações complexas. Por fim, o arquivo index.ts importa as classes necessárias de cada useCase, instanciando-as na ordem correta e exportando uma variável `...Controller` para ser usada na rota.








































