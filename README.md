<h1 align="center">
	<img alt="GoStack" src=".github/assets/logo.svg" width="200px" />
</h1>


<h3 align="center">
  Express Application for GoBarber project
</h3>

<p align="center">The best way to schedule your service!</p>


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

<p align="center">
  <a href="#about-the-project">About the project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#getting-started">Getting started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#how-to-contribute">How to contribute</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#license">License</a>
</p>


<p id="insomnia-button" align="center">
  <a href="https://insomnia.rest/run/?label=GoBarber-API&uri=https%3A%2F%2Fraw.githubusercontent.com%2FAlexsandroBezerra%2Fgobarber-backend%2Fmain%2FInsomnia.json" target="_blank" rel="noopener noreferrer"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

## :construction: Under development :construction:

## 💁 About the project

This api provides everything needed to organize appointments between the barbers and customers.

Customers can choose the best time available to them.

Providers can see all their appointments, manage the times, also see if one client canceled the schedule.

### :link: Useful links

To see the **GoBarber web client**, [click here](https://github.com/AlexsandroBezerra/gobarber-web) <br />
To see the **GoBarber mobile client**, [click here](https://github.com/AlexsandroBezerra/gobarber-mobile)

## Technologies

Technologies that I used to develop this web client:

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

## 💻 Getting started

Import the `Insomnia.json` on Insomnia App or click on [Run in Insomnia](#insomnia-button) button

### Requirements

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://classic.yarnpkg.com/) or [npm](https://www.npmjs.com/)
- One instance of [PostgreSQL](https://www.postgresql.org/)

> Obs.: I recommend use docker

**Clone the project and access the folder**

```bash
$ git clone https://github.com/AlexsandroBezerra/gobarber-backend.git && cd gobarber-backend
```

**Follow the steps below**

```bash
# Install the dependencies
$ yarn

# Make a copy of '.env.example' to '.env'
# and set with YOUR environment variables.
# The aws variables do not need to be filled for dev environment
$ cp .env.example .env

# Create the instance of postgreSQL using docker
$ docker run --name gobarber-postgres -e POSTGRES_USER=docker \
              -e POSTGRES_DB=gobarber -e POSTGRES_PASSWORD=docker \
              -p 5432:5432 -d postgres

# Create the instance of mongoDB using docker
$ docker run --name gobarber-mongodb -p 27017:27017 -d -t mongo

# Create the instance of redis using docker
$ docker run --name gobarber-redis -p 6379:6379 -d -t redis:alpine

# Once the services are running, run the migrations
$ yarn typeorm migration:run

# To finish, run the api service
$ yarn dev:server

# Well done, project is started!
```

## 🤔 How to contribute?
**Make a fork of this repository**

```bash
# Fork using GitHub official command line
# If you don't have the GitHub CLI, use the web site to do that.

$ gh repo fork AlexsandroBezerra/gobarber-backend
```

**Follow the steps below**

```bash
# Clone your fork
$ git clone your-fork-url && cd gobarber-api

# Create a branch with your feature
$ git checkout -b my-feature

# Make the commit with your changes
$ git commit -m 'feat: My new feature'

# Send the code to your remote branch
$ git push origin my-feature
```

After your pull request is merged, you can delete your branch


## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with :purple_heart: by Alexsandro G Bezerra :wave: &nbsp;[See my Linkedin](https://www.linkedin.com/in/alexsandrobezerra)
