# How to write documentation?

Write files in markdown/*

# How to convert to target HTML documentation?

Execute converter

```
docker-compose run api-doc bundle exec ruby converter.rb
```

Launch server
```
docker-compose up
```

# Custom syntax

To symbolize a row:
```
--- row ---
```

Optional: to symbolize a col (to split between text and example):
```
||| col |||
```
