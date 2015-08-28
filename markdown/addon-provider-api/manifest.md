# Addon definition manifest

--- row ---

## Definition

To add an addon to our platorm, you have to write a manifest
defining how we are going to communicate with your services.
The manifest is not strictly identical to Heroku but is quite,
of course if you need to modify anything, you just have ton contact
us. [addons@scalingo.com](mailto:addons@scalingo.com)

--- row ---

## Structure

The manifest is simply a JSON file with the following structure:

* `name`: Name of the addon, it will be display like this in the addon
  list https://scalingo.com/addons or in the dashboard.
* `username` and `password`: We will use these credentials in our requests
  using HTTP Basic Auth, to authenticate ourselves.
* `sso_salt`: When a user wants to access the dashboard of its addon, we
  will build a token which will be send to authenticate their request.
  Finally a request is done to the `production.sso_url` URL:

  Example: `https://dashboard.myaddon.com/sso?id=<addon_id>&timestamp=<timestamp>&token=<token>`

  ```ruby
    token = Digest::SHA1.hexdigest "#{addon_id}:#{sso_salt}:#{timestamp}"
  ```

  As there are only you, the provider, and us as platform which know the `sso_salt` and
  that both the two others parameters are shared, you are able to ensure that the request
  is authenticated.
* `logo_url`: Picture to display as logo of your addon (100x100)
* `short_description`: Summary of one sentence of the purpose of the addon
* `description`: Complete description in markdown of your addon
* `log_drain`: Boolean, if true, the provisioning will expect a `log_drain_url` attribute to
  send the logs to.
* `config_vars`: List of the environment variables you will be able to set on the applications
  which provisioned your addon.
* `production.base_url`: URL of your addon which will be hit by our services to
  provision/deprovision/update our users addons.
* `production.sso_url`: Your addon may include a dashboard, this link is where the user is
  redirected when trying to access it from its application dashboard.
* `test.base_url`: When you're developing your addon and you want to simulate requests
* `test_sso_url`: Exactly the same as `test.base_url` but for the SSO authentication endpoint
* `plans`: List of the different plans proposed by your addon

Structure of the plan object:

* `name`: Canonical name of the plan
* `display_name`: Name displayed to the user of the plan
* `price`: Price in euros for 30 days
* `description`: Markdown description of the plan

||| col |||

Example of token checking in Ruby:

```ruby
if Digest::SHA1.hexdigest "#{params[:id]}:#{ENV["SSO_SALT"]}:#{params[:timestamp]}" == params[:token]
  puts "request is correctly authenticated"
end
```

Example manifest:

```json
{
  "name": "Example Addon",
  "username": "username-for-basic-auth",
  "password": "samyoiHissowdOnHugyorOidepguJa",
  "sso_salt": "esidTavOnreboudWavwoadBildyon3",
  "logo_url": "//cdn.myaddon.com/logo.png",
  "short_description": "This addon is providing an awesome tool",
  "description": "# Example Addon\n## What we provide\n This is an awesome markdown description",
  "config_vars": ["EXAMPLE_VARIABLE_1"],
  "production": {
    "base_url": "https://myaddon.com/resources",
    "sso_url": "https://dashboard.myaddon.com/sso"
  },
  "test": {
    "base_url": "http://localhost:3000/resources",
    "sso_url": "https://localhost:3001/sso"
  },
  "plans": [
    {
      "name": "free",
      "display_name": "Free Tier addon",
      "price": 0.0,
      "description": "Markdown description of the plan"
    },
    {
      "name": "premium",
      "display_name": "Premium addon",
      "price": 30.0,
      "description": "Markdown description of the plan"
    }
  ]
}
```

--- row ---

## Testing your API and Manifest

You can download this tool to test your addon:

[https://github.com/Scalingo/scalingo-addon-api-tester](https://github.com/Scalingo/scalingo-addon-api-tester)

This tool will let you test the [different endpoints](/addon-provider-api) your addon
service.

||| col |||

Usage example:

Invalid manifest:

```
$ scalingo-addon-api-tester -m ./manifest-invalid.json
Errors in the manifest:
  → password can't be blank
  → config_vars should have at least one element environment variable
```

<hr>

Usage with a valid manifest:

```sh
$ # Make a request to provision an addon (with the first plan in the manifest)
$ scalingo-addon-api-tester provision
→ OK

$ # Make a request to provision an addon with a given plan
$ scalingo-addon-api-tester provision --plan premium
→ OK

$ # List the provisioned addons in the locale cache of the tool
$ scalingo-addon-api-tester list
- addon-id-1 → free
- addon-id-2 → premium

$ # Make a request to update an addon to a given plan
$ scalingo-addon-api-tester update --plan premium addon-id-1
→ OK

# # List all addons (and see the changes)
$ scalingo-addon-api-tester list
- addon-id-1 → premium
- addon-id-2 → premium

$ # Make a request to deprovision an addon
$ scalingo-addon-api-tester deprovision addon-id-2
→ OK

$ # List addons to check everything is OK
$ scalingo-addon-api-tester list
- addon-id-1 → premium
```
