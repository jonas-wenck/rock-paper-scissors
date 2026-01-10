## NestJS backend-for-frontend

The NestJS backend-for-frontend proxies the requests from the frontend to the backend and adds the API-key as a header.
This allows us to not expose the API key in the browser. This application is there

It was created by using the [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

Create an [.env-file](.env) to store the configuration:

```
BACKEND_URL=http://localhost:8080/rock-paper-scissors/games
BACKEND_API_KEY=someKey
CORS_ALLOWED_ORIGIN=http://localhost:4200
```

The `BACKEND_URL` and `CORS_ALLOWED_ORIGIN` props are already configured to match the standalone backend and frontend
apps. The `BACKEND_API_KEY` value needs to match the one set in
the [backend repository](../backend/src/main/resources/secrets.properties).

You need to have Node >= 24 installed. To install the dependencies, run `npm install`.

To start the application, run `npm run start`.
