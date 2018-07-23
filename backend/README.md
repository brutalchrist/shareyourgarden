# backend

## Setup

```bash
$ yarn
```

## Configure

### Connections (`config/connections.js`)

Local database:

```
  someMongodbServer: {
    adapter: 'sails-mongo',
    host: '127.0.0.1',
    port: 27017,
    user: 'shareyourgarden',
    password: 'shareyourgarden',
    database: 'shareyourgarden'
  },
```

Sandbox database:

```
  someMongodbServer: {
    adapter: 'sails-mongo',
    host: 'ds249818.mlab.com',
    port: 49818,
    user: 'shareyourgarden',
    password: '1shareyourgarden1',
    database: 'shareyourgarden'
  },
```

## Run

```bash
$ yarn start
```