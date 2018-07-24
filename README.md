# ShareYourGarden

:-)

## Dependencies

- [Docker Compose](https://docs.docker.com/compose/install/)
- [Sails](https://sailsjs.com/)

```bash
$ yarn global add sails
```

## MongoDB (optional)

### Run

```bash
$ docker-compose up mongodb
```

### Test

```bash
$ mongo 127.0.0.1:27017/shareyourgarden -u shareyourgarden -p shareyourgarden
```

### Data

Load [gardens Collection](https://github.com/brutalchrist/shareyourgarden/wiki/Gardens-Collection)

```bash
MongoDB shell version: 3.2.19
connecting to: 127.0.0.1:27017/shareyourgarden
> show collections
gardens
> 

```

## Backend

### Setup

View [backend documentation](https://github.com/brutalchrist/shareyourgarden/tree/master/backend)

### Run

```bash
$ yarn start
```

### test

[http://localhost:1337/gardens](http://localhost:1337/gardens)

## Frontend

### Setup

```bash
$ cd frontend
$ yarn
```

### Run

```bash
$ yarn dev
```

### test

[http://localhost:5555/](http://localhost:5555/)
