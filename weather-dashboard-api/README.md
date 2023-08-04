
## Running the app

## Primeiro crie um arquivo .env com esses dados 

substitua a chabe da api openweather com a sua que se consegue em https://openweathermap.org/api
```
POSTGRES_HOST="postgres"
POSTGRES_HOST_TEST="localhost"
POSTGRES_PORT=5432
POSTGRES_DB="WEATHER"
POSTGRES_USER="root"
POSTGRES_PASSWORD="root"
BCRYPT_SALT=10
OPEN_WEATHER_API_URL=http://api.openweathermap.org/
OPEN_WEATHER_API_KEY=
``````
```bash
# development
$ docker-compose up
```

## Test
Por favor rode fora dos containers e garanta que o container continue de pe
```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## License

Nest is [MIT licensed](LICENSE).
