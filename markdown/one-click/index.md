# One click deployment

One click deployment is a feature of the Scalingo platform which let you define
a deployment manifest to let people deploy a software super easily.

--- row ---

## The manifest

To let people deploy your project in one click, it is necessary for us
to get a description of the project. What is/are the required addons, environment
variables, etc. This document describes how to write a JSON manifest file which
will be interpretated by our platform when someone wants to deploy your project.

The file must be located at the root of your project and be named either `app.json`
or `scalingo.json`. The latter will always take priority over the first one.

**The manifest attributes**

A complete description of the manifest attributes is [here](/one-click). 
To setup the one click deployment on your project, you simply need to link 
to `https://my.scalingo.com/deploy`. Then we get the source code from these 
places:

- Using the referer HTTP header if the link is on a github repository page
- The repository pointed out by the `source` parameters in the url query (i.e. `https://my.scalingo.com/deploy?source=https://github.com/<Your account>/<Your project>#custom_branch`)
- The `repository` key in the `scalingo.json` located at the root of one of the above-mentioned source

The latter in the list, the higher prioriy it takes.

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

## The Procfile

The Procfile is a way to define how the platform will try to start your containers. In this file, you can define all the different process you would like to run in your project. It is commonly used to define how to start workers which will consume asynchronous jobs.

You can get more information on the Procfile on the [dedicated page](http://doc.scalingo.com/internals/procfile.html).

**Postdeploy hook**

When you deploy your application, you may want to trigger custom actions automatically after the deployment succeeded. This hook is then exactly what you need. This hook will automatically starts the specified command at the end of your deployment.

To setup a post-deployment hook, you just have to add a `postdeploy` entry in your [Procfile](http://doc.scalingo.com/internals/procfile.html):

```
postdeploy: command you want to run
```

You can get more information on this feature on the [dedicated page](http://doc.scalingo.com/app/postdeploy-hook.html#workflow). 
