# One click deployment

One click deployment is a feature of the Scalingo platform which let you define
a deployment manifest to let people deploy your software super easily.

--- row ---

## The manifest

To allow people to deploy your project in one click, it is necessary for us
to get a description of the project. What is/are the required addons, environment
variables etc. This document describes how to write a JSON manifest file which
will be interpretated by our platform when someone wants to deploy your project.

The file has to be located at the root of your project and be named either `app.json`
or `scalingo.json`, the last will always be prioritary on the first.

--- row ---

**The manifest attributes**

{:.table}
| field          | type   | description                                    |
| -------------- | ------ | ---------------------------------------------- |
| name           | string | Complete name of the project                   |
| repository     | string | Location of the GIT repository of the project  |
| description    | string | Description in one or two sentences of the app |
| logo           | string | URL to the logo of the project		   |
| website        | string | Official website of the application if any     |
| env            | object | Environment of the application, see below      |
| addons         | array  | List of all the addons required to run the app |

**Environment**

The keys of the environment object are the name of the variables you want to add

{:.table}
| field          | type   | description                                       |
| -------------- | ------ | ------------------------------------------------- |
| `VAR_NAME`     | string | key of the object is the name of the env variable |

For each variable, it has to respect the following properties

{:.table}
| field          | type   | description                                             |
| -------------- | ------ | ------------------------------------------------------- |
| description    | string | Description of the variable to explain what it does     |
| value          | string | (if no generator) Default value of the variable         |
| generator      | string | (if no value) Use a generator to define a default value |

Two generators are available `secret` or `url`:

* `secret`: will generate a unique token as a default value of the variable.
  (Useful for instance when you've to generate a unique encryption seed key),
  example: `90ffea2d3071e8d86cafb89ff50608839fa26084967ab59a8d8d67319f79a`

* `url`: will automatically insert the URL of the application will have once
  deployed.

||| col |||

File scalingo.json of [sample-go-martini](https://github.com/Scalingo/sample-go-martini)

```json
{
  "name": "Sample Go Martini",
  "description": "Sample web application using the Go framework Martini",
  "logo": "https://scalingo.com/logo.svg",
  "repository": "https://github.com/Scalingo/sample-go-martini",
  "website": "https://scalingo.com",
  "env": {
    "VAR_TEST_1": {
      "description": "test variable number 1",
      "value": "1"
    },
    "VAR_SECRET_1": {
      "description": "generated variable 1",
      "generator": "secret"
    }
  },
  "addons": ["scalingo-redis"]
}
```

--- row ---

## Example

--- row ---

This example comes from a concrete project located [on Github](https://github.com/Scalingo/sample-go-martini)

What is doing the example on the other side of:

* Define the name of the project
* Describe in a sentence the purpose of the project
* Location of the logo
* URL of the GIT repository
* Official website of the project
* List of the environment variables with their description and optional generator `VAR_TEST_1` and `VAR_SECRET_1`
* Ask for the provisioning of a redis addon.
