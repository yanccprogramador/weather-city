
## Running the app

## Primeiro crie um arquivo .env com esses dados 

substitua a chabe da api openweather com a sua que se consegue em https://openweathermap.org/api
```
POSTGRES_HOST="postgres"
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
```bash
# unit tests
$ docker exec weather-api npm run test

# e2e tests
$  docker exec weather-api npm run test:e2e

# test coverage
$  docker exec weather-api npm run test:cov
```


## License

Nest is [MIT licensed](LICENSE).
