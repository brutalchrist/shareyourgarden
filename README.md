# ShareYourGarden

:-)

## Dependencies

- Install [Docker Compose](https://docs.docker.com/compose/install/)

## MongoDB

### Run

```bash
$ docker-compose up mongodb
```

### Test

```bash
$ mongo 172.16.231.2:27017/shareyourgarden -u shareyourgarden -p shareyourgarden
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

### Run

```bash
$ cd backend
$ sails lift
```

### test

[http://localhost:1337/gardens](http://localhost:1337/gardens)

## Frontend

### Run

```bash
$ cd frontend
$ npm start -- --scss
```

### test

[http://localhost:5555/](http://localhost:5555/)
