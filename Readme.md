# Pizza Api Project

## Used technologies & Methods:
* Node.Js
* Express.Js
* Mongoose - MongoDB SQL
* Authorization And Permissions with JWT (Json Web Token)
* Object Mapping (ORM)
* Password Crypto
* Documentation: Swagger / Redoc / Json
* Logging
-----

### ER (Entity Relationship Diagram) Diagram
<img src="./src/img/erdPizzaAPIL.png" width="650" height="450" alt="ERD"></img> 

### Steps to be taken before running the project.

```
- The project is downloaded from the github repo.
- After the project is opened in VSCode, the following commands are run from the gitBash terminal.

$ npm init -y
$ npm i express dotenv express-async-errors
$ npm i mongoose
$ npm i morgan
$ npm i jsonwebtoken
$ npm i redoc-express swagger-autogen swagger-ui-express
$ echo PORT=8000 > .env
$ echo MONGODB=mongodb://127.0.0.1:27017/pizzaApi >> .env
$ cp ./env-sample ./.env
$ nodemon // * Running *

- The synchronization function in line xxxx of the index.js file should be run once and disabled again.
- Testing is done with the following URL queries via Thunder Client or Postman or Browser.
```

### Folder/File Structure:

```
    src/
        config/
            dbConnection.js
        controllers/
            auth.controller.js
            department.controller.js
            personnel.controller.js
        helpers/
            checkUserAndSetToken.js
            passwordEncrypt.js
            sync.js
        img/
            erdPersonnelApi.png
            mongoose.png
        middlewares/
            authınticated.js
            errorHandler.js
            findSearchSortPage.js
            permissions.js
        models/
            department.model.js
            personnel.model.js
        routes/
            auth.router.js
            department.route.js
            personnel.route.js
    .gitignore
    .env-sample
    index.js
    package-lock.json
    package.json    
    Readme.md
    swagger.js
    swagger.json
```
### Resources used
* https://mongoosejs.com/docs/queries.html
* http://expressjs.com/en/resources/middleware/cookie-session.html
* https://www.npmjs.com/package/cookie-session
* https://nodejs.org/api/crypto.html#cryptopbkdf2syncpassword-salt-iterations-keylen-digest
* https://www.mongodb.com/docs/manual/reference/operator/query/regex/
* https://jwt.io/
* https://expressjs.com/en/resources/middleware/morgan.html

> Designed By DOGUKAN © Nov 2023