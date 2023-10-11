#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask import request, session, jsonify, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from config import app, db, api
from models import User,Item

# Local imports
from config import app, db, api
# Add your model imports


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


class Signup(Resource):
    def post(self):
        json = request.get_json()
        username = json.get("username")
        email=json.get("email")
        password = json.get("password")
        
        #print(username,email,password)


        user = User(
            username=username,
            email=email,
            password_hash=password,
        )

        if user.validate_username(username, user.username) and user.validate_email(username, user.email) :
            db.session.add(user)
            db.session.commit()

            session["user_id"] = user.id

            response = make_response(
                user.to_dict(),
                201,
            )

            return response
        else:
            return {}, 422


api.add_resource(Signup, "/signup", endpoint="signup")



class Login(Resource):

    def post(self):

        username = request.get_json()['userName']
        user = User.query.filter(User.username == username).first()
        print("user = ", user)

        password = request.get_json()['password']

        if user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict(), 200

        return {'error': 'Invalid username or password'}, 

api.add_resource(Login, "/login", endpoint="login")


@app.route('/items')
def items():

    items = []
    for item in Item.query.all():
        item_dict = {
            "name": item.name,
            "description": item.description,
            "price": item.price,
        }
        items.append(item_dict)

    response = make_response(
        jsonify(items),
        200
    )
    return response


if __name__ == '__main__':
    app.run(port=5555, debug=True)

