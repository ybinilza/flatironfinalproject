from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from config import db, bcrypt
from sqlalchemy import UniqueConstraint
from sqlalchemy.exc import IntegrityError
from config import db, bcrypt

from config import db

class User(db.Model, SerializerMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email=db.Column(db.String,nullable=False)
    _password_hash = db.Column(db.String)


    def __repr__(self):
        return f"User {self.username}, ID: {self.id}"
    
    @property
    def password_hash(self):
        raise AttributeError("Password is not accessible")

    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))
    
    @validates("username")
    def validate_username(self, key, value):
        if value == "":
            raise ValueError("Username is required")
        return value
    
    @validates("email")
    def validate_email(self, key, value):
        if value == "":
            raise ValueError("email is required")
        return value

