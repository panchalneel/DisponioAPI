DisponioAPI
==========

DisponioAPI performs operation on rental and user data

Steps to start server

1) set the environment variable
2) Run `NODE_ENV=development UPLOAD_DIR=uploads node server.js`
3) Server will start on port 8080

## Features

## Login

**URL** : http://localhost:8080/login?email=cornelialott@emtrak.com&password=44d6aec6-5d67-47d3-a9ec-2754dba27d6b1

**Method** : GET

**Parameters**

**email** : Email id of user (E.g : cornelialott@emtrak.com) <br/>
**password** : 44d6aec6-5d67-47d3-a9ec-2754dba27d6b1

**Response**
```
{
    "status": "Success",
    "user": {
        "id": "59777f3fdadd1d26cc2a2093",
        "firstName": "Cornelia",
        "lastName": "Lott"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5Nzc3ZjNmZGFkZDFkMjZjYzJhMjA5MyIsImlhdCI6MTUxNzcyMTM3OSwiZXhwIjoxNTE3NzI4NTc5fQ.4ZxfHmra0Yhsqz2m1MG-4gJHwZECktXskbaKq-l57Ys"
}
```


## Get Rentals

**URL** : http://localhost:8080/rentals

**Method** : GET

**Headers**

**token** : User jwt token

**Note** : In response of login API user get JWT token. Pass token in every endpoint for authentication

**Response**
```
{
    "status": 200,
    "message": "Success",
    "data": [
        {
            "id": "3a1fa96a771a4066aae7ceffb",
            "address": {
                "street": "2Rose Street",
                "houseNumber": 219,
                "city": "1Coral",
                "zipCode": 110384
            },
            "numberRooms": 110,
            "area": 110
        },
        {
            "id": "59777c092a1248e5fd42ab48",
            "address": {
                "street": "Rose Street",
                "houseNumber": 19,
                "city": "Coral",
                "zipCode": 10384
            },
            "numberRooms": 4,
            "area": 63,
            "views": 54
        }]
}
```



## Create Rental

**URL** : http://localhost:8080/rentals

**Method** : POST

**Request Body**
```
{
	"street": "2Rose Street",
	"houseNumber": 219,
	"city": "1Coral",
	"zipCode": 110384,
	"numberRooms": 110,
	"area": 110
}
```


**Response**
```
{
    "status": 200,
    "message": "Rental created successfully"
}
```