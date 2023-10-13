#!/usr/bin/env python3

# Standard library imports
from random import randint
from faker import Faker

# Local imports
from app import app
from models import db, User, Item

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Deleting all records...")
        #User.query.delete()
        Item.query.delete()
    
        items_data = [
            {'name': 'Laptop', 'description': 'Powerful laptop for work and gaming', 'price': 1299, 'user_id': randint(1, 10)},
            {'name': 'Smartphone', 'description': 'Latest smartphone with advanced features', 'price': 699, 'user_id': randint(1, 10)},
            {'name': 'T-shirt', 'description': 'Comfortable cotton t-shirt in black', 'price': 19, 'user_id': randint(1, 10)},
            {'name': 'Coffee Maker', 'description': 'High-quality coffee maker for your kitchen', 'price': 79, 'user_id': randint(1, 10)},
            {'name': 'Headphones', 'description': 'Noise-canceling headphones for immersive audio experience', 'price': 149, 'user_id': randint(1, 10)},
            {'name': 'Running Shoes', 'description': 'Lightweight running shoes for fitness enthusiasts', 'price': 59, 'user_id': randint(1, 10)},
            {'name': 'Desk Chair', 'description': 'Ergonomic desk chair for comfortable working', 'price': 149, 'user_id': randint(1, 10)},
            {'name': 'Backpack', 'description': 'Stylish backpack for daily use', 'price': 39, 'user_id': randint(1, 10)},
            {'name': 'Digital Camera', 'description': 'High-resolution digital camera for photography enthusiasts', 'price': 799, 'user_id': randint(1, 10)},
            {'name': 'Gaming Console', 'description': 'Latest gaming console for immersive gaming experience', 'price': 399, 'user_id': randint(1, 10)},
            {'name': 'Sunglasses', 'description': 'UV protection sunglasses for sunny days', 'price': 29, 'user_id': randint(1, 10)},
            {'name': 'Yoga Mat', 'description': 'Non-slip yoga mat for home workouts', 'price': 24, 'user_id': randint(1, 10)},
            {'name': 'Bluetooth Speaker', 'description': 'Portable Bluetooth speaker for music on the go', 'price': 49, 'user_id': randint(1, 10)},
            {'name': 'Cookware Set', 'description': 'High-quality cookware set for your kitchen', 'price': 129, 'user_id': randint(1, 10)},
            {'name': 'Fitness Tracker', 'description': 'Smart fitness tracker for health monitoring', 'price': 79, 'user_id': randint(1, 10)},
            {'name': 'Dress Shoes', 'description': 'Classic dress shoes for formal occasions', 'price': 89, 'user_id': randint(1, 10)},
            {'name': 'External Hard Drive', 'description': 'Large-capacity external hard drive for data storage', 'price': 89, 'user_id': randint(1, 10)},
            {'name': 'Desk Lamp', 'description': 'Adjustable desk lamp for focused work', 'price': 34, 'user_id': randint(1, 10)},
            {'name': 'Portable Charger', 'description': 'Compact portable charger for your devices', 'price': 19, 'user_id': randint(1, 10)},
        ]

        for item_data in items_data:
            item = Item(**item_data)
            db.session.add(item)

        db.session.commit()

    print("Seed data added successfully.")
