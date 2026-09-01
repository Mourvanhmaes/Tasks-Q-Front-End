# Task-Q | Front-End

Front-end do **Task-Q**, uma plataforma de gerenciamento de tarefas e organização de equipes desenvolvida com **Angular**.

O projeto tem como objetivo centralizar a criação, acompanhamento e gerenciamento de tarefas, oferecendo uma interface organizada e intuitiva para controle das atividades de usuários e equipes.

## 🚀 Tecnologias

- **Angular**
- **TypeScript**
- **HTML5**
- **SCSS**
- **Bootstrap**
- **Node.js / NPM**
- **Git & GitHub**

## 📋 Funcionalidades

Atualmente, o projeto contempla funcionalidades como:

- Cadastro de tarefas
- Listagem de tarefas
- Edição de tarefas
- Exclusão de tarefas
- Gerenciamento de status das tarefas
- Definição de prioridade
- Gerenciamento de usuários
- Interface responsiva
- Navegação entre componentes

Outras funcionalidades serão adicionadas conforme a evolução do projeto.

## 🧩 Estrutura do projeto

```text
src/
├── app/
│   ├── components/
│   │   ├── tasks/
│   │   └── users/
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
│
├── index.html
├── main.ts
└── styles.scss
```

## ⚙️ Pré-requisitos

Antes de executar o projeto, tenha instalado:

- Node.js
- NPM
- Angular CLI
- Git

Para verificar as instalações:

```bash
node --version
npm --version
ng version
git --version
```

## 📦 Instalação

Clone o repositório:

```bash
git clone https://github.com/Mourvanhmaes/Tasks-Q-Front-End.git
```

Entre na pasta:

```bash
cd Tasks-Q-Front-End
```

Instale as dependências:

```bash
npm install
```

## ▶️ Executando o projeto

Execute:

```bash
ng serve
```

ou:

```bash
npm start
```

Após iniciar o servidor, acesse a aplicação pelo endereço exibido pelo Angular no terminal, normalmente:

```text
http://localhost:4200
```

O Angular atualizará automaticamente a aplicação quando alterações forem realizadas no código.

## 🔗 Back-End

O Task-Q utiliza uma API desenvolvida separadamente com **Java e Spring Boot**.

Principais tecnologias do back-end:

- Java
- Spring Boot
- Spring Data JPA
- API REST
- MySQL

## 🌿 Organização das branches

O desenvolvimento utiliza branches separadas para implementação de funcionalidades.

Exemplos:

```text
develop
feature/tasks-crud
feature/users-crud
```

O objetivo é manter cada funcionalidade isolada durante o desenvolvimento e integrá-la posteriormente à branch principal de desenvolvimento.

## 📝 Padrão de commits

O projeto utiliza mensagens de commit descritivas seguindo um padrão semelhante ao **Conventional Commits**:

```text
feat: adiciona cadastro de tarefas
fix: corrige edição de tarefas
style: ajusta estilização dos cards
refactor: reorganiza lógica do componente
docs: atualiza documentação
```

Principais tipos:

| Tipo | Utilização |
|---|---|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `style` | Alterações visuais/formatação |
| `refactor` | Refatoração sem alterar comportamento |
| `docs` | Documentação |
| `chore` | Configurações e manutenção |

## 🎯 Objetivo acadêmico

O Task-Q está sendo desenvolvido como projeto acadêmico com foco na aplicação prática dos conceitos de **desenvolvimento Full Stack**, utilizando Angular no front-end e Java com Spring Boot no back-end.

O projeto busca aplicar conceitos como:

- Componentização
- CRUD
- Modelagem de dados
- APIs REST
- Integração Front-End e Back-End
- Organização de código
- Controle de versão
- Desenvolvimento colaborativo

## 👥 Equipe

Projeto desenvolvido em equipe como parte das atividades acadêmicas do curso de **Engenharia de Software**.

## 📄 Licença

Consulte o arquivo `LICENSE` presente no repositório para informações sobre a licença do projeto.
