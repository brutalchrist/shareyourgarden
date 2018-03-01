# ShareYourGarden

:-)

## Dependencies

- Install [Docker Compose](https://docs.docker.com/compose/install/)

## MongoDB

### Run (background)

```bash
$ docker-compose up -d mongodb
```

### Test

```bash
$ mongo 172.16.231.2:27017/shareyourgarden -u shareyourgarden -p shareyourgarden
```

## Backend

### Run

```bash
docker-compose up backend
```

### test

[http://localhost:1337/](http://localhost:1337/)

## Frontend

### Run

```bash
cd frontend
npm start -- --scss
```

### test

[http://localhost:5555/](http://localhost:5555/)
