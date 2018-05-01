# algo-repo

> A website hosting a repository of algorithms which users can use and publish

[![Build Status](https://travis-ci.com/dannycjones/algorepo.svg?token=AQNAqUtbdpFqfPrYmwKT&branch=master)](https://travis-ci.com/dannycjones/algorepo)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fdannycjones%2Falgorepo.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fdannycjones%2Falgorepo?ref=badge_shield)

## Getting Started

This project uses Vue.JS and Nuxt.JS for the frontend, and Express.JS for the backend. The database used is MongoDB.

### Development

You need Node.JS installed as a prerequisite.

Also, you need a MongoDB instance available. You can either roll your own, or use the _docker-compose.yml_ file provided to run one with Docker. If you don't use the docker compose file, make sure to set the _MONGODB_URI_ environment variable.

1. `yarn` to install dependencies
3. `yarn run db:seed`. This will seed the database. The step is optional and will provide you with a basic user and a basic calculator.
3. `yarn run dev` will start the development server with hot reloading - no restarts neccesary (unless you add new dependencies)!

Off you go! 

### Production

You need Docker installed as a prerequisite.

A Docker image for the web service is publish under _dannycjones/dis_web_.

You can adapt the _docker-compose.yml_ file for production. Change the web service port if you need to. Here is an example of a docker compose file serving directly onto port 80.

``` yaml
version: '3'

services:
  web:
    image: dannycjones/dis_web
    ports:
      - "80:3000"
    environment:
      - MONGODB_URI=mongodb://mongo/main
    depends_on:
      - mongo
  mongo:
    image: mongo:3.6
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:

```


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fdannycjones%2Falgorepo.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fdannycjones%2Falgorepo?ref=badge_large)