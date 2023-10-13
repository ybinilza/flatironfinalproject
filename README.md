# Phase 4 Full-Stack Application 

MarketForAnyone is a web-based selling application designed to provide users with a seamless platform for selling various products. This application is built using Python with Flask as the backend framework, Flask-SQLAlchemy as the database ORM, and React as the front end. The aim is to create a user-friendly and secure environment for selling products

## Project Structure
## Models
---
### User
Fields: id, username, password_hash, email, etc.

### Item
Fields: id, title, description, price, user_id (foreign key referencing User), etc.

### Routes
/: Home page displaying featured listings.

/login: Login page.

/signup: Sign-up page.

/eachperson: Product details page.

/additem: User can add an item.

### Forms
Sign-up form: Collects user information for account creation.

Login form: Authenticates users into the platform.

Add Product Listing form: Allows sellers to create detailed product listings.

--- 
### Installation
#### Fork the repository:

https://github.com/ybinilza/flatironfinalproject

Navigate to the project directory:

```console

$ cd flatironfinalproject
$ pipenv install && pipenv shell
$ npm install --prefix client
$ cd server
```
The next step is to create a database and seed some data

```console
$ flask db init
$ flask db upgrade head
$ flask db revision --autogenerate -m'<descriptive message>'
$ flask db upgrade head

```
Then seed table "item" by running #### python seed.py

Start npm server
```console
$ cd client
& npm start

```
Then navigate to signup page and add some user through the sign-up form

Navigate to the home page to view featured listings.
Use the login to access your account.
Explore product details on the items page.
Sellers can add items using the Additem button.

###
License
This project is licensed under the MIT License.



