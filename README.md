# Requirements
* [node.js](https://nodejs.org)
* [PostgreSQL](https://postgresql.org/download)
# Installation
```sh
git clone git@github.com:igor-anferov/smart-guide.git
cd smart-guide
npm install -g yarn
yarn install
```
# Creating database
```sh
yarn create-db
```
# Filling database with demo data
```sh
yarn fill-db
```
# Running dev-server
```sh
JWT_SECRET='<secret used as HMAC key to sign JWT>' \
yarn start
```
### Available endpoints
| URL                     | Description       |
| ------                  | ------            |
| http://0.0.0.0:3000/    | Application       |
| http://0.0.0.0:3000/api | API documentation |
