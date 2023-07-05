# Go Clean Architecture
Example that shows core principles of the Clean Architecture in Golang projects.

### Project Description&Structure:
REST API with custom JWT-based authentication system. 

#### Structure:
4 Domain layers:

- Models layer
- Repository layer
- UseCase layer
- Delivery layer

## API:

### POST /auth/sign-up

Creates new user 

##### Example Input: 
```
{
	"username": "UncleBob",
	"password": "cleanArch"
} 
```


### POST /auth/sign-in

Request to get JWT Token based on user credentials

##### Example Input: 
```
{
	"username": "UncleBob",
	"password": "cleanArch"
} 
```

##### Example Response: 
```
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzEwMzgyMjQuNzQ0MzI0MiwidXNlciI6eyJJRCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCIsIlVzZXJuYW1lIjoiemhhc2hrZXZ5Y2giLCJQYXNzd29yZCI6IjQyODYwMTc5ZmFiMTQ2YzZiZDAyNjlkMDViZTM0ZWNmYmY5Zjk3YjUifX0.3dsyKJQ-HZJxdvBMui0Mzgw6yb6If9aB8imGhxMOjsk"
} 
```

### POST /api/bookmarks

Creates new bookmark

##### Example Input: 
```
{
	"url": "https://github.com/andtkach",
	"title": "Go Clean Architecture example"
} 
```

### GET /api/bookmarks

Returns all user bookmarks

##### Example Response: 
```
{
	"bookmarks": [
            {
                "id": "5da2d8aae9b63715ddfae856",
                "url": "https://github.com/andtkach/gomongowebapi",
                "title": "Go Clean Architecture example"
            }
    ]
} 
```

### DELETE /api/bookmarks

Deletes bookmark by ID:

##### Example Input: 
```
{
	"id": "5da2d8aae9b63715ddfae856"
} 
```


## Requirements
- go 1.20
- docker & docker-compose

## Run Project

Use ```make run``` to build and run docker containers with application itself and mongodb instance


go mod tidy
