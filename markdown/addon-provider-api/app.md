# App Addon API

This API is available for addon providers to get information about the apps
which have provisioned their addon.

All [the rules](/) which apply to the global API are also existing for these
endpoints, except the authentication.

--- row ---

## Authentication

--- row ---

To authenticate your request, you need to use HTTP basic auth with the user
and password defined in your addon manifest.

Example: `https://user:password@api.scalingo.com/v1/provider/apps`

--- row ---

## Get applications which are using the addon

--- row ---

`GET https://api.scalingo.com/v1/provider/apps`

> Feature: Pagination

||| col |||

Example request:

```sh
curl -H "Accept: application/json" -H "Content-Type: application/json" -u $USER:$PASSWORD \
  -X GET https://api.scalingo.com/v1/provider/apps
```

```json
{
  "apps": [
    {
      "addon_provider_id": "1234567890abcdef",
      "app_id": "app-id-1",
      "plan": "test"
    }, {
      "addon_provider_id": "1234567890abcdef",
      "app_id": "app456@heroku.com",
      "plan": "premium" }
  ]
}
```

--- row ---

## Get a precise application which has provisioned the addon

--- row ---

`GET https://api.scalingo.com/v1/provider/apps/[:id]`

||| col |||

Example request:

```sh
curl -H "Accept: application/json" -H "Content-Type: application/json" -u $USER:$PASSWORD \
  -X GET https://api.scalingo.com/v1/provider/apps/app-id-1
```

```json
{
  "app": {
    "addon_provider_id": "1234567890abcdef",
    "id": "app-id-2",
    "name": "example-app",
    "owner_email": "user@example.com",
    "plan": "premium",
    "config": {"VARIABLE_NAME": "VALUE"}
  }
}
```

--- row ---

## Update app configuration

--- row ---

`PATCH https://api.scalingo.com/v1/provider/apps/[:id]`

Parameters:

* `config`: `object` - hash of the variables to modify

You can only update the variables defined in your manifest obviously,
the application will be restart after the modification.

||| col |||

Example request:

```sh
curl -H "Accept: application/json" -H "Content-Type: application/json" -u $USER:$PASSWORD \
  -X PATCH https://api.scalingo.com/v1/provider/apps/app-id-1 -d \
  '{
    "config": {
      "VARIABLE_NAME": "NEW_VALUE"
    }
  }'
```

Returns 200 OK

```json
{
  "app": {
    "addon_provider_id": "1234567890abcdef",
    "id": "app-id-1",
    "name": "example-app",
    "owner_email": "user@example.com",
    "plan": "premium",
    "config": {"VARIABLE_NAME": "NEW_VALUE"}
  }
}
```

