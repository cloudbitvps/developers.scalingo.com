# Applications

--- row ---

**Application attributes**

{:.table}
| field               | type   | description                                      |
| ------------------- | ------ | ------------------------------------------------ |
| id                  | string | unique ID                                        |
| name                | string | name of the application, can substitute the ID   |
| created_at          | date   | creation date of the application                 |
| updated_at          | date   | last time the application has been updated       |
| git_url             | string | URL to the GIT remote to access your application |
| owner               | object | information about the owner of the application   |
| url                 | string | platform allocated URL to access to your app     |
| links               | object | object of related link like `deployments_stream` |
| last_deployed_at    | date   | date of the last deployement attempt             |
| last_deployed_by    | string | user who attempted the last deployment           |
| last_deployement_id | string | id of the last successfull deployment            |

||| col |||

Example object:

```json
{
  "id": "54100930736f7563d5030000",
  "name": "example-app",
  "created_at": "2014-09-10T10:17:52.690+02:00",
  "updated_at": "2014-09-10T10:17:52.690+02:00",
  "git_url": "git@scalingo.com:example-app.git",
  "last_deployed_at": "2017-02-02T10:17:53.690+02:00",
  "last_deployed_by": "john",
  "last_deployment_id": "58c2b15af1453a0001e24d23",
  "owner": {
    "username": "john",
    "email": "user@example.com",
    "id": "54100245736f7563d5000000"
  },
  "url": "https://example-app.scalingo.io",
  "links": {
    "deployments_stream": "wss://deployments.scalingo.com/apps/example-app"
  }
}
```

--- row ---

## Create an application

--- row ---

`POST https://api.scalingo.com/v1/apps`

### Parameters

* `app.name`: Should have between 6 and 32 lower case alphanumerical characters
  and hyphens, it can't have an hyphen at the beginning or at the end, nor two
  hyphens in a row.
* `app.git_source`: (*Optional*) URL to the future github repository if your need
  to deploy from there without going through the `git push` workflow

### Custom Header

* `X-Dry-Run: <boolean>`: If set to true, the operation will only check if the
  application can be created with the given parameters. The same errors and responses
  are sent, but the application **is not** actually created.

### Free usage limit

You can only have 1 application without having defined [a payment
method](https://my.scalingo.com/apps/billing).

||| col |||

Example

```sh
curl -H "Accept: application/json" -H "Content-Type: application/json" -u :$AUTH_TOKEN \
  -X POST https://api.scalingo.com/v1/apps -d \
  '{
    "app": {
      "name": "example-app"
    }
  }'
```

Returns 201 Created

```json
{
    "app": {
        "created_at": "2014-09-10T10:17:52.690+02:00",
        "git_url": "git@scalingo.com:example-app.git",
        "id": "54100930736f7563d5030000",
        "name": "example-app",
        "last_deployed_at": "2017-02-02T10:17:53.690+02:00",
        "last_deployed_by": "john",
        "last_deployment_id": "58c2b15af1453a0001e24d23",
         "owner": {
            "username": "john",
            "email": "user@example.com",
            "id": "54100245736f7563d5000000"
        },
        "updated_at": "2014-09-10T10:17:52.690+02:00",
        "url": "https://example-app.scalingo.io",
        "links": {
          "deployments_stream": "wss://deployments.scalingo.com/apps/example-app"
        }
    }
}
```

--- row ---

## List your applications

`GET https://api.scalingo.com/v1/apps`

List all your applications and the one your are collaborator for.

||| col |||

Example

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" -u :$AUTH_TOKEN \
  -X GET https://api.scalingo.com/v1/apps
```

Returns 200 OK

```json
{
  "apps": [
    {
      "name": "example-app",
      …
    }, {
      "name": "another-app",
      …
    }, …
  ]
}
```

--- row ---

## Get a precise application

--- row ---

`GET https://api.scalingo.com/v1/apps/[:app]`

Display a precise application

The status field can take different values depending on your application state:

- `new`: Your app has just been created
- `running`: Your app has at least one container running
- `stopped`: Your app has no containers running
- `crashed`: Your app has crashed more than 12 times in a row
- `restarting`: You triggered a restart operation
- `scaling`: You triggered a scale operation
- `booting`: You are deploying a new version of your application

||| col |||

Example request

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" -u :$AUTH_TOKEN \
  -X GET https://api.scalingo.com/v1/apps/example-app
```

Returns 200 OK

```json
{
  "app": {
    "id" : "51e938266edff4fac9100005",
    "name" : "example-app",
    "owner" : {
       "email" : "user@example.com",
       "id" : "51d73c1e6edfeab537000001",
       "username" : "example-user"
    },
    "git_url" : "git@scalingo.com:example-app.git",
    "last_deployed_at" : "2014-11-16T12:17:16.137+01:00",
    "status" : "running",
    "updated_at" : "2015-02-02T18:00:18.041+01:00",
    "created_at" : "2013-07-19T14:59:18.329+02:00",
    "last_deployed_by" : "example-user",
    "url": "https://example-app.scalingo.io",
    "links": {
      "deployments_stream": "wss://deployments.scalingo.com/apps/example-app"
    }
  }
}
```

--- row ---

## Get containers list

--- row ---

`GET https://api.scalingo.com/v1/apps/[:app]/containers`

This request lists the different container types of a given application. It includes
how many containers and the size of the containers for each type.

--- row ---

**Container attributes**

{:.table}
| field          | type    | description                                     |
| -------------- | ------- | ----------------------------------------------- |
| name           | string  | Type of container (web, worker, etc.)           |
| amount         | integer | Amount of containers of the given type          |
| size           | string  | Size of the containers of this type (S/M/XL/..) |

||| col |||

Example request

```sh
curl -H "Accept: application/json" -H "Content-Type: application/json" -u :$AUTH_TOKEN \
  -X GET 'https://api.scalingo.com/v1/apps/example-app/containers'
```

Returns 200 OK

```json
{
  "containers": [
    {
      "name": "web",
      "amount": 2,
      "size": "L"
    }, {
      "name": "worker",
      "amount": 1,
      "size": "M"
    }
  ]
}
```

--- row ---

## Scale an application

--- row ---

`POST https://api.scalingo.com/v1/apps/[:app]/scale`

Send a scaling request, the status of the application will be changed to
'scaling' for the scaling duration. No other operation is doable until the app
status has switched to "running" again.

You can follow the operation progress by following the `Location` header,
pointing to an [`operation` resource](/operations.html).

The request returns the complete formation of containers event those which are
not currently scaled.

### Parameters

* `containers`: Array of the containers you want to scale.
  Each `containers`:
  * `container.name`: Name of the container you want to scale
  * `container.amount`: Final amount of container of this type
  * `container.size` (optional): Target size of container. (not changed if empty)
    Size documentation: http://doc.scalingo.com/internals/container-sizes

### Free usage limit

You can only have 1 small or medium 'web' container without having defined [a payment
method](https://my.scalingo.com/apps/billing).

### Limit

There is a hard limit of 10 containers of a given type per application, if you need more:
[contact us](mailto:support@scalingo.com)

||| col |||

Example request

```sh
curl -H "Accept: application/json" -H "Content-Type: application/json" -u :$AUTH_TOKEN \
  -X POST 'https://api.scalingo.com/v1/apps/example-app/scale' -d \
  '{
    "containers": [
      {
        "name": "web",
        "amount": 2,
        "size": "L"
      }
    ]
  }'
```

Returns 202 Accepted (Asynchronous task)
Headers:
  * `Location`: 'https://api.scalingo.com/v1/apps/example-app/operations/52fd2357356330032b080000'

```json
{
  "containers": [
    {
      "id": "52fd2457356330032b020000",
      "name": "web",
      "amount": 2,
      "size": "L"
    }, {
      "id": "52fd235735633003210a0001",
      "name": "worker",
      "amount": 1,
      "size": "M"
    }
  ]
}
```

--- row ---

## Restart an application

--- row ---

`POST https://api.scalingo.com/v1/apps/[:app]/restart`

In the same spirit than the 'scale' operation, the restart is an asynchronous
operation

Send a restart request, the status of the application will be changed to
'restarting' for the operation duration. No other operation is doable until the
app status has switched to "running" again.

You can follow the operation progress by following the `Location` header,
pointing to an [`operation` resource](/operations.html).

### Parameters

* `scope`: Array of containers you want to restart.
  * If empty or null: restart everything
  * Should fit the container types of the application: `["web", "worker"]` or `["web-1"]`

||| col |||

Example request

```sh
curl -H "Accept: application/json" -H "Content-Type: application/json" -u :$AUTH_TOKEN \
  -X POST 'https://api.scalingo.com/v1/apps/example-app/restart' -d \
  '{
    "scope": ["web"]
   }'
```

Return 202 Accepted (Asynchronous task) - Empty body

--- row ---

## Delete an application

`DELETE https://api.scalingo.com/v1/apps/[:app]`

Parameters:

* `current_name`: As validation, should equal the name of the app

||| col |||

Example request

```sh
curl -H "Accept: application/json" -H "Content-Type: application/json" -u :$AUTH_TOKEN \
  -X DELETE 'https://api.scalingo.com/v1/apps/example-app?current_name=example-app'
```

Returns 204 No Content

--- row ---

## Rename an application

`POST https://api.scalingo.com/v1/apps/[:app]/rename`

### Parameters

* `current_name`: As validation, should equal the name of the app
* `new_name`: Target name of rename operation

||| col |||

Example request

```sh
curl -H "Accept: application/json" -H "Content-Type: application/json" -u :$AUTH_TOKEN \
  -X POST 'https://api.scalingo.com/v1/apps/example-app' -d \
  '{
    "current_name": "example-app",
    "new_name": "renamed-example-app"
  }'
```

Returns 200 OK

```json
{
  "app": {
    "name": "renamed_example-app",
    ...
  }
}
```

--- row ---

## Transfer ownership of an application

`PATCH https://api.scalingo.com/v1/apps/[:app]`

### Parameters

* `app.owner.email`: email of the new owner of the app, should be part of the
  collaborators

||| col |||

Example request

```sh
curl -H "Accept: application/json" -H "Content-Type: application/json" -u :$AUTH_TOKEN \
  -X PATCH 'https://api.scalingo.com/v1/apps/example-app' -d \
  '{
    "app": {
      "owner": {
        "email": "user2@example.com"
      }
    }
  }'
```

Returns 200 OK

```json
{
  "app": {
    "name": "example-app",
    ...
  }
}
```

--- row ---

## Access to the application logs

--- row ---

`GET https://api.scalingo.com/v1/apps/[:app]/logs`

The request will generate an URL you can use to access the logs of your application.

How to use this endpoint: [more information here](/logs.html)

||| col |||

Example request:

```sh
curl -H "Accept: application/json" -H "Content-Type: application/json" -u :$AUTH_TOKEN \
  -X GET 'https://api.scalingo.com/v1/apps/example-app/logs'
```

Returns 200 OK

```json
{
  "app": { … },
  "logs_url": "https://logs.scalingo.com/apps/example-app/logs?token=0123456789"
}
```

--- row ---

## Access to the application logs archives

--- row ---

`GET https://api.scalingo.com/v1/apps/[:app]/logs_archives(?cursor=123456)`

The request will generate a list of URLs you can use to download your logs archives.
URLs are valid for a duration of 60 minutes.

They are paginated so a response contain a boolean indicating if there is more
archives available and a string cursor you need to provide to get next list.

One reponse item contain the filesize and the aproximate time period provided.

||| col |||

Example request:

```sh
curl -H "Accept: application/json" -H "Content-Type: application/json" -u :$AUTH_TOKEN \
  -X GET 'https://api.scalingo.com/v1/apps/example-app/logs_archives'
```

Returns 200 OK

```json
{
  "next_cursor": "234567",
  "has_more": true,
  "archives": [
    {
      "url": "https://scalingo.io/myfile",
      "size": 98765,
      "from": "Fri Mar 24 14:00:00 +0000 UTC 2017",
      "to": "Sun Mar 26 14:00:00 +0000 UTC 2017"
    },
    { … }
  ]
}
```

--- row ---

## Run a one-off container

Similar to `scalingo run`

--- row ---

`POST https://api.scalingo.com/v1/apps/[:app]/run`

To run a n interactive task, you have to start a one-off container. As its name
mean it's a container you will start for a given task and which will be
destroyed after it. It can be any command which will be executed in the
environment your application.

### Parameters

* `command` (*string* **required**): Command line which has to be run (example: "bash")
* `env` (*object*): Environment variables to inject into the container (additionaly to those of your apps)
* `size` (*string*, default `"M"`): Size of the container (e.g. S, M, etc)
* `detached` (*boolean*, default `false`): Foreground task by default, set to `true` if the container has to be run in background.


### Background vs Foreground one-off

By default one-off containers are started as **attached** command, it means it
will only get started when a terminal interactively connect to it through the
[one-off endpoint](/one-off.html). Once attached, data should be sent to the
one-off or from it, otherwise the connection will be automatically closed after
30 minutes and the container stopped. So for long interactive jobs, make sure
the process is writing something to *stdout* or *stderr*.

If the `detached` option is set to `true`, the container will be started as a
background one-off container. In this case the container is started instantly
logs from the job are aggregated to the total logs of the application. You have
to make sure this job ends at some point.

||| col |||

Example request:

```sh
curl -H "Accept: application/json" -H "Content-Type: application/json" -u ":$AUTH_TOKEN" \
  -X POST 'https://api.scalingo.com/v1/apps/example-app/run' -d \
  '{
    "command": "bundle exec rails console",
    "env": {
      "VAR1": "VAL1"
    },
    "size": "L"
  }'
```

Returns 200 OK

```json
{
  "container": {
    "id" : "5250424112dba4edf0000024",
    "type" : "one-off",
    "type_index" : 1,
    "created_at" : "2015-02-17T22:10:32.692+01:00",
    "memory" : 5.36870912e+08,
    "state" : "booting",
    "app" : { "name": "example-app", ... }
  },
  "attach_url": "http://run-1.scalingo.com:5000/f15d8c7fb4170c4ef14b63b2b265c8fa3dbf4a5882de19682a21f6243ae332c6"
}
```

--- row ---

## Create a child application

--- row ---

`POST https://api.scalingo.com/v1/apps/[:parent_app_name]/child_apps`

Create a child application based on the provided parent application.

### Parameters

* `app.name`: Name of the created child application. Should have between 6 and 32 lower case alphanumerical characters
  and hyphens, it can't have an hyphen at the beginning or at the end, nor two
  hyphens in a row.

||| col |||

Example

```sh
curl -H "Accept: application/json" -H "Content-Type: application/json" -u :$AUTH_TOKEN \
  -X POST https://api.scalingo.com/v1/apps/example-parent-app/child_apps -d \
  '{
    "app": {
      "name": "example-child-app"
    }
  }'
```

Returns 201 Created

```json
{
  "app": {
    "created_at":"2017-03-10T18:20:39.454+01:00",
    "git_url":"git@scalingo.com:example-child-app.git",
    "id":"58c2d99563b9fe00019298e2",
    "name":"example-child-app",
    "parent_app_name": "example-parent-app",
    "owner": {
      "username":"john",
      "email":"user@example.com",
      "id":"58bb138d97183e0001f90e1a",
    },
    "updated_at":"2017-03-10T18:20:39.458+01:00",
    "url":"https://example-child-app.scalingo.io",
    "links": {
      "deployments_stream":"wss://deployments.scalingo.com/apps/example-child-app"
    },
    "status":"new",
    "last_deployed_at":null,
    "last_deployed_by":null,
    "git_source":null,
    "flags":{},
    "limits":{}
  }
}
```

--- row ---

## List child apps of an application

--- row ---

This endpoint let you list the different child apps of an application

> Feature: pagination

||| col |||

Example

```sh
curl -H "Accept: application/json" -H "Content-Type: application/json" -u :$AUTH_TOKEN \
  -X GET https://api.scalingo.com/v1/apps/example-parent-app/child_apps
```

Returns 201 Created

```json
{
  "child_apps": [
    {
      "created_at":"2017-03-10T18:20:39.454+01:00",
      "id":"58c2d99563b9fe00019298e2",
      "name":"example-child-app-1",
      "parent_app_name": "example-parent-app",
      ...
    }, {
      "created_at":"2017-03-10T18:20:39.454+01:00",
      "id":"58c2d99563b9fe00019298e3",
      "name":"example-child-app-2",
      "parent_app_name": "example-parent-app",
      ...
    }
  ]
}
```


--- row ---

## Get metrics data of an application

--- row ---

The stats endpoint let you get metrics about the containers of an application.
These data include the CPU usage and the memory usage, splitted between RAM
and Swap memory. But also the number of request per minute handled by your app.

`GET /stats/:metrics(/:container)(/:index)'`


The metrics are aggregated by container types. If a type have more than one
container and the container index is not passed, it will return the mean value
of all the containers of the same type.

The `metrics` available are:

* cpu
* memory
* swap
* router

If the metrics type is `router` the container and index params are ignored.
But you can pass a `status_code` get variable which will filter router metrics by
their status code.

Possible values are:

* 1XX
* 2XX
* 3XX
* 4XX
* 5XX
* all

### Parameters

* `since`: Viewing period in hour

||| col |||

Example request

```
curl -H 'Accept: application/json' -H 'Content-Type: application/json' -u ":$AUTH_TOKEN" \
  -X GET https://api.scalingo.com/v1/apps/example-app/stats/cpu/web/1?since=48
```

Returns 200 OK

```javascript
[{
	"time":"2016-07-26T15:34:00Z",
	"value":5.925774222222222e+06
}, {
	"time":"2016-07-26T15:48:00Z",
	"value":6.561060571428572e+06
}, {
	"time":"2016-07-26T16:02:00Z",
	"value":7.012790857142857e+06
}, {
	"time":"2016-07-26T16:16:00Z",
	"value":7.579428571428572e+06
}, ...
]
```

--- row ---

## Get real time stats of an application

--- row ---

To get real time metrics, you can use the following endpoint:

`GET https://api.scalingo.com/v1/apps/[:app]/stats`

Return the list of all stats for each container of the application.

||| col |||

Example request

```
curl -H 'Accept: application/json' -H 'Content-Type: application/json' -u ":$AUTH_TOKEN" \
  -X GET https://api.scalingo.com/v1/apps/example-app/stats
```

Returns 200 OK

```json
{
  "stats" : [
    {
      "id" : "web-1",
      "cpu_usage" : 0,
      "memory_usage" : 200105984,
      "memory_limit" : 536870912,
      "highest_memory_usage" : 203440128,
      "swap_usage" : 212992,
      "swap_limit" : 1610612736,
      "highest_swap_usage" : 0
    },{
      "id" : "web-2",
      "cpu_usage" : 0,
      "memory_usage" : 203722752,
      "memory_limit" : 536870912,
      "highest_memory_usage" : 204136448,
      "swap_usage" : 0,
      "swap_limit" : 1610612736,
      "highest_swap_usage" : 0
    },{
      "id" : "worker-1",
      "cpu_usage" : 0,
      "memory_usage" : 210239488,
      "memory_limit" : 536870912,
      "highest_memory_usage" : 229318656,
      "swap_usage" : 0,
      "swap_limit" : 1610612736,
      "highest_swap_usage" : 0
    }
  ]
}
```
