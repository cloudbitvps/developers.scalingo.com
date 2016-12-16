# Deployments

The deployments information are available in read-only. They are populated when
application are deployed.

--- row ---

**Deployment attributes**

{:.table}
| field          | type   | description                                                     |
| -------------- | ------ | --------------------------------------------------------------- |
| id             | string | unique ID                                                       |
| app_id         | string | unique ID referencing the app this deployment belongs to        |
| created_at     | date   | date of creation                                                |
| status         | string | status of the deployment (building, success, aborted, \*-error) |
| git_ref        | string | git SHA                                                         |
| pusher         | object | embedded user who pushed the GIT reference                      |
| links          | object | hypermedia links about the deployment                           |

**Deployment pusher attributes**

{:.table}
| field          | type   | description                     |
| -------------- | ------ | ------------------------------- |
| id             | string | unique ID                       |
| email          | string | email of user who pushed        |
| username       | string | username on Scalingo's platform |

**Deployment links attributes**

{:.table}
| field  |  type  | description                       |
| ------ | ------ | --------------------------------- |
| output | string | URL to the logs of the deployment |

||| col |||

Example object:

```json
{
  "app_id": "54100930736f7563d5030000",
  "created_at": "2014-09-10T10:49:42.390+02:00",
  "status": "success",
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
            "status": "build-error",
            "id": "123e4567-e89b-12d3-a456-426655440000",
            "pusher": {
                "email": "user@example.com",
                "id": "54100245736f7563d5000000",
                "username": "john"
            }
        }
    ],
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

## Trigger manually a deployment from a github repository

--- row ---

`POST https://api.scalingo.com/v1/apps/[:app]/deployments`

With this helper, you'll be able to trigger a deployment from your application
without doing it by a `git push`

> Your application must have been created with the `git_source` attribute to be
deployable this way.

--- row ---

### Attributes

```json
{
  "deployment": {
    "git_ref": "SHA git to deploy",
    "source_url": "Archive with the source"
  }
}
```

||| col |||

Example request

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" -u ":$AUTH_TOKEN" \
     -X POST https://api.scalingo.com/v1/apps/example-app/deployments -d \
     '{
       "deployment": {
         "git_ref": "master",
         "source_url": "https://github.com/Scalingo/sample-go-martini/archive/master.tar.gz"
       }
     }'
```

Returns 200 OK

```json
{
  "deployment": {
    "id":"5e34a76a-24b7-4d50-be96-942ca986a786",
    "created_at":"2016-12-16T16:33:58.250+01:00",
    "app_id":"529ba36e65d972e883203922",
    "finished_at":null,
    "status":"building",
    "git_ref":"master",
    "previous_git_ref":"eb5454c314e2e9c8f98efa9b4422476b391df185",
    "duration":0,
    "pusher": {
      "username":"user",
      "email":"user@example.com",
      "id":"51161e5ef1e42617000001"
    },
    "links": {
      "output": "https://api.scalingo.com/v1/apps/529ba36e65d972e883203922/deployments/5e34a76a-24b7-4d50-be96-942ca986a786/output"
    }
  }
}
```

--- row ---

## Get the output of the deployment

--- row ---

`GET https://api.scalingo.com/v1/apps/[:app]/deployments/[:deployment_id]/output`

This endpoint will return all the log of the deployment. Those are basically what
you have seen in your terminal when running `git push`.

||| col |||

Example request

```shell
curl -H "Accept: text/plain" -u ":$AUTH_TOKEN" \
  -X GET https://api.scalingo.com/v1/apps/example-app/deployments/123e4567-e89b-12d3-a456-426655440000/output
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

--- row ---

## Get real time output of a live deployment

--- row ---

> Real time output comes from a WebSocket

You have to get the URL from the `.links.deployments_stream` value of an app
object, it usually looks like to `wss://deployments.scalingo.com/apps/[:app]`
but may change in the future. That's why you have to first get an app and
read the URL from there.

First thing to do when connected is to authenticate sending an `auth` frame:

```json
{
  "type": "auth",
  "data": {
     "token": <api token>
  }
}
```

On authentication error, the websocket will be ended immediately.

Otherwise you'll start receiving existing logs and real time logs for the app
deployments. There can't be several deployments in parallel for a given application.

### Event types

You'll receive different types of message from the websocket:

* `ping` which is sent to keep the connection open and avoid timeout.
* `new` when a new deployment is triggered this event is sent to notify listeners
* `log` each time a logline is displayed, it is sent through this kind of event
* `status` the deployment goes through multiple states during its lifetime:

```
  building → pushing → starting → success
           → pushing → starting → crashed-error
           → pushing → starting → timeout-error
           → pushing → aborted
           → aborted
           → build-error
```

### Details about the deployment statuses

* `building`: when the buildpack is chosen and executed
* `pushing`: the generated Docker image is pushed to our registry
* `starting`: the order to start your app has been transmitted to our scheduler
* `success`: the application has correctly started, end of deployment
* `crashed-error`: the application failed to boot, have a look to the logs
* `timeout-error`: the application has not started in 60 seconds
* `build-error`: something went wrong during the buildpack execution, have a look at deployments logs
* `aborted`: if the connection is broken between the pusher and our infrastructure, the deployment is considered as canceled.

||| col |||

Events example

New Event

```json
{
  "type": "new",
  "data": {
    "deployment": "123e4567-e89b-12d3-a456-426655440000"
  }
}
```

Output Event

```json
{
  "type": "log",
  "id": "123e4567-e89b-12d3-a456-426655440000",
  "data": {
    "content": "Bundle completed (2.64s)"
  }
}
```

Status Event

```json
{
  "type": "status",
  "id": "123e4567-e89b-12d3-a456-426655440000",
  "data": {
    "status": "success"
  }
}
```

Ping Event

```json
{
  "type": "ping",
  "data": {
    "ts": 1465288802
  }
}
```
