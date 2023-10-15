# My Phase 5 Project 

# phase-5-project

## Creating Your Own Git Repo
- New Repo in Github.
- Clone & Copy the SSH Key

## Local Machine 
- Select the directory intended to clone the repo in.
- Open the Terminal  
- Run command `git@github.com:WatheqAttrah/phase-5-project.git`

## Backend Setup 
================

## `server/` directory contains all the backend code.
### Install Python Virtual Environment Tool 
- Run command `pipenv install`
- Enter the shell with `pipenv shell`


### Packages Installed 
- [Resources](https://pypi.org/)
- Run the following command before each package 
    - `pipenv install [Package]`

- `flask-sqlalchemy`
    - provide ways to interact with several database.
- `flask-migrate` = "*"
    - Handles SQLAlchemy database migrations.
- `sqlalchemy-serializer`
    - SQLAlchemy model to become serializable.
- `flask-restful`
    - Adds support for handling REST APIs in Python.
- `flask-cors`
    - Enables communications with resources in many domains
- `flask-marshmallow`
    - adds additional features to marshmallow, including URL and Hyperlinks fields for HATEOAS-ready APIs.
- `faker` 
    - To generate Fake data
- `faker-vehicle`
    - Provides vehicle and machinery related fake data for testing purposes.
- `faker-sqlalchemy`
    - Provider for the Faker library that helps populate SQLAlchemy ORM models.
- `gunicorn`
    - Python Web Server Gateway Interface (WSGI) HTTP serve
- `bcrypt-flask`
    - hashing function for password
- `flask`
    - Flask is a lightweight WSGI web application framework
- `psycopg-binary`
    - create and destroy lots of cursors and create a large number of “INSERTs” or “UPDATEs” 
- `requests`
    - Using requests, you can get, post, delete, update the data for the URL given.

## Create Backend files
-  Test Python Environment test=Pass
- config.py
    - Python application configurations.
        - app = Flask
        - app.secret key
        - metaadata
        - app.json
        - CORS
        - bcrypt

- app.py
    - Routes to the API's [ '/' Home | Checksession , Login , Signup, Signout, Clearsession, CarByID ], 
    - HTTP GET | POST | Delete


- models.py
    - User Model [ id , username, admin, hashed_password]
    - Car Model [ id, make, model, year, vin, image , engine , miles]
    - Review Model [ id ,review, created_at, updated_at, user_id, car_id]
    - Password Model [id, hashed_password]
    - Many-To Many Realtionship [ Car - Review ]


- seed.py
    - Seed Fake Data for testing reasons.
        - Faker()
        - FakerVehicle() to generate fake car data.
        - Created Fake Associattion Table [ Car <=> Reviews ]



## Frontend 
- Create client directory
    - Run `mkdir client`
- - Create react app inside /client directory.
    - Run `npm create-react-app client`
- Install Node 
    - Run `npm install --prefix client`

- Components
    - Home.js: Welcome the users in to the project 
    - App.js : holds the checksession and authenticating users to the site.
    - Login.js: holds the Login api 'POST' method and server error handling. 
    - Signup.js: holds the singup 'POST' api method and server error handling.
    - NavBar.js: the Navigation routes between all the routes
    - CarCard.js: render each car and review in the backend api
    - CarList.js: fetch the db from the backend 'GET" & 'POST'
    - AddReview.js: holds the 'POST' method when User intended to add review to and listed car from the list




