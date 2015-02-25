# Addon definition manifest

To add an addon our our platorm, you have to write a manifest
defining how we are going to communicate with your services.
The manifest is not strictly identical to Heroku but is quite,
of course if you need to modify anything, you just have ton contact
us. [mailto:addons@scalingo.com](addons@scalingo.com)



||| col |||

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
  "config_vars": [],
  "optional_config_vars": [],
  "regions": [],
  "production": {
    "base_url": "https://myaddon.com/resources"
  },
  "test": {

  }
```
