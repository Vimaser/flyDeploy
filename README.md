# Deploying an Express/Postgres app to Fly.io

## 1. Setting up the node app

This part was simple. We just followed [this guide](https://fly.io/docs/languages-and-frameworks/node/) to clone and deploy a demo app that was provided for us by fly. The first time you do this, you have to set up your account and add a credit card.

## 2. Creating the local Postgres database

You can use `psql` to create a new database that your local application will connect to. Once it's connected, you should connect to it in your code with a connection string. Make sure the connection string is set to a DATABASE_URL env var in your `.env` file.

```
DATABASE_URL='postgres://localhost:5432/your_db_name'
```

## 3. Install `node-pg-migrate` and create migrations

Now that your database is set up, you want to update the schema to support your apps functionality. To do this, we'll use *migrations*.

Check out the [docs](https://salsita.github.io/node-pg-migrate/#/) and look at the `package.json` file and `db/migrations` directory in this repo for inspiration.

Once you've run your migraton to create a table, you can use `psql` to add some data to it for testing purposes.

## 4. Update your server code to query your database.

You can checkout the `server.js` file in this repo for ideas.

Make sure it's all working locally!

## 5. Create your database on fly.

[docs](https://fly.io/docs/flyctl/postgres-create/)

```
fly postgres create
```

## 6. Attach your fly db to your express app.

[docs](https://fly.io/docs/postgres/managing/attach-detach/)

```
fly postgres attach --app <app-name> <postgres-app-name>
```

This sets the `DATABASE_URL` env var on your express app so the server code you've written can connect to postgres without an additional configuration.

## 7. Make sure migrations run as part of the deploy process.

To do this, you need to add the following to your `fly.toml`

```
[deploy]
  release_command = "npm run migrate up"
```

(Assuming you've defined a `migrate` script in your `package.json` file.)

## 8. Deploy!

## 9. Keep developing your application

Now that your fly infrastructure is set up, all you have to is remember to make all database schema changes with migrations, and then deploy as you normally would! 🥳
