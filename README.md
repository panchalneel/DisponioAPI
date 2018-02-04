DisponioAPI
==========

DisponioAPI performs operation on rental and user data

Steps to start server

1) set the environment variable
2) Run `NODE_ENV=development UPLOAD_DIR=uploads node server.js`
3) Server will start on port 8080

## Features

### Login

**URL** : http://localhost:8080/login?email=cornelialott@emtrak.com&password=44d6aec6-5d67-47d3-a9ec-2754dba27d6b1

**Method** : GET

## Parameters

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