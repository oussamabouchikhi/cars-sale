# 🎯 Car Sale

Old cars pricing api

## ✨ Features

- Cookies/Session based authentication (signin/signup with email & password)
- Authorization (admins have to approve reported sales )
- Users can get an estimate for how much their car is worth based on the (make, model, year, mileage...)
- Users can report what they sold their vehicules for

## ⬇ Installation

Make sure you have Nodejs and @nestjs/cli installed, otherwise you'll have to install them on your machine.

```bash
~ node -v
~ nest --version
```

```bash
# Clone via SSH or any other method
$ git clone git@github.com:oussamabouchikhi/cars-sale.git

# CD into the project
$ cd cars-sale

# Install the dependencies
$ npm install
```

## 🛠️ Configuration

Rename the `example.env.development` and the `example.env.test` files to `.env.development` `.env.test` respectively, then edit the environment variables \
`DB_NAME` database name \
`COOKIE_KEY` key for hashing the cookie

```.env.development
DB_NAME=DEVELOPMENT_DATABASE_NAME
COOKIE_KEY=YOUR_COOKIE_KEY_FOR_DEVELOPMENT_ENVIRONMENT
```

```.env.test
DB_NAME=TEST_DATABASE_NAME
COOKIE_KEY=YOUR_COOKIE_KEY_FOR_TEST_ENVIRONMENT
```

## 🚀 Running the app

```bash
# development
$ npm start

# watch mode (recomended)
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 🧪 Test

```bash
# unit tests (you can add the prefix --watch)
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

### 🐳 Docker

Make sure docker is running on your machine. And Obviously you installed it :)

```bash
# Build and run the container
Docker compose up
```

After running the Above command, you access the app from <http://localhost:3000/>

Other usefull commands

```bash
# Build docker images
docker-compose build

# Show docker images
docker images

# Show docker images on running container
docker ps -a
```

### 📄 License

This project is open-sourced under the [MIT license](https://opensource.org/licenses/MIT).
