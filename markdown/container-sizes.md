# Container Sizes

--- row ---

**Container Size attributes**

{:.table}
| field            | type    | description                                       |
| ---------------- | ------- | ------------------------------------------------- |
| id               | string  | Unique Universal Identifier                       |
| name             | string  | Name of the size, used as parameter in operations |
| human_name       | string  | Display name of the type                          |
| ordinal          | integer | Sorting index to display a list of sizes          |
| hourly_price     | integer | Price per hour of this container size in cents    |
| thirtydays_price | integer | Price for 30 days in cents                        |
| memory           | integer | RAM allocated to the containers in bytes          |
| human_cpu        | string  | Human representation of the CPU priority          |

||| col |||

Example object:

```json
{
   "hourly_price" : 40,
   "human_cpu" : "standard CPU priority",
   "human_name" : "L",
   "memory" : 1073741824,
   "name" : "L",
   "thirtydays_price" : 2880,
   "id" : "c623c087-69c3-4104-8a40-6b5cd3d41cae",
   "ordinal" : 4
}
```

--- row ---

## Optional Authentication

This endpoint can be reached unauthenticated, but if custom sizes have been enabled
to an account, the response won't include them.

--- row ---

## List the container sizes available

--- row ---

`GET https://api.scalingo.com/v1/features/container_sizes`

List all the container sizes available to your account.

||| col |||

Example Request

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" \
  -X GET -u :$AUTH_TOKEN https://api.scalingo.com/v1/features/container_sizes
```

Returns 200 OK

```json
{
   "container_sizes" : [
      {
         "human_name" : "S",
         "hourly_price" : 10,
         "human_cpu" : "low CPU priority",
         "name" : "S",
         "memory" : 268435456,
         "ordinal" : 2,
         "id" : "01710ca1-5d40-45be-a038-7d029e05cb23",
         "thirtydays_price" : 720
      },
      {
         "human_name" : "M",
         "human_cpu" : "standard CPU priority",
         "hourly_price" : 20,
         "name" : "M",
         "memory" : 536870912,
         "id" : "32629c23-4f69-42b8-b603-79849d1c2471",
         "ordinal" : 3,
         "thirtydays_price" : 1440
      },
      {
         "hourly_price" : 40,
         "human_cpu" : "standard CPU priority",
         "human_name" : "L",
         "memory" : 1073741824,
         "name" : "L",
         "thirtydays_price" : 2880,
         "id" : "c623c087-69c3-4104-8a40-6b5cd3d41cae",
         "ordinal" : 4
      },
      {
         "thirtydays_price" : 5760,
         "id" : "f6a6a2cb-aeba-433e-958d-3d3a74e6b065",
         "ordinal" : 5,
         "memory" : 2147483648,
         "name" : "XL",
         "human_cpu" : "high CPU priority",
         "hourly_price" : 80,
         "human_name" : "XL"
      },
      {
         "hourly_price" : 160,
         "human_cpu" : "high CPU priority",
         "human_name" : "2XL",
         "memory" : 4294967296,
         "name" : "2XL",
         "thirtydays_price" : 11520,
         "id" : "30b895f6-4320-4299-ac10-61e42180f9f3",
         "ordinal" : 6
      }
   ]
}
```
