# Notifications

--- row ---

** Notification attributes **

{:.table}
| field            | type    | description                                   |
| ---------------- | ------- | --------------------------------------------- |
| id               | string  | unique ID identifying the notification        |
| app_id           | string  | app reference                                 |
| type             | string  | type of notification (e.g. slack)             |
| webhook_url      | string  | the url to which notifications are sent       |
| active           | boolean | if the notification is active or not          |

||| col |||

Example object:

```json
{
  "id" : "575a917de6d67217900386e6",
  "app_id": "57554e06e6d67206b7ed2f28",
  "type": "slack",
  "webhook_url" : "https://hooks.slack.com/TXXXXX/BXXXXX/XXXXXXXXXX",
  "active": true
}
```
--- row ---

## List application notifications

--- row ---

`GET https://api.scalingo.com/v1/apps/[:app]/notifications`

List all the provisioned notifications for a given application.

||| col |||

Example

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" -u :$AUTH_TOKEN \ 
  -X GET https://api.scalingo.com/v1/apps/example-app/notifications
```

Returns 200 OK

```json
{
    "notifications": [{
          "id" : "575a917de6d67217900386e6",
          "type": "slack",
          "webhook_url" : "https://hooks.slack.com/TXXXXX/BXXXXX/XXXXXXXXXX",
          "active": true
    }]
}
```

--- row ---

## Add a notification

--- row ---

`POST https://api.scalingo.com/v1/apps/[:app]/notifications`

Add a notification to the application.

### Parameters

* `notification.webhook_url`
* `notification.active` (optional)

You can only have one notification per type enabled. The notification is enabled by default if you don't give the value of the active boolean.

||| col |||

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" -u :$AUTH_TOKEN \
  -X POST https://api.scalingo.com/v1/apps/[:app]/notifications \
  -d '{"notification":{"webhook_url": "https://hooks.slack.com/TXXXXX/BXXXXX/XXXXXXXXXX", "active": false}}'
```

Returns 201 Created

--- row ---

## Update a notification

--- row ---

`PATCH https://api.scalingo.com/v1/apps/[:app]/notifications/[:notification_id]`

Change your notification webhook url or/and enable/disable the notification.

Be cautious though, the operation might fail. The provider may refuse to
update a notification if the operation is invalid. Example: You want to update a slack notification with some non slack url.

### Parameters

* `notification.webhook_url`
* `notification.active`

||| col |||

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" -u :$AUTH_TOKEN \
  -X PATCH https://api.scalingo.com/v1/apps/[:app]/notifications/[:notification_id] \
  -d '{"notification": {"webhook_url": "https://myendpoint.com", active: "true"}}'
```

Returns 200 OK

--- row ---

## Remove a notification

--- row ---

`DELETE htttps://api.scalingo.com/v1/apps/[:app]/notifications/[:notification_id]`

Request deprovisionning of the notification.

||| col |||

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" -u :$AUTH_TOKEN \
  -X DELETE https://api.scalingo.com/v1/apps/[:app]/notifications/[:notification_id] \
```

Returns 204 No Content
