#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from faker import Faker
import random

# Local imports
from app import app
from models import db,User,Item

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Deleting all records...")
        User.query.delete()
        Item.query.delete()

        print("Starting seed...")
        # Seed code goes here!

        def seed_users(num_users=10):
            for _ in range(num_users):
                #print("user")
                username = fake.user_name()
                email = fake.email()
                password_hash = username + 'password'
                user = User(username=username, email=email, _password_hash=password_hash)
                db.session.add(user)
            db.session.commit()
    
        seed_users()

        def seed_items(max_item=10):
            for _ in range(max_item):
                print("items")
                name = fake.word()
                description = fake.text()
                price = random.randint(1,10000)
                user_id=random.randint(1,10)
                item = Item(name=name, description=description, price=price, user_id=user_id)
                db.session.add(item)
            db.session.commit()
        seed_items()