# ShareYourGarden

:-)

## Dependencies

- [Docker Compose](https://docs.docker.com/compose/install/)
- [Sails](https://sailsjs.com/)

```bash
$ yarn global add sails
```

## MongoDB

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

```bash
$ cd backend
$ yarn install
```

### Run

```bash
$ sails lift
```

### test

[http://localhost:1337/gardens](http://localhost:1337/gardens)

## Frontend

### Setup

```bash
$ cd frontend
$ yarn install
```

### Run

```bash
$ yarn run start
```

### test

[http://localhost:5555/](http://localhost:5555/)
