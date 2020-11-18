# GoBarber

## :construction: Área em construção :construction:

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/AlexsandroBezerra/gobarber-backend?color=%23FF9000">

  <a href="https://www.linkedin.com/in/alexsandrobezerra/" target="_blank" rel="noopener noreferrer">
    <img alt="Made by" src="https://img.shields.io/badge/made%20by-Alexsandro%20G%20Bezerra-%23FF9000">
  </a>

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/AlexsandroBezerra/gobarber-backend?color=%23FF9000">

  <a href="https://github.com/AlexsandroBezerra/gobarber-backend/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/AlexsandroBezerra/gobarber-backend?color=%23FF9000">
  </a>

  <img alt="GitHub" src="https://img.shields.io/github/license/AlexsandroBezerra/gobarber-backend?color=%23FF9000">
</p>

<p id="insomnia-button" align="center">
  <a href="https://insomnia.rest/run/?label=GoBarber-API&uri=https%3A%2F%2Fraw.githubusercontent.com%2FAlexsandroBezerra%2Fgobarber-backend%2Fmain%2FInsomnia.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

## Sobre o projeto

Essa API prover tudo que precisa para organizar compromissos entre barbeiros e clientes.

O clientes podem escolher o melhor tempo disponível para eles.

Os provedores de serviço podem ver todos os compromissos marcados, gerenciar o time, e ver se um cliente cancelou o agendamento.

## Tecnologias

Tecnologias usadas para desenvolver esse projeto:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Multer](https://github.com/expressjs/multer)
- [TypeORM](https://typeorm.io/#/)
- [JWT-token](https://jwt.io/)
- [uuid v4](https://github.com/thenativeweb/uuidv4/)
- [PostgreSQL](https://www.postgresql.org/)
- [Date-fns](https://date-fns.org/)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)

## Começando

Importe o arquivo `Insomnia.json` no App do Insomnia ou clique no botão [Run in Insomnia](#insomnia-button)

## Requisitos

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)
- Uma instancia do [PostgreSQL](https://www.postgresql.org/)

### Faça um clone do projeto e acesse a pasta

```bash
$ git clone https://github.com/AlexsandroBezerra/gobarber-backend.git
$ cd gobarber-backend
```

**Siga os passos a seguir**

```bash
# Instale as dependências
$ yarn

# Crie uma instancia do Postgres com o docker
$ docker run --name gobarber-postgres -e POSTGRES_USER=docker \
              -e POSTGRES_DB=gobarber -e POSTGRES_PASSWORD=docker \
              -p 5432:5432 -d postgres

# Abra o arquivo ormconfig.json e configure a conexão com o banco
$ code ormconfig.json

# Após a conexão configurada. Rode as "migrations"
$ yarn typeorm migration:run

# Finalmente, rode a API
$ yarn dev:server
```
## 🤔 Como contribuir?

1. **Faça um fork desse repositório**

2. **Siga os passos abaixo**

```bash
# Faça um clone do seu fork e entre na pasta
$ git clone your-fork-url && cd gobarber-backend

# Crie uma nova branch com a sua nova feature
$ git checkout -b my-feature

# Faça um commit com suas mudanças
$ git commit -m 'feat: My new feature'

# Envie o código para sua branch remota
$ git push origin my-feature
```

Depois do Pull Request ser aceito, você pode deletar a sua branch.

## 📝 License

Esse projeto está sobre a licensa MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Feito com 💜 &nbsp;por Alexsandro G Bezerra 👋 &nbsp;[Veja meu Linkedin](https://www.linkedin.com/in/AlexsandroBezerra)
