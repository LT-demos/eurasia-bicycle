freetravel
==========

CI status: ![Build Status](https://travis-ci.org/TW-freetravel/freetravel.svg?branch=master)

A basic es6 project, which includes:

1. webpack
2. babel
3. express
4. jquery
5. react
6. react-router
6. bootstrap


All the changes to js/jsx files can be hot-reloaded in browser.

Install mongodb
---------------

Mac:

```
brew install mongo
```

Ubuntu 16.04:

See the end of this readme

db name:
--------

```
freetravel-db
```

Start it
---------

```
mkdir /tmp/freetravel-db
mongod --dbpath /tmp/freetravel-db
```

Setup this project
------------------

```
npm install -g babel-cli
npm install
mongodb
npm run init-db     (`ctrl+c` to terminate after running)
npm start
```

Then visit <http://localhost:3000>

If you modify `public/index.jsx` to change the text, you will see the changes are applied to page instantly.


Install on Ubuntu 16.04
-----------------------

```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```

https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
