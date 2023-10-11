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
from flask_cors import CORS

# Local imports
from config import app, db, api
# Add your model imports
CORS(app)

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


class CheckSession(Resource):
    def get(self):
        if session["user_id"]:
            user = User.query.get(session["user_id"])

            return make_response(
                user.to_dict(),
                200,
            )
        else:
            return {}, 401
api.add_resource(CheckSession, "/check_session", endpoint="check_session")


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
            "item_id" :item.id
        }
        items.append(item_dict)

    response = make_response(
        jsonify(items),
        200
    )
    return response


@app.route('/add_item', methods=['POST'])
def add_item():
    try:
        data = request.json  # Assuming the request contains JSON data

        # Extracting item details from the JSON data
        name = data.get('itemName')
        #image_url = data.get('imageUrl')
        description = data.get('itemDescription')
        price = data.get('itemPrice')
        uid=1

        # Save item details to the database
        new_item = Item(name=name, description=description, price=price, user_id=uid)
        db.session.add(new_item)
        db.session.commit()


    
        return jsonify({'message': 'Item added successfully'}), 200
    except Exception as e:
        print(f"Error adding item: {str(e)}")
        return jsonify({'error': 'Failed to add item'}), 500


# Route to delete an item by ID
@app.route('/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    try:
        item = Item.query.get(item_id)
        if not item:
            return jsonify({'error': 'Item not found'}), 404

        db.session.delete(item)
        db.session.commit()

        return jsonify({'message': 'Item deleted successfully'}), 200
    except Exception as e:
        print(f"Error deleting item: {str(e)}")
        return jsonify({'error': 'Failed to delete item'}), 500
    

# Route to edit the price of an item by ID
@app.route('/items/<int:item_id>', methods=['PATCH'])
def edit_price(item_id):
    try:
        item = Item.query.get(item_id)
        if not item:
            return jsonify({'error': 'Item not found'}), 404

        new_price = request.json.get('price')
        if new_price is not None and isinstance(new_price, (int, float)):
            item.price = new_price
            db.session.commit()
            return jsonify({'message': 'Price edited successfully'}), 200
        else:
            return jsonify({'error': 'Invalid price value'}), 400

    except Exception as e:
        print(f"Error editing price: {str(e)}")
        return jsonify({'error': 'Failed to edit price'}), 500



if __name__ == '__main__':
    app.run(port=5555, debug=True)

