# Noloco Dublin Bikes

## Future feature considerations

1. Add more test coverage
2. Add an orderBy  option to the /data  request to specify the field which should control the order and the direction it should be ordered in.
3. Add some sort of pagination to the /data  endpoint to control how many to return and which page or item to return first
4. Support a not query operator that you can use to negate the nested query filter
5. Add an endpoint that allows you to delete a station by ID
6. Add an endpoint that allows you to update a station by ID


## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm start

# watch mode
$ pnpm start:dev

# production mode
$ pnpm start:prod
```

## Run tests

```bash
# unit tests
$ pnpm test

# e2e tests
$ pnpm test:e2e

# test coverage
$ pnpm test:cov
```

## API Definition

- Swagger  - [Swagger](http://localhost:3000/api)

## Stay in touch

- Author - [Sean Heinen](https://www.linkedin.com/in/seanheinen)
## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
