# Sources

--- row ---

Sources are used to provide temporary upload and download locations for tarballs. A deployment
can be created with the download location as a source for the code of the application.

--- row ---

**Source attributes**

{:.table}
| field          | type   | description                                        |
| -------------- | ------ | -------------------------------------------------- |
| upload_url     | string | pre-authenticated URL to upload a source archive   |
| download_url   | string | pre-authenticated URL to download a source archive |

||| col |||

Example object:

```json
{
  "upload_url": "https://api.scalingo.com/v1/sources/123e4567-e89b-12d3-a456-426655440000?token=dc958153c3cd32659ffad5deeda9405d"
  "download_url": "https://api.scalingo.com/v1/sources/123e4567-e89b-12d3-a456-426655440000?token=9df650a60014571abff0ee4e2d06a8fc"
}
```

--- row ---

## Create a source

--- row ---

`POST https://api.scalingo.com/v1/sources`

The generated URLs have a short lifetime and are designed to be used quickly (10 minutes). All the uploaded files are automatically
deleted from our storage backend after the links avec expired.

The `upload_url` is designed to be used in a `PUT` HTTP Request:

```
curl -L -X PUT --upload-file ./archive.tar.gz 'https://api.scalingo.com/v1/sources/123e4567-e89b-12d3-a456-426655440000?token=dc958153c3cd32659ffad5deeda9405d'
```

The `download_url` is designed to be used in a `GET` HTTP Request:

```
curl -L -X GET -o archive.tar.gz 'https://api.scalingo.com/v1/sources/123e4567-e89b-12d3-a456-426655440000?token=9df650a60014571abff0ee4e2d06a8fc'
```

||| col |||

Example request

```shell
curl -H "Accept: application/json" -H "Content-Type: application/json" -u :$AUTH_TOKEN \
  -X POST https://api.scalingo.com/v1/sources -d ''
```

Returns 201 Created

```json
{
  "upload_url": "https://api.scalingo.com/v1/sources/123e4567-e89b-12d3-a456-426655440000?token=dc958153c3cd32659ffad5deeda9405d"
  "download_url": "https://api.scalingo.com/v1/sources/123e4567-e89b-12d3-a456-426655440000?token=9df650a60014571abff0ee4e2d06a8fc"
}
```
