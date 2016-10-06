# scalingo.json Schema

`scalingo.json` is a deployment manifest to let people deploy their software 
super easily. This document describe its schema in detail.

--- row ---

## The manifest

In some situations, it is mandatory for us
to get a description of the project. What is/are the required addons, environment
variables, etc. This document describes how to write a JSON manifest file which
will be interpreted by our platform when someone wants to deploy a project.

The file must be located at the root of the project and be named either `app.json`
or `scalingo.json`. The latter will always take priority over the first one.

--- row ---

**The manifest attributes**

{:.table}
| field          | type   | description                                    |
| -------------- | ------ | ---------------------------------------------- |
| name           | string | Complete name of the project                   |
| _repository_   | string | Location of the GIT repository of the project  |
| _description_  | string | Description in one or two sentences of the app |
| _logo_         | string | URL to the logo of the project		             |
| _website_      | string | Official website of the application if any     |
| _env_          | object | Environment of the application, see below      |
| _addons_       | array  | List of all the addons required to run the app |
| _scripts_      | object | Optional postdeploy script, see below          |

Optional arguments are in italics.

**Environment**

The keys of the environment object are the name of the variables you want to add

{:.table}
| field          | type   | description                                       |
| -------------- | ------ | ------------------------------------------------- |
| `VAR_NAME`     | string | key of the object is the name of the env variable |

Each of these keys has to respect the following properties:

{:.table}
| field          | type   | description                                             |
| -------------- | ------ | ------------------------------------------------------- |
| description    | string | Description of the variable to explain what it does     |
| value          | string | (if no generator) Default value of the variable         |
| generator      | string | (if no value) Use a generator to define a default value |

Two generators are available `secret` or `url`:

* `secret`: will generate a unique token as a default value of the variable.
  (Useful for instance when you've to generate a unique encryption seed key),
  example: `90ffea2d3071e8d86cafb89ff5060883`

* `url`: will automatically insert the URL of the application will have once
  deployed.

||| col |||

File scalingo.json of [sample-go-martini](https://github.com/Scalingo/sample-go-martini/tree/dev-oneclick)

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
  "addons": ["scalingo-redis"],
  "scripts": {
    "postdeploy": "echo hello"
  }
}
```

--- row ---

**Scripts**

This `scripts` key is now deprecated in the scalingo.json in favor of Procfile. You can find information
on Procfile on the [dedicated page](http://doc.scalingo.com/internals/procfile.html).

The only available key for the `scripts` object is `postdeploy`. 

{:.table}
| field          | type   | description                                             |
| -------------- | ------ | ------------------------------------------------------- |
| postdeploy     | string | Command and argument of the script you want to execute. |

You can get more information on this feature on the [dedicated page](http://doc.scalingo.com/app/postdeploy-hook.html#workflow). 

## Example

This example comes from a concrete project located [on Github](https://github.com/Scalingo/sample-go-martini/tree/dev-oneclick).

With the `scalingo.json` in the above-mentioned project, the example will:

* Define the name of the project.
* Describe in a sentence the purpose of the project.
* Location of the logo.
* URL of the GIT repository.
* Official website of the project.
* List of the environment variables with their description and optional generator `VAR_TEST_1` and `VAR_SECRET_1`. 
These environment variables will be available for your application.
* Ask for the provisioning of a Redis addon.
* Execute the provided script after the container booted.
