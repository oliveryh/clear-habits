# Postgraphile Server

## Initial Setup

### Database Setup

We're using graphile-migrate and postgraphile. The prerequisites for these are that we've created our database, table and specific users ahead of time.

``` bash
sudo su - postgres
createuser --pwdprompt postgraphile
createdb clearhabits_postgraphile --owner=postgraphile
createdb clearhabits_postgraphile_shadow --owner=postgraphile
```

We when need to create an environment file that points to the newly created database (and shadow database for graphile-migrate to see).

This is done in the `env.sh` file. We can then run the following sequence to setup the migration.

``` bash
source env.sh
graphile-migrate init
graphile-migrate watch
```