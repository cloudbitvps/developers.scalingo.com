# Global information

--- row ---

## Introduction

The Scalingo V1 API is a publicly available interface allowing developers to
control Scalingo's entire cloud computing platform and access to the rich
Scalingo dataset. The interface is stable and currently used by the Scalingo
[command line client](http://cli.scalingo.com) (written in Go) and
[dashboard](https://my.scalingo.com) (an EmberJS app). However, changes are
occasionally made to improve performance and enhance features. See the
changelog for more details.

If you're an addon provider, you'd better go to [our addon provider
API](http://developers.scalingo.com/addon-provider-api) for you to interface
your service with Scalingo's platform.

The current API version is the __v1__. All the endpoints are prefixed by `/v1`.
It's only available through HTTPS: it's TLS, or nothing.

The API has been tagged __v1__. However it is not a frozen API. We may and we
will update endpoints and create new ones. But you can be sure we won't break
the existing. If any major change about the way JSON is structured, we will
keep the right to release a __v2__ and so forth.

When any change is applied to the API, it will be displayed in ths [changelog
section](/#changelog) of this documentation and on our [changelog
website](http://changelog.scalingo.com)

> Last update: Wednesday 24th August 2015

||| col |||

Base URL:

```
https://api.scalingo.com/v1/
```

--- row ---

## HTTP Verbs

The API is not perfectly RESTful, it is more REST-ish. It has been developed to
be easy to use and instinctive, we'll probably normalize it, in a second version.

* HEAD		Can be issued against any resource to get just the HTTP header info.
* GET		Get resources, nullipotent operation (no matter how many times you call it, there is no side effect).
* POST		Used for creating resources. (creation of a new app, or to create an environment variable)
* PATCH		Update part of resources, as the value of an environment variable.
* PUT		Update complete resources.
* DELETE	Used for deleting items.

--- row ---

## Parameters

--- row ---

### GET and DELETE endpoints

Parameters for GET and DELETE requests are known as _query parameters_, they are declared in the resource URL.

||| col |||

Example request:

```shell
curl -X GET https://api.scalingo.com/v1/apps/name/events?page=2
```

--- row ---

### POST/PUT/PATCH

For these types of request, parameters are not included as query parameters,
they should be encoded as JSON with the following header: `Content-Type:
'application/json'.

||| col |||

Example request:

```shell
curl -H 'Accept: application/json' -H 'Content-Type: application/json' -u ":$AUTH_TOKEN" \
  -X POST https://api.scalingo.com/v1/apps -d \
  '{
    "app": {
      "name": "example-app"
    }
  }'
```

--- row ---

# Authentication

The authentication to the API is done thanks to an authentication token and
Basic HTTP Auth. The API is HTTPS only, so credentials are always sent encrypted.

--- row ---

## Get your API token from our dashboard

You can obtain your API token from your profile from the dashboard:

[Get your API Token](https://my.scalingo.com/apps/profile)

--- row ---

## Get your API token from the API

Otherwise your can get your API token from the API directly:

--- row ---

`POST https://api.scalingo.com/v1/users/sign_in`

Parameters:

* `user.login`: Email of your account
* `user.password`: Password or your account

||| col |||

Example request:

```sh
curl -H "Accept: application/json" -H "Content-Type: application/json" \
 -X POST https://api.scalingo.com/v1/users/sign_in -d \
 '{
   "user": {
     "login": "user@example.com",
     "password": "example-secret"
   }
 }'
```

Returns 201 Created

```json
{
  "authentication_token":"abcdef0123456789-",
  "user": {
    "id":"51dba73fedfe42612000002",
    "email":"hello@scalingo.com",
    "username":"leo",
    "first_name":"Léo",
    "last_name":"Unbekandt",
    "company":"Scalingo",
    "location":"Strasbourg France",
    "email_newsletter":true,
    "email_personal_advice":true
  }
}
```

--- row ---

## Make an authenticated request

HTTP requests have to be authenticated with HTTP basic auth, with the
authentication token as password, the username can be empty.

||| col |||

Example request:

```sh
curl -H "Accept: application/json" -H "Content-Type: application/json" -u ":$AUTH_TOKEN" \
 -X GET https://api.scalingo.com/v1/apps
```

--- row ---

# Data format

--- row ---

## JSON

--- row ---

The API sends and receives JSON, XML is not accepted, please ensure JSON is used. All the
returned object are `object`, there is never an `array` as root element.

Resources are rooted, it means that they have a parent key corresponding to its name. This
key may be plural if a collection of items is returned.

||| col |||

```js
{
  "app": {
    // application
  }
}
```

```js
{
  "apps": [
    {
      // application
    }, {
      // application
    }
  ]
}
```

--- row ---

## Dates

All the dates are sent with the ISO 8601: YYYY-MM-DDThh:mm:ss.μμμZ

Example:

__2015-01-13T09:20:31.123+01:00__

This format is commonly understood, here are some examples:

||| col |||

Javascript:

```js
var date = new Date("2015-01-13T09:20:31.123+01:00")
Tue Jan 13 2015 09:20:31 GMT+0100 (CET)
```

Ruby:

```ruby
require 'date'
DateTime.iso8601("2015-01-13T09:20:31.123+01:00")
=> #<DateTime: 2015-01-13T09:20:31+01:00 ((2457036j,30031s,123000000n),+3600s,2299161j)>
```

Go:

```go
/*
 * go run iso8601.go
 * 2015-01-13 09:20:31.123 +0100 CET
 */
date, _ := time.Parse(time.RFC3339Nano, "2015-01-13T09:20:31.123+01:00")
fmt.Println(date)
```

--- row ---

# Errors

## Client errors - Status codes: 4xx

--- row ---

### Invalid JSON - 400 Bad Request

--- row ---

The JSON you've sent in the payload is is wrongly formatted.

||| col |||

```shell
curl -H 'Content-Type: application/json' -H 'Accept: application/json' -u ":$AUTH_TOKEN" \
  -X POST https://api.scalingo.com/v1/users/sign_in -d '{"user": {'
```

Returns HTTP/1.1 400 Bad Request

```json
{
  "error" : "There was a problem in the JSON you submitted: 795: unexpected token at '{\"user\": {'"
}
```

--- row ---

### Exceeding free trial - 402 Payment Required

--- row ---

If you try to do an action unallowed in the free trial, you will get an error 402 Payment Required.

||| col |||

```shell
curl -H 'Content-Type: application/json' -H 'Accept: application/json' -u ":$AUTH_TOKEN" \
  -X POST https://api.scalingo.com/v1/apps -d \
  '{
    "app" : {
      "name" : "my-new-app"
    }
  }'
```

Returns 402 Payment Required if user is not allowed to create a new app.

```json
{
    "error": "Sorry, you need to verify your account (billing profile and payment card) to create a new app",
    "url": "https://my.scalingo.com/apps/billing"
}
```

--- row ---

### Resource not found - 404 Not found

--- row ---

When you're doing a request to an invalid resource

||| col |||

```shell
curl -H 'Content-Type: application/json' -H 'Accept: application/json' -u ":$AUTH_TOKEN" \
  -X GET https://api.scalingo.com/v1/apps/123
```

Returns HTTP/1.1 404 Not Found

```json
{
  "resource": "app",
  "error" : "not found"
}
```

--- row ---

### Invalid field - 422 Unprocessable Entity

--- row ---

There is an invalid field in the JSON payload.

||| col |||

```shell
curl -H 'Content-Type: application/json' -H 'Accept: application/json' -u ":$AUTH_TOKEN" \
  -X POST https://api.scalingo.com/v1/apps -d '{}'
```

Returns HTTP/1.1 422 Unprocessable Entity

```json
{
  "errors" : {
    "app": [ "missing field" ]
  }
}
```

--- row ---

### Invalid data - 422 Unprocessable Entity

--- row ---

Invalid data were sent in the payload.

||| col |||

```shell
curl -H 'Content-Type: application/json' -H 'Accept: application/json' -u ":$AUTH_TOKEN" \
  -X POST https://api.scalingo.com/v1/apps -d \
  '{
    "app" : {
      "name" : "AnotherApp"
    }
  }'
```

Returns HTTP/1.1 422 Unprocessable Entity

```json
{
  "errors": {
    "name": [ "should contain only lowercap letters, digits and hyphens" ]
  }
}
```

--- row ---

### Server errors - 50x

--- row ---

If the server returns a 50x status code, something wrong happened on our side.
You can't do anything about it, you can be sure that our team got notifications
for it and that it will be fixed really quickly.

||| col |||

Example of error 500:

```json
{
  "error": "Internal error occured, we're on it!"
}
```

--- row ---

# Pagination

Some resources provided by the platform API are paginated. To
ensure you can correctly handle it, metadata are added to the JSON of the
response.

--- row ---

## Request parameters

* `page`: Requested page number
* `per_page`: Number of entries per page.
  Each resource has a maximum for this value to avoid oversized requests

## Response meta values

The returned JSON object will include a `meta` key including pagination
metadata:

```json
{
  "meta": {
    "pagination": {
      "prev_page": "<previous page number>",
      "current_page": "<requested page number>",
      "next_page": "<next page number>",
      "total_pages": "<total amount of pages>",
      "total_count": "<total amount of items in the collection>"
    }
  }
}
```

> `prev_page` and/or `next_page` are equal to `null` if there is no previous
> or next page.

||| col |||

Example request

```sh
curl -H "Accept: application/json" -H "Content-Type: application/json" -u :$AUTH_TOKEN \
  -X GET 'https://api.scalingo.com/v1/apps/example-app/events?page=4&per_page=20'
```

Returns 200 OK

This request returns the events 40 to 60.

```json
{
	"events": [
		{ ... }
	],
	"meta": {
		"current_page": 4,
		"prev_page": 3,
		"next_page": 5,
		"total_pages": 12,
		"total_count": 240
	}
}
```

--- row ---

# Changelog

--- row ---

## Thursday 3rd December 2015:

Documentation of the [Operation resource](/operations.html) with the endpoint:
`GET /apps/[:app]/operations/[:operation_id]`

## Friday 20th November 2015:

Add `GET /apps/[:app]/stats` endpoint to get application metrics.

||| col |||

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
    }
  ]
}

--- row ---

## Wednesday 12th August 2015:

Add multiple event to the app timeline

* `new_collaborator`
* `accept_collaborator`
* `delete_collaborator`
* `new_domain`
* `edit_domain`
* `delete_domain`
* `new_addon`
* `upgrade_addon`
* `delete_addon`
* `new_app`
* `rename_app`
* `transfer_app`

## Tuesday 11th August 2015:

  Update data format of specialized data in event.

  Add `type_data` attribute in all events.

||| col |||

Example change: scale event

Old format:

```json
{
    "id": "54dcdd4a73636100011a0000",
    "created_at" : "2015-02-12T18:05:14.226+01:00",
    "user" : {
        "username" : "johndoe",
        "email" : "john@doe.com",
        "id" : "51e6bc626edfe40bbb000001"
    },
    "app_id" : "5343eccd646173000a140000",
    "type" : "scale",
    "previous_containers" : {
        "web" : 1,
        "worker": 0
    },
    "containers" : {
        "web" : 2,
        "worker" : 1 
    }
}
```

New format:

```json
{
    "id": "54dcdd4a73636100011a0000",
    "created_at" : "2015-02-12T18:05:14.226+01:00",
    "user" : {
        "username" : "johndoe",
        "email" : "john@doe.com",
        "id" : "51e6bc626edfe40bbb000001"
    },
    "app_id" : "5343eccd646173000a140000",
    "type" : "scale",
    "type_data" : {
        "previous_containers" : {
            "web" : 1,
            "worker" : 0
        },
        "containers" : {
            "web" : 2,
            "worker" : 1 
        }
    }
}
```

--- row ---

## Monday 10th August 2015:

  Bulk upgrade of application environment

  New endpoint: PUT `/apps/[:app_id]/variables`

||| col |||

Example request

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -X PUT -u :$AUTH_TOKEN https://api.scalingo.com/v1/apps/example-app/variables -d \
  '{
    "variables": [{
      "name":"RAILS_ENV",
      "value":"production"
    },{
      "name":"RACK_ENV",
      "value":"production"
    }]
  }'
```

Returns 200 OK

Response

```json
{
    "variables": [{
        "id": "541013a9736f7563d5050000",
    	"name":"RAILS_ENV",
    	"value":"production"
    },{
    	"id": "541013a9736f7563d5050001",
    	"name":"RACK_ENV",
    	"value":"production"
    }]
}
```

--- row ---

## Thursday 9th July 2015:

  Add `addon_provider.logo_url` to addon

```js
{
  "addon": {
    // ...
    "addon_provider": {
      "id": "scalingo-redis",
      "name": "Scalingo Redis",
      "logo_url": "//storage.sbg1.cloud.ovh.net/v1/AUTH_be65d32d71a6435589a419eac98613f2/scalingo/redis.png"
    }
  }
}
```

--- row ---

## Wednesday 13rd May 2015:

  Additional `links` attribute in deployments

```js
{
   // ...
   "links": {
      "output": "https://api.scalingo.com/v1/apps/example-app/deployments/123e4567-e89b-12d3-a456-426655440000/output"
   }  
}
```

--- row ---

## Wednesday 15th April 2015:

  Additional `size` field in `/apps/:app/scale` for vertical scaling

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
      "size": "M",
    }
  ]
}
```

--- row ---

## Sunday 1st March 2015:
  
  The 404 not found error got a new field `resource` to define the resource
  which has not been found.

||| col |||

Example request:

```sh
curl -H 'Content-Type: application/json' -H 'Accept: application/json' -u ":$AUTH" \
  -X GET https://api.scalingo.com/v1/apps/123
```

Response 404 Not found

Before:

```json
{
  "error": "not found"
}
```

After:

```json
{
  "resource": "app",
  "error": "not found"
}
```

## Friday 6th March 2015:

  The `user` object has been embedded to the the result of the `/users/sign_in` endpoint

||| col |||

```sh
curl -H 'Content-Type: application/json' -H 'Accept: application/json' -u ":$AUTH" \
  -X POST https://api.scalingo.com/v1/users/sign_in -d \
  '{
    "user": {
      "login": "test-user",
      "password": "super-secret"
    }
  }'
```

Response 404 Not found

Before:

```json
{
  "authentication_token": "0123456789abcdef"
}
```

After:

```js
{
  "authentication_token": "0123456789abcdef",
  "user": {
    // user model
  }
}
```
