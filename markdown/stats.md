# Stats

The stats endpoint let you get metrics about the containers of an application.
These data include the CPU usage and the memory usage, splitted between RAM
and Swap memory.

--- row ---

## Get stats of an app

--- row ---

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
