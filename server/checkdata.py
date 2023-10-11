
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

with app.app_context():
    try:
        # Query all users
        users = User.query.all()

        # Print or inspect the user data
        for user in users:
            print(f"User {user.id}: {user.username}, {user.email}")

    except Exception as e:
        print(f"Error querying users: {e}")

    try:
        # Query all items
        items = Item.query.all()

        # Print or inspect the item data
        for item in items:
            print(f"Item {item.id}: {item.name}, {item.price}")

    except Exception as e:
        print(f"Error querying items: {e}")