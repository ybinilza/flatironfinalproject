from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from config import db, bcrypt
from sqlalchemy import UniqueConstraint
from sqlalchemy.exc import IntegrityError

class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=True)
    items = db.relationship('Item', backref='owner', lazy=True)

    def __repr__(self):
        return f"User {self.username}, ID: {self.id}"
    

    @hybrid_property
    def password_hash(self):
        return self._password_hash

    # setter method for the password property
    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = self.simple_hash(password)

    # authentication method using user and password
    def authenticate(self, password):
        return self.simple_hash(password) == self.password_hash

    # simple_hash requires no access to the class or instance
    
    @staticmethod
    def simple_hash(input):
        return sum(bytearray(input, encoding='utf-8'))

    @validates("username")
    def validate_username(self, key, value):
        if not value.strip():
            raise ValueError("Username is required")
        return value

    @validates("email")
    def validate_email(self, key, value):
        if not value.strip():
            raise ValueError("Email is required")
        return value

    def serialize(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'items': [item.serialize() for item in self.items]
            
        }

class Item(db.Model, SerializerMixin):
    __tablename__ = "items"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def __repr__(self):
        return f"Item {self.name}, ID: {self.price}"

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'user_id': self.user_id
           
        }
