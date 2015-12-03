# Operations

--- row ---

**Operation attributes**

{:.table}
| field          | type   | description                                      |
| -------------- | ------ | ------------------------------------------------ |
| id             | string | unique ID                                        |
| created_at     | date   | creation date of the application                 |
| finished_at    | date   | last time the application has been updated       |
| status         | string | status of the operation                          |
| type           | string | type of operation                                |
| error          | string | text of error if status == "error"               |

||| col |||

Example object:

```json
{
  "id": "54100930736f7563d5030000",
  "created_at": "2014-09-10T10:17:52.690+02:00",
  "finished_at": "2014-09-10T10:17:59.120+02:00",
  "status": "pending",
  "type": "restart"
}

{
  "id": "54100930736f7563d5030000",
  "created_at": "2014-09-10T10:17:52.690+02:00",
  "finished_at": "2014-09-10T10:17:59.120+02:00",
  "status": "error",
  "type": "restart",
  "error": "container web-1 failed to restart"
}
```

--- row ---

## Get an operation

--- row ---

`GET https://api.scalingo.com/v1/apps/[:app]/operations/[:operation_id]`

Display a given operation.

Possible status for an operation:

* pending: Default status when the instruction has been given
* running: When the action is actually made
* done: When the action is finished with success
* error: If something wrong happened, please read the 'error' property

||| col |||

Example request

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" -u :$AUTH_TOKEN \
  -X GET https://api.scalingo.com/v1/apps/example-app/operations/54100930736f7563d5030000
```

Returns 200 OK

```json
{
  "operation": {
    "id": "54100930736f7563d5030000",
    "created_at": "2014-09-10T10:17:52.690+02:00",
    "finished_at": "2014-09-10T10:17:59.120+02:00",
    "status": "pending",
    "type": "restart"
  }
}
```
