# My Phase 5 Project 

- Welcome to my Phase 5 Project for Flatiron, a fullstack web app built with React, Flask, and SQLAlchemy. Create a user account,adding reviews to list of cars.

- Without being logged in, you can view all cars and the review but cannot interact with them. Each review is linked to its user via their username.


## Local Machine 
- Select the directory intended to clone the repo in.
- Open the Terminal  
- Run command `git@github.com:WatheqAttrah/my-phase-5-project.git`

## Run the following commands after 
- Bachend server side port 5555
    - Run: pipenv shell 
    - Run: cd server 
    - Run: python app.py 

- Frontend client side  port 4000
    - Run: cd client 
    - Run: npm start

## Run Backend & Frontend symolteniously 
    - honcho start -f Proc.dev

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
    - Routes to the API's [ '/' Home | Checksession , Login , Signup, Signout, Clearsession, CarByID, UserByID GET | DELETE | PATCH ], 
  


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




