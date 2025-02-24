# PhonesStoreApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.8.

# Notas

La api de añadir al carrito siempre devuelve { count: 1 }. Se persiste el dato en local storage.
Los datos de llamadas a la api de lisa de productos y detalle en producto se persiste en local storage.
Ng Lint no esta pasando bien porque al ser typescrip algunos elementos son neceasrios que sean any.

# Lint

```bash
npm run lint
```

## Development server

To start a local development server, run:

```bash
npm run start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building dev

To build the project in mode development run:

```bash
npm run buildDev
```

## Building production

To build the project in mode production run:

```bash
npm run buildProd
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
npm run test
```
