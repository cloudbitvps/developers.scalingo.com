# Deployments

The deployments information are available in read-only. They are populated when
application are deployed.

--- row ---

**Deployment attributes**

{:.table}
| field          | type   | description                                              |
| -------------- | ------ | -------------------------------------------------------- |
| id             | string | unique ID                                                |
| app_id         | string | unique ID referencing the app this deployment belongs to |
| created_at     | date   | date of creation                                         |
| git_ref        | string | git SHA                                                  |
| pusher         | object | embedded user who pushed the GIT reference               |
| links          | object | hypermedia links about the deployment

**Deployment pusher attributes**

{:.table}
| field          | type   | description                     |
| -------------- | ------ | ------------------------------- |
| id             | string | unique ID                       |
| email          | string | email of user who pushed        |
| username       | string | username on Scalingo's platform |

**Deployment links attributes**

{:.table}
| field  |  type  | description
| ------ | ------ | ---------------------------------
| output | string | URL to the logs of the deployment 

||| col |||

Example object:

```json
{
  "app_id": "54100930736f7563d5030000",
  "created_at": "2014-09-10T10:49:42.390+02:00",
  "git_ref": "abcdef1234567890",
  "id": "123e4567-e89b-12d3-a456-426655440000",
  "pusher": {
    "email": "user@example.com",
    "id": "54100245736f7563d5000000",
    "username": "john"
  },
  "links": {
    "output": "https://api.scalingo.com/v1/deployments/123e4567-e89b-12d3-a456-426655440000/output"
  }
}
```

--- row ---

## List the deployments of an app

--- row ---

`GET https://api.scalingo.com/v1/apps/[:app]/deployments`

This endpoint returns data of several deployments

> Feature: pagination

||| col |||

Example request

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" -u ":$AUTH_TOKEN" \
  -X GET https://api.scalingo.com/v1/apps/example-app/deployments
```

Returns 200 OK

```json
{
    "deployments": [
        {
            "app_id": "54100930736f7563d5030000",
            "created_at": "2014-09-10T10:49:42.390+02:00",
            "git_ref": "abcdef1234567890",
            "id": "123e4567-e89b-12d3-a456-426655440000",
            "pusher": {
                "email": "user@example.com",
                "id": "54100245736f7563d5000000",
                "username": "john"
            }
        }
    ]
    "meta": {
        "pagination": {
            "current_page": 1,
            "prev_page": null,
            "next_page": null,
            "total_pages": 1,
            "total_count": 1
        }
    }
}
```

--- row ---

## Get a particular deployment

--- row ---

`GET https://api.scalingo.com/v1/apps/[:app]/deployments/[:deployment_id]`

This endpoint returns data of a given deployment from its ID

||| col |||

Example request

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" -u ":$AUTH_TOKEN" \
  -X GET https://api.scalingo.com/v1/apps/example-app/deployments/123e4567-e89b-12d3-a456-426655440000
```

Returns 200 OK

```json
{
    "deployment": {
        "app_id": "54100930736f7563d5030000",
        "created_at": "2014-09-10T10:49:42.390+02:00",
        "git_ref": "abcdef1234567890",
        "id": "123e4567-e89b-12d3-a456-426655440000",
        "pusher": {
            "email": "user@example.com",
            "id": "54100245736f7563d5000000",
            "username": "john"
        }
   }
}
```

--- row ---

## Get the output of the deployment

--- row ---

`GET https://api.scalingo.com/v1/apps[:app]/deployments/[:deployment_id]`

This endpoint will return all the log of the deployment. Those are basically what
you have seen in your terminal when running `git push`.

||| col |||

Example request

```shell
curl -H "Accept: text/plain" -u ":$AUTH_TOKEN" \
  -X GET https://api.scalingo.com/v1/apps/example-app/deployments/123e4567-e89b-12d3-a456-426655440000
```

Returns 200 OK
Content-Type: text/plain

```
-----> Buildpack version 1.2.0
-----> Compiling Ruby/Rails
-----> Using Ruby version: ruby-2.2.2
-----> Installing dependencies using 1.6.3
       Running: bundle install --without development:test --path vendor/bundle --binstubs vendor/bundle/bin -j4 --deployment
       Using json 1.8.2
       Using rake 10.4.2
       Using thread_safe 0.3.5
       Using builder 3.2.2
       [...]
       Using compass-rails 2.0.4
       Using ember-rails 0.18.2
       Your bundle is complete!
       Gems in the groups development and test were not installed.
       It was installed into ./vendor/bundle
       Bundle completed (2.64s)
       Cleaning up the bundler cache.
-----> Preparing app for Rails asset pipeline
       Running: rake assets:precompile
       I, [2015-05-12T21:45:45.836623 #191]  INFO -- : Writing /build/b7dd3507ecdd8019252dd870615d9d92/public/assets/application-60470b7668df29a6c53fbd61784165a6.js
       Asset precompilation completed (24.44s)
       Cleaning assets
       Running: rake assets:clean

----- Procfile declares types -> web
```
